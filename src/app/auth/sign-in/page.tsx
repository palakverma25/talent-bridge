"use client";

import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (formData: FormData) => {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo mode: configure Supabase env keys to enable real auth.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in. Visit dashboard.");
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form action={onSubmit} className="mt-4 space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <button className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Sign in</button>
      </form>
      {message && <p className="mt-3 text-xs text-zinc-600">{message}</p>}
      <p className="mt-4 text-sm text-zinc-600">
        New user? <Link href="/auth/sign-up" className="text-zinc-900 underline">Create an account</Link>
      </p>
    </div>
  );
}
