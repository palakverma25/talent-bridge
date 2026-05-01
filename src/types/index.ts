export type UserRole = "candidate" | "employer";

export type JobType = "full-time" | "part-time" | "contract" | "internship";

export type WorkMode = "remote" | "hybrid" | "on-site";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: "entry" | "mid" | "senior";
  description: string;
  skills: string[];
  postedAt: string;
  employerEmail?: string;
}

export interface JobFilters {
  query?: string;
  location?: string;
  workMode?: WorkMode | "all";
  jobType?: JobType | "all";
}

export interface Application {
  id: string;
  jobId: string;
  applicantEmail: string;
  applicantName: string;
  resumeUrl?: string;
  status: "In review" | "Shortlisted" | "Interview" | "Rejected";
  appliedAt: string;
}
