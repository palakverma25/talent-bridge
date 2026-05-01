import { applyJobAction } from "@/lib/actions";
import { SendHorizontal } from "lucide-react";

export function ApplyForm({ jobId }: { jobId: string }) {
  return (
    <form action={applyJobAction} className="space-y-5 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
      <div className="mb-2">
        <h3 className="text-xl font-bold text-slate-900">Quick apply</h3>
        <p className="text-sm text-slate-500 mt-1">Send your profile directly to the hiring team.</p>
      </div>
      
      <input type="hidden" name="jobId" value={jobId} />
      
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
        <input
          name="fullName"
          placeholder="Jane Doe"
          required
          minLength={2}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all bg-slate-50 focus:bg-white"
        />
      </div>
      
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="jane@example.com"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all bg-slate-50 focus:bg-white"
        />
      </div>
      
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Pitch yourself</label>
        <textarea
          name="coverLetter"
          placeholder="Why are you a strong fit for this role?"
          rows={4}
          required
          minLength={30}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all bg-slate-50 focus:bg-white resize-none"
        />
      </div>
      
      <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-violet-600 hover:shadow-lg transition-all active:scale-[0.98]">
        Submit application
        <SendHorizontal size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
