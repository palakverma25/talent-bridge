"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { UserRole } from "@/types";

export default function OnboardingPage() {
  const [message, setMessage] = useState("");

  const onSelectRole = async (role: UserRole) => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo mode: select a dashboard directly from the header.");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage("Please sign in first.");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      role,
    });

    setMessage(error ? error.message : `Role saved as ${role}.`);
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Choose your role</h1>
      <p className="mt-2 text-zinc-600">This controls your dashboard and permissions in the platform.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button onClick={() => onSelectRole("candidate")} className="rounded-lg border border-zinc-300 p-4 text-left hover:bg-zinc-50">
          <p className="font-semibold">Candidate</p>
          <p className="text-sm text-zinc-600">Discover roles, save jobs, and track applications.</p>
        </button>
        <button onClick={() => onSelectRole("employer")} className="rounded-lg border border-zinc-300 p-4 text-left hover:bg-zinc-50">
          <p className="font-semibold">Employer</p>
          <p className="text-sm text-zinc-600">Post openings, review applicants, and hire faster.</p>
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-zinc-700">{message}</p>}
    </div>
  );
}
