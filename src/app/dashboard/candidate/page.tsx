import { requireRole, getUser } from "@/lib/auth";
import { getJobs, getApplicationsByEmail } from "@/lib/db";
import Link from "next/link";

export default async function CandidateDashboard() {
  await requireRole(["candidate"]);
  const user = await getUser();

  const myApplications = getApplicationsByEmail(user?.email || "");
  const allJobs = getJobs();

  // Sort by applied date
  myApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Candidate dashboard</h1>
        <p className="mt-2 text-zinc-600">Track your progress and keep your profile application-ready.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Saved jobs</p><p className="text-2xl font-bold">0</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Applications sent</p><p className="text-2xl font-bold">{myApplications.length}</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Profile strength</p><p className="text-2xl font-bold">84%</p></div>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">My Applications</h2>
        <ul className="mt-3 divide-y divide-zinc-200">
          {myApplications.length === 0 && <p className="text-sm text-zinc-500">You haven't applied to any jobs yet.</p>}
          {myApplications.map((app) => {
            const job = allJobs.find(j => j.id === app.jobId);
            return (
              <li key={app.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <Link href={`/jobs/${job?.id}`} className="font-medium hover:underline">{job?.title}</Link>
                  <span className="text-zinc-500"> at {job?.company}</span>
                </div>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{app.status}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Recommended jobs</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          {allJobs.slice(0, 3).map((job) => (
            <li key={job.id}>
              <Link href={`/jobs/${job.id}`} className="hover:underline">{job.title}</Link> at {job.company}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
