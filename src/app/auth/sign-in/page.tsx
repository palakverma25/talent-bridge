"use client";

import Link from "next/link";
import { loginAction } from "@/lib/actions";
import { ArrowRight, LogIn } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center gap-3">
          <div className="rounded-full bg-violet-100 p-2.5 text-violet-600">
            <LogIn size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500">Sign in to your account to continue</p>
          </div>
        </div>
        <div className="p-8">
          <form action={loginAction} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
              <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input name="password" type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" required />
            </div>
            <button className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-violet-600 hover:shadow-lg transition-all active:scale-[0.98]">
              Sign in
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              New to TalentBridge? <Link href="/auth/sign-up" className="font-semibold text-violet-600 hover:text-violet-800 transition-colors">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
