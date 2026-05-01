import Link from "next/link";
import { requireRole, getUser } from "@/lib/auth";
import { getJobs, getApplicationsByJobId } from "@/lib/db";

export default async function EmployerDashboard() {
  await requireRole(["employer"]);
  const user = await getUser();
  
  const allJobs = getJobs().filter(j => j.employerEmail === user?.email);
  const allApplications = allJobs.flatMap(j => getApplicationsByJobId(j.id));

  // Sort applications by latest first
  allApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Employer dashboard</h1>
            <p className="mt-2 text-zinc-600">Manage your hiring pipeline and keep candidate communication consistent.</p>
          </div>
          <Link href="/post-job" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Post new job</Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Active jobs</p><p className="text-2xl font-bold">{allJobs.length}</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">New applicants</p><p className="text-2xl font-bold">{allApplications.length}</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Avg. time to shortlist</p><p className="text-2xl font-bold">2.1d</p></div>
      </div>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Recent applicants</h2>
        <ul className="mt-3 divide-y divide-zinc-200">
          {allApplications.length === 0 && <p className="text-sm text-zinc-500">No applicants yet.</p>}
          {allApplications.map((app) => {
            const job = allJobs.find(j => j.id === app.jobId);
            return (
              <li key={app.id} className="flex items-center justify-between py-3 text-sm">
                <span>{app.applicantName} - {job?.title}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{app.status}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
