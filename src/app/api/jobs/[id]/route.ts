import { NextRequest, NextResponse } from "next/server";
import { mockJobs } from "@/lib/data/mock";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const job = mockJobs.find((item) => item.id === id);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ job });
}
