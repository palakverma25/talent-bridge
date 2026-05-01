import Link from "next/link";
import { getJobs } from "@/lib/db";

export default async function SavedJobsPage() {
  const allJobs = getJobs();
  
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-zinc-900">Saved jobs</h1>
      <div className="grid gap-3">
        {allJobs.map((job) => (
          <div key={job.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="font-medium">{job.title}</p>
            <p className="text-sm text-zinc-600">{job.company}</p>
            <Link href={`/jobs/${job.id}`} className="mt-3 inline-block text-sm underline">Open job</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
