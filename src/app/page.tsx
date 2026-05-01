import Link from "next/link";
import { getJobs } from "@/lib/db";
import { JobCard } from "@/components/job-card";

export default async function Home() {
  const allJobs = getJobs();
  
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl gradient-bg p-12 sm:p-20 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-200 mb-4">High-quality hiring UX</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find your next role faster. <br className="hidden sm:block" />
            <span className="text-violet-200">Hire better candidates.</span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 leading-relaxed max-w-2xl">
            TalentBridge gives candidates a clear and focused discovery experience while helping employers post roles,
            review applicants, and move faster with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/jobs" className="rounded-full bg-white text-indigo-900 px-8 py-3.5 text-sm font-bold hover:bg-violet-50 transition-all hover:scale-105 shadow-lg">
              Browse jobs
            </Link>
            <Link href="/post-job" className="rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md px-8 py-3.5 text-sm font-bold hover:bg-white/20 transition-all hover:scale-105">
              Post a job
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured opportunities</h2>
          <Link href="/jobs" className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">View all →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {allJobs.slice(0, 4).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
