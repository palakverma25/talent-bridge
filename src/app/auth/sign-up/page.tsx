"use client";

import Link from "next/link";
import { signupAction } from "@/lib/actions";
import { UserPlus, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center gap-3">
          <div className="rounded-full bg-indigo-100 p-2.5 text-indigo-600">
            <UserPlus size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Create an account</h1>
            <p className="text-sm text-slate-500">Join TalentBridge to get started</p>
          </div>
        </div>
        <div className="p-8">
          <form action={signupAction} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
              <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input name="password" type="password" placeholder="Minimum 8 characters" minLength={8} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">I am a...</label>
              <select
                name="role"
                defaultValue="candidate"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
              >
                <option value="candidate">Candidate (Looking for jobs)</option>
                <option value="employer">Employer (Hiring talent)</option>
              </select>
            </div>
            <button className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all active:scale-[0.98]">
              Create account
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have an account? <Link href="/auth/sign-in" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
