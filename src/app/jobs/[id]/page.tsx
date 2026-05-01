import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply-form";
import { getJobById } from "@/lib/db";
import { MapPin, Building2, Briefcase, Clock, Zap, DollarSign } from "lucide-react";

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
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-8 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <div className="border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Building2 size={16} className="text-slate-400" /> {job.company}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <MapPin size={16} className="text-slate-400" /> {job.location}
            </span>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 border border-indigo-100">
              <Zap size={14} /> {job.workMode}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-50 text-violet-700 px-4 py-2 border border-violet-100">
              <Briefcase size={14} /> {job.jobType}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-fuchsia-50 text-fuchsia-700 px-4 py-2 border border-fuchsia-100">
              <Clock size={14} /> {job.experienceLevel}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">About the role</h2>
          <p className="text-base leading-relaxed text-slate-600 whitespace-pre-wrap">{job.description}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Required skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="rounded-xl bg-slate-100 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-200 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      <aside className="space-y-6">
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
              <DollarSign size={20} />
            </div>
            <p className="text-sm font-semibold text-emerald-800">Compensation</p>
          </div>
          <p className="text-3xl font-extrabold text-emerald-900 tracking-tight">{job.salary}</p>
        </div>
        <ApplyForm jobId={job.id} />
      </aside>
    </div>
  );
}
