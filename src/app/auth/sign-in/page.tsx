"use client";

import Link from "next/link";
import { loginAction } from "@/lib/actions";
import { useActionState } from "react";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form action={loginAction} className="mt-4 space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" required />
        <button className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Sign in</button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        New user? <Link href="/auth/sign-up" className="text-zinc-900 underline">Create an account</Link>
      </p>
    </div>
  );
}
