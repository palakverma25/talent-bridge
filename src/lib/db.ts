import fs from "fs";
import path from "path";
import { Job, Application } from "@/types";

const DB_PATH = path.join(process.cwd(), "src/lib/data/db.json");

interface Database {
  jobs: Job[];
  applications: Application[];
}

export function readDb(): Database {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { jobs: [], applications: [] };
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { jobs: [], applications: [] };
  }
}

export function writeDb(data: Database) {
  try {
    // Ensure dir exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}

export function getJobs() {
  return readDb().jobs;
}

export function getJobById(id: string) {
  return readDb().jobs.find((j) => j.id === id);
}

export function createJob(job: Job) {
  const db = readDb();
  db.jobs.push(job);
  writeDb(db);
}

export function getApplicationsByJobId(jobId: string) {
  return readDb().applications.filter((a) => a.jobId === jobId);
}

export function getApplicationsByEmail(email: string) {
  return readDb().applications.filter((a) => a.applicantEmail === email);
}

export function createApplication(application: Application) {
  const db = readDb();
  db.applications.push(application);
  writeDb(db);
}
