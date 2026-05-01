import Link from "next/link";
import { Job } from "@/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{job.title}</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {job.company} <span className="mx-1 text-slate-300">•</span> {job.location}
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{job.postedAt}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 border border-indigo-100">{job.workMode}</span>
        <span className="rounded-full bg-violet-50 text-violet-700 px-3 py-1 border border-violet-100">{job.jobType}</span>
        <span className="rounded-full bg-fuchsia-50 text-fuchsia-700 px-3 py-1 border border-fuchsia-100">{job.experienceLevel}</span>
      </div>
      <p className="mt-4 text-sm text-slate-600 line-clamp-2">{job.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-slate-900">{job.salary}</p>
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 transition-colors shadow-sm hover:shadow-md"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
