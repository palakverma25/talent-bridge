"use client";

import { setRoleAction } from "@/lib/actions";

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Choose your role</h1>
      <p className="mt-2 text-zinc-600">This controls your dashboard and permissions in the platform.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button onClick={() => setRoleAction("candidate")} className="rounded-lg border border-zinc-300 p-4 text-left hover:bg-zinc-50">
          <p className="font-semibold">Candidate</p>
          <p className="text-sm text-zinc-600">Discover roles, save jobs, and track applications.</p>
        </button>
        <button onClick={() => setRoleAction("employer")} className="rounded-lg border border-zinc-300 p-4 text-left hover:bg-zinc-50">
          <p className="font-semibold">Employer</p>
          <p className="text-sm text-zinc-600">Post openings, review applicants, and hire faster.</p>
        </button>
      </div>
    </div>
  );
}
