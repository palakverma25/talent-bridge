import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/data/mock";

export async function GET() {
  return NextResponse.json({ jobs: mockJobs });
}
