import { describe, expect, it } from "vitest";
import { filterJobs, mockJobs } from "@/lib/data/mock";

describe("filterJobs", () => {
  it("filters by query", () => {
    const results = filterJobs(mockJobs, { query: "frontend" });
    expect(results.length).toBe(1);
    expect(results[0].title).toContain("Frontend");
  });

  it("filters by location and work mode", () => {
    const results = filterJobs(mockJobs, {
      location: "pune",
      workMode: "remote",
      jobType: "all",
    });
    expect(results.length).toBe(1);
    expect(results[0].company).toBe("ScaleGrid");
  });
});
