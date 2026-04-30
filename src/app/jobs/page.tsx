import { JobCard } from "@/components/job-card";
import { JobFilters } from "@/components/job-filters";
import { filterJobs, mockJobs } from "@/lib/data/mock";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const jobs = filterJobs(mockJobs, {
    query: params.query,
    location: params.location,
    workMode: (params.workMode as "remote" | "hybrid" | "on-site" | "all") ?? "all",
    jobType: (params.jobType as "full-time" | "part-time" | "contract" | "internship" | "all") ?? "all",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Explore jobs</h1>
        <p className="mt-2 text-zinc-600">Filter by skill, location, and work model to quickly find the best match.</p>
      </div>
      <JobFilters />
      <p className="text-sm text-zinc-600">{jobs.length} jobs found</p>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
