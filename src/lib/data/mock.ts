import { Job, JobFilters } from "@/types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Nova Labs",
    location: "Bengaluru",
    salary: "INR 14-22 LPA",
    jobType: "full-time",
    workMode: "hybrid",
    experienceLevel: "mid",
    description:
      "Build performant product surfaces in Next.js, collaborate closely with design, and ship user-centric features with strong accessibility.",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "ScaleGrid",
    location: "Pune",
    salary: "INR 18-28 LPA",
    jobType: "full-time",
    workMode: "remote",
    experienceLevel: "senior",
    description:
      "Design APIs, optimize query performance, and own service reliability for high-volume candidate and employer workflows.",
    skills: ["Node.js", "PostgreSQL", "REST", "CI/CD"],
    postedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Product Designer",
    company: "BrightHire",
    location: "Mumbai",
    salary: "INR 10-16 LPA",
    jobType: "contract",
    workMode: "on-site",
    experienceLevel: "mid",
    description:
      "Lead end-to-end UX for the job discovery and application journey with data-backed interaction improvements.",
    skills: ["Figma", "Design Systems", "User Research"],
    postedAt: "4 days ago",
  },
];

export const filterJobs = (jobs: Job[], filters: JobFilters) => {
  return jobs.filter((job) => {
    const query = (filters.query ?? "").toLowerCase().trim();
    const location = (filters.location ?? "").toLowerCase().trim();
    const queryMatch =
      query.length === 0 ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.skills.some((skill) => skill.toLowerCase().includes(query));

    const locationMatch =
      location.length === 0 || job.location.toLowerCase().includes(location);
    const workModeMatch =
      !filters.workMode || filters.workMode === "all" || job.workMode === filters.workMode;
    const jobTypeMatch =
      !filters.jobType || filters.jobType === "all" || job.jobType === filters.jobType;

    return queryMatch && locationMatch && workModeMatch && jobTypeMatch;
  });
};
