export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">TalentBridge Documentation</h1>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Feature Overview</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>Candidate job search with filter-driven discovery UX.</li>
          <li>Job detail page with quick apply and skill context.</li>
          <li>Role-based onboarding for candidate and employer.</li>
          <li>Employer dashboard and post-job workflow.</li>
          <li>Application and saved jobs management views.</li>
        </ul>
      </section>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Architecture</h2>
        <p className="mt-3 text-sm text-zinc-700">
          Next.js App Router powers UI and API routes. A custom JWT implementation handles auth, and a lightweight JSON 
          file handles data state. A role guard protects dashboard routes. CI validates lint, types, tests, and build before deployment.
        </p>
      </section>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">CI/CD</h2>
        <p className="mt-3 text-sm text-zinc-700">
          GitHub Actions runs quality gates in `ci.yml`, then deploys to Vercel via `deploy-vercel.yml` on successful
          `main` pipeline completion.
        </p>
      </section>
    </div>
  );
}
