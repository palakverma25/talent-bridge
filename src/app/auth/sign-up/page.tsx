"use client";

import Link from "next/link";
import { signupAction } from "@/lib/actions";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form action={signupAction} className="mt-4 space-y-3">
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
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign up
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account? <Link href="/auth/sign-in" className="text-zinc-900 underline">Sign in</Link>
      </p>
    </div>
  );
}
