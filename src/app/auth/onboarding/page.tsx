"use client";

import { setRoleAction } from "@/lib/actions";
import { UserCircle, BriefcaseBusiness, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Choose your path</h1>
        <p className="mt-3 text-lg text-slate-600 max-w-lg mx-auto">Tell us how you want to use TalentBridge so we can personalize your dashboard.</p>
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <button onClick={() => setRoleAction("candidate")} className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 text-left shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <UserCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Candidate</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Discover your next big role, save jobs for later, and track all your applications in one place.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-violet-600 group-hover:text-violet-800">
              Continue as Candidate <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          <button onClick={() => setRoleAction("employer")} className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 text-left shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                <BriefcaseBusiness size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Employer</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Post new job openings, manage your hiring pipeline, and review applicants quickly and easily.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-800">
              Continue as Employer <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
