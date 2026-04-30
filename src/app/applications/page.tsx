const applications = [
  { job: "Frontend Engineer", company: "Nova Labs", status: "Applied" },
  { job: "Backend Engineer", company: "ScaleGrid", status: "Interview" },
  { job: "Product Designer", company: "BrightHire", status: "Shortlisted" },
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-zinc-900">My applications</h1>
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <ul className="divide-y divide-zinc-200">
          {applications.map((application) => (
            <li key={`${application.company}-${application.job}`} className="flex items-center justify-between py-3 text-sm">
              <span>{application.job} at {application.company}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{application.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
