import { requireRole } from "@/lib/auth";
import { mockJobs } from "@/lib/data/mock";

export default async function CandidateDashboard() {
  const { demoMode } = await requireRole(["candidate"]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Candidate dashboard</h1>
        <p className="mt-2 text-zinc-600">Track your progress and keep your profile application-ready.</p>
        {demoMode && <p className="mt-3 text-sm text-amber-700">Demo mode is active until Supabase env is configured.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Saved jobs</p><p className="text-2xl font-bold">12</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Applications sent</p><p className="text-2xl font-bold">6</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Profile strength</p><p className="text-2xl font-bold">84%</p></div>
      </div>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Recommended jobs</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          {mockJobs.map((job) => (
            <li key={job.id}>{job.title} at {job.company}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
