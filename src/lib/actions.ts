"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken } from "./auth";
import { UserRole } from "@/types";

const COOKIE_NAME = "auth_token";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  
  // Simple dummy check: If it contains 'employer', they are an employer, otherwise candidate.
  // In a real app, you would check a database.
  const role: UserRole = email.toLowerCase().includes("employer") ? "employer" : "candidate";

  const token = await signToken({ email, role });
  
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect(role === "employer" ? "/dashboard/employer" : "/dashboard/candidate");
}

export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const role = String(formData.get("role") ?? "candidate") as UserRole;

  const token = await signToken({ email, role });
  
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Redirect to onboarding or directly to dashboard
  redirect("/auth/onboarding");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/auth/sign-in");
}

export async function setRoleAction(role: UserRole) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) {
    redirect("/auth/sign-in");
  }

  // We need the email from the old token to create a new one
  // For simplicity we just use a default or decode it
  // But wait, we can't easily decode it here without verifyToken
  const { verifyToken } = await import("./auth");
  const payload = await verifyToken(token);
  
  if (!payload) {
    redirect("/auth/sign-in");
  }

  const newToken = await signToken({ email: payload.email, role });
  
  cookieStore.set(COOKIE_NAME, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect(role === "employer" ? "/dashboard/employer" : "/dashboard/candidate");
}

export async function createJobAction(formData: FormData) {
  const { getUser } = await import("./auth");
  const user = await getUser();
  if (!user || user.role !== "employer") {
    redirect("/auth/sign-in");
  }

  const { createJob } = await import("./db");
  const id = Date.now().toString(); // simple ID generation
  const title = String(formData.get("title") ?? "");
  const company = String(formData.get("company") ?? "");
  const location = String(formData.get("location") ?? "");
  const description = String(formData.get("description") ?? "");
  
  createJob({
    id,
    title,
    company,
    location,
    salary: "Not specified",
    jobType: "full-time",
    workMode: "on-site",
    experienceLevel: "mid",
    description,
    skills: [],
    postedAt: "Just now",
    employerEmail: user.email,
  });
  redirect("/dashboard/employer");
}

export async function applyJobAction(formData: FormData) {
  const { getUser } = await import("./auth");
  const user = await getUser();
  if (!user || user.role !== "candidate") {
    redirect("/auth/sign-in");
  }

  const { createApplication } = await import("./db");
  const jobId = String(formData.get("jobId") ?? "");
  const applicantName = String(formData.get("fullName") ?? user.email.split("@")[0]);
  
  createApplication({
    id: `app-${Date.now()}`,
    jobId,
    applicantEmail: user.email,
    applicantName,
    status: "In review",
    appliedAt: new Date().toISOString(),
  });

  redirect("/dashboard/candidate");
}
