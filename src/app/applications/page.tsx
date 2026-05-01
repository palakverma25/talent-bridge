import { requireRole, getUser } from "@/lib/auth";
import { getJobs, getApplicationsByEmail } from "@/lib/db";
import Link from "next/link";

export default async function ApplicationsPage() {
  await requireRole(["candidate"]);
  const user = await getUser();

  const myApplications = getApplicationsByEmail(user?.email || "");
  const allJobs = getJobs();

  myApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-zinc-900">My applications</h1>
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        {myApplications.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4 text-center">You haven't applied to any jobs yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-200">
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
        )}
      </div>
    </div>
  );
}
