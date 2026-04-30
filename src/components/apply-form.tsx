"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  coverLetter: z.string().min(30, "Add a brief pitch (at least 30 chars)"),
});

type FormData = z.infer<typeof schema>;

export function ApplyForm() {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
      <h3 className="text-base font-semibold text-zinc-900">Quick apply</h3>
      <input
        {...register("fullName")}
        placeholder="Full name"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      <textarea
        {...register("coverLetter")}
        placeholder="Why are you a strong fit for this role?"
        rows={5}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      {errors.coverLetter && <p className="text-xs text-red-600">{errors.coverLetter.message}</p>}
      <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Submit application
      </button>
      {isSubmitSuccessful && <p className="text-xs text-emerald-700">Application submitted successfully.</p>}
    </form>
  );
}
