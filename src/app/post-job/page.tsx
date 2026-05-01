import { requireRole } from "@/lib/auth";
import { createJobAction } from "@/lib/actions";

export default async function PostJobPage() {
  await requireRole(["employer"]);

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Post a new job</h1>
      <p className="mt-2 text-zinc-600">Create clear, inclusive job descriptions to attract better-fit applicants.</p>
      <form action={createJobAction} className="mt-6 grid gap-4">
        <input name="title" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Job title" required />
        <input name="company" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Company name" required />
        <input name="location" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Location" required />
        <textarea name="description" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" rows={6} placeholder="Describe role responsibilities and outcomes." required />
        <button type="submit" className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Publish job</button>
      </form>
    </div>
  );
}
