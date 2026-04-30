"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    ["query", "location", "workMode", "jobType"].forEach((key) => {
      const value = form.get(key)?.toString();
      if (value && value !== "all") {
        params.set(key, value);
      }
    });
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-4">
      <input
        name="query"
        placeholder="Role, company, skill"
        defaultValue={searchParams.get("query") ?? ""}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        name="location"
        placeholder="Location"
        defaultValue={searchParams.get("location") ?? ""}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <select
        name="workMode"
        defaultValue={searchParams.get("workMode") ?? "all"}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
      >
        <option value="all">Any work mode</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
        <option value="on-site">On-site</option>
      </select>
      <select
        name="jobType"
        defaultValue={searchParams.get("jobType") ?? "all"}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
      >
        <option value="all">Any type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>
      <button
        type="submit"
        className="md:col-span-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      >
        Apply filters
      </button>
    </form>
  );
}
