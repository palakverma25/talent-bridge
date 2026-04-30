import Link from "next/link";
import { Job } from "@/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{job.title}</h3>
          <p className="text-sm text-zinc-600">
            {job.company} - {job.location}
          </p>
        </div>
        <span className="text-xs text-zinc-500">{job.postedAt}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">{job.workMode}</span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">{job.jobType}</span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">{job.experienceLevel}</span>
      </div>
      <p className="mt-4 text-sm text-zinc-700">{job.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-900">{job.salary}</p>
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
