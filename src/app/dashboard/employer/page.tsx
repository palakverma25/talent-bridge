import Link from "next/link";
import { requireRole, getUser } from "@/lib/auth";
import { getJobs, getApplicationsByJobId } from "@/lib/db";
import { Briefcase, Users, Clock, ChevronRight } from "lucide-react";

export default async function EmployerDashboard() {
  await requireRole(["employer"]);
  const user = await getUser();
  
  const allJobs = getJobs().filter(j => j.employerEmail === user?.email);
  const allApplications = allJobs.flatMap(j => getApplicationsByJobId(j.id));

  allApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  return (
    <div className="space-y-8">
      <div className="rounded-3xl gradient-bg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Employer Dashboard</h1>
            <p className="mt-2 text-indigo-100 max-w-xl">Manage your hiring pipeline, review applicants, and keep candidate communication consistent.</p>
          </div>
          <Link href="/post-job" className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-900 shadow-md hover:bg-violet-50 transition-all hover:scale-105">
            + Post new job
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-violet-100 p-4 text-violet-600">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active jobs</p>
            <p className="text-3xl font-bold text-slate-900">{allJobs.length}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-indigo-100 p-4 text-indigo-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total applicants</p>
            <p className="text-3xl font-bold text-slate-900">{allApplications.length}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-full bg-fuchsia-100 p-4 text-fuchsia-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Avg. time to hire</p>
            <p className="text-3xl font-bold text-slate-900">2.1d</p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent applicants</h2>
          <button className="text-sm font-semibold text-violet-600 hover:text-violet-800">View all</button>
        </div>
        
        {allApplications.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-slate-50 border border-dashed border-slate-200">
            <Users size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500 font-medium">No applicants yet.</p>
            <p className="text-xs text-slate-400 mt-1">When candidates apply, they will appear here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {allApplications.map((app) => {
              const job = allJobs.find(j => j.id === app.jobId);
              return (
                <li key={app.id} className="group flex items-center justify-between py-4 hover:bg-slate-50/50 transition-colors -mx-4 px-4 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {app.applicantName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{app.applicantName}</p>
                      <p className="text-sm text-slate-500">Applied for <span className="font-medium text-slate-700">{job?.title}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold border border-amber-200/50">
                      {app.status}
                    </span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-violet-500 transition-colors" />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
