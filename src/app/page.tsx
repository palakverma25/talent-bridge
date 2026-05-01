import Link from "next/link";
import { getJobs } from "@/lib/db";
import { JobCard } from "@/components/job-card";

export default async function Home() {
  const allJobs = getJobs();
  
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">High-quality hiring UX</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-zinc-900">
          Find your next role faster. Hire better candidates with less friction.
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600">
          TalentBridge gives candidates a clear and focused discovery experience while helping employers post roles,
          review applicants, and move faster with confidence.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
            Browse jobs
          </Link>
          <Link href="/post-job" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium">
            Post a job
          </Link>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-900">Featured opportunities</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {allJobs.slice(0, 2).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
