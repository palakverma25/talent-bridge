import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply-form";
import { getJobById } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-3xl font-bold text-zinc-900">{job.title}</h1>
        <p className="text-zinc-600">
          {job.company} - {job.location}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-zinc-100 px-3 py-1">{job.workMode}</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">{job.jobType}</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">{job.experienceLevel}</span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700">{job.description}</p>
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Required skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="rounded-md border border-zinc-300 px-2 py-1 text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-600">Compensation</p>
          <p className="text-lg font-semibold text-zinc-900">{job.salary}</p>
        </div>
        <ApplyForm jobId={job.id} />
      </aside>
    </div>
  );
}
