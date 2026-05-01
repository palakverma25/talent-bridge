import { requireRole, getUser } from "@/lib/auth";
import { getJobs, getApplicationsByEmail } from "@/lib/db";
import Link from "next/link";
import { Bookmark, Send, Sparkles, ChevronRight, Briefcase } from "lucide-react";

export default async function CandidateDashboard() {
  await requireRole(["candidate"]);
  const user = await getUser();

  const myApplications = getApplicationsByEmail(user?.email || "");
  const allJobs = getJobs();

  myApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-700 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Candidate Dashboard</h1>
        <p className="mt-2 text-indigo-100 max-w-xl">Track your progress, monitor your applications, and discover new opportunities tailored to you.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-slate-100 p-4 text-slate-600">
            <Bookmark size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Saved jobs</p>
            <p className="text-3xl font-bold text-slate-900">0</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-violet-100 p-4 text-violet-600">
            <Send size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Applications sent</p>
            <p className="text-3xl font-bold text-slate-900">{myApplications.length}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-fuchsia-100 p-4 text-fuchsia-600">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Profile strength</p>
            <p className="text-3xl font-bold text-slate-900">84%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">My Applications</h2>
            <Link href="/applications" className="text-sm font-semibold text-violet-600 hover:text-violet-800">View all</Link>
          </div>
          
          {myApplications.length === 0 ? (
            <div className="text-center py-10 rounded-xl bg-slate-50 border border-dashed border-slate-200">
              <Send size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm text-slate-500 font-medium">No applications yet.</p>
              <Link href="/jobs" className="mt-2 inline-block text-xs font-semibold text-violet-600 hover:text-violet-800">Browse jobs →</Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {myApplications.map((app) => {
                const job = allJobs.find(j => j.id === app.jobId);
                return (
                  <li key={app.id} className="group flex items-center justify-between py-4 hover:bg-slate-50/50 transition-colors -mx-4 px-4 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <Link href={`/jobs/${job?.id}`} className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">{job?.title}</Link>
                        <p className="text-sm text-slate-500">{job?.company}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold border border-amber-200/50">
                      {app.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recommended for you</h2>
          </div>
          <ul className="space-y-4">
            {allJobs.slice(0, 3).map((job) => (
              <li key={job.id} className="group flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:border-violet-200 hover:shadow-md transition-all">
                <div>
                  <Link href={`/jobs/${job.id}`} className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">{job.title}</Link>
                  <p className="text-sm text-slate-500">{job.company}</p>
                </div>
                <Link href={`/jobs/${job.id}`} className="rounded-full bg-slate-50 p-2 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                  <ChevronRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
