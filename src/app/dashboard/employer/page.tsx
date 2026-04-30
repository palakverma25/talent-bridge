import Link from "next/link";
import { requireRole } from "@/lib/auth";

const applicants = [
  { name: "Aarav Nair", role: "Frontend Engineer", status: "Shortlisted" },
  { name: "Neha Rao", role: "Backend Engineer", status: "In review" },
  { name: "Karthik R", role: "Product Designer", status: "Interview" },
];

export default async function EmployerDashboard() {
  const { demoMode } = await requireRole(["employer"]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Employer dashboard</h1>
            <p className="mt-2 text-zinc-600">Manage your hiring pipeline and keep candidate communication consistent.</p>
          </div>
          <Link href="/post-job" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Post new job</Link>
        </div>
        {demoMode && <p className="mt-3 text-sm text-amber-700">Demo mode is active until Supabase env is configured.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Active jobs</p><p className="text-2xl font-bold">4</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">New applicants</p><p className="text-2xl font-bold">18</p></div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">Avg. time to shortlist</p><p className="text-2xl font-bold">2.1d</p></div>
      </div>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Recent applicants</h2>
        <ul className="mt-3 divide-y divide-zinc-200">
          {applicants.map((applicant) => (
            <li key={applicant.name} className="flex items-center justify-between py-3 text-sm">
              <span>{applicant.name} - {applicant.role}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{applicant.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
