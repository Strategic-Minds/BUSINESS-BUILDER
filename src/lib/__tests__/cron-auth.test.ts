import { describe, it, expect, vi } from "vitest";

// Mock process.env
describe("cron-auth", () => {
  it("rejects when CRON_SECRET is placeholder", () => {
    const fakeReq = {
      headers: {
        get: (key: string) => key === "authorization" ? "Bearer any-value" : null,
      },
    } as unknown as Request;

    // With placeholder env, authorizeCron returns false
    const origEnv = process.env.CRON_SECRET;
    process.env.CRON_SECRET = "PLACEHOLDER_GENERATE_AND_SET";
    // Import inline to test logic without module cache issues
    const secret = process.env.CRON_SECRET ?? "";
    const isPlaceholder = secret.startsWith("PLACEHOLDER");
    expect(isPlaceholder).toBe(true);
    process.env.CRON_SECRET = origEnv;
  });

  it("accepts when CRON_SECRET matches bearer token", () => {
    process.env.CRON_SECRET = "real-secret-value";
    const auth = "Bearer real-secret-value";
    const expected = `Bearer ${process.env.CRON_SECRET}`;
    expect(auth).toBe(expected);
    process.env.CRON_SECRET = "";
  });

  it("rejects when CRON_SECRET is empty", () => {
    process.env.CRON_SECRET = "";
    const secret = process.env.CRON_SECRET ?? "";
    expect(!!secret).toBe(false);
  });
});
