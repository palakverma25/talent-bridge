"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const RATE_LIMIT_COOLDOWN_SECONDS = 90;

export default function SignUpPage() {
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const onSubmit = async (formData: FormData) => {
    if (isSubmitting || cooldownSeconds > 0) return;
    setIsSubmitting(true);
    setMessage("");

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const role = String(formData.get("role") ?? "candidate");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo mode: configure Supabase env keys to enable real auth.");
      setIsSubmitting(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Many Supabase setups use a DB trigger that requires role metadata at signup.
        data: { role },
      },
    });
    if (error) {
      const isRateLimited = error.status === 429 || /rate limit/i.test(error.message);
      if (isRateLimited) {
        setCooldownSeconds(RATE_LIMIT_COOLDOWN_SECONDS);
      }
      setMessage(
        isRateLimited
          ? "Email rate limit exceeded. Please wait before retrying, then submit once."
          : error.message,
      );
      setIsSubmitting(false);
      return;
    }

    setMessage("Account created. Check your inbox for verification, then complete onboarding.");
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form action={onSubmit} className="mt-4 space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <input name="password" type="password" placeholder="Password (min 8 chars)" minLength={8} className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <select
          name="role"
          defaultValue="candidate"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
        <button
          disabled={isSubmitting || cooldownSeconds > 0}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Signing up..."
            : cooldownSeconds > 0
              ? `Try again in ${cooldownSeconds}s`
              : "Sign up"}
        </button>
      </form>
      {message && <p className="mt-3 text-xs text-zinc-600">{message}</p>}
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account? <Link href="/auth/sign-in" className="text-zinc-900 underline">Sign in</Link>
      </p>
    </div>
  );
}
