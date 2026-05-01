import { applyJobAction } from "@/lib/actions";

export function ApplyForm({ jobId }: { jobId: string }) {
  return (
    <form action={applyJobAction} className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
      <h3 className="text-base font-semibold text-zinc-900">Quick apply</h3>
      <input type="hidden" name="jobId" value={jobId} />
      <input
        name="fullName"
        placeholder="Full name"
        required
        minLength={2}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <textarea
        name="coverLetter"
        placeholder="Why are you a strong fit for this role?"
        rows={5}
        required
        minLength={30}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <button type="submit" className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Submit application
      </button>
    </form>
  );
}
