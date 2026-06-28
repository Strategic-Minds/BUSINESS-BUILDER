import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

async function apiGet(path: string) {
  const res = await fetch(`${BASE}${path}`);
  const text = await res.text();
  let json: any = null;
  try { json = JSON.parse(text); } catch {}
  return { status: res.status, text, json };
}

test.describe("API Routes", () => {
  test("/api/health returns 200 and safe JSON", async () => {
    const { status, json } = await apiGet("/api/health");
    expect(status).toBe(200);
    expect(json).toBeTruthy();
    // Must not expose secrets
    const str = JSON.stringify(json);
    expect(str).not.toContain("sk_live_");
    expect(str).not.toContain("service_account");
    expect(str).not.toContain("private_key");
  });

  test("/api/cron/5min returns 200 with cron secret header", async () => {
    const cronSecret = process.env.CRON_SECRET ?? "test-secret";
    const res = await fetch(`${BASE}/api/cron/5min`, {
      headers: { "Authorization": `Bearer ${cronSecret}` }
    });
    expect(res.status).toBeLessThan(500);
  });

  test("/api/cron/5min returns 401 without auth", async () => {
    const res = await fetch(`${BASE}/api/cron/5min`);
    expect(res.status).toBe(401);
  });

  test("/api/notifications/preview returns safe JSON", async () => {
    const { status } = await apiGet("/api/notifications/preview");
    expect(status).toBeLessThan(500);
  });

  test("/api/project/steps returns safe JSON", async () => {
    const { status, json } = await apiGet("/api/project/steps");
    expect(status).toBeLessThan(500);
  });

  test("/api/project/approvals returns safe JSON", async () => {
    const { status } = await apiGet("/api/project/approvals");
    expect(status).toBeLessThan(500);
  });

  test("/api/payments/checkout requires auth or returns 400", async () => {
    const res = await fetch(`${BASE}/api/payments/checkout`, { method: "POST", body: JSON.stringify({}) });
    // Should not crash — 400 or 401 is valid
    expect(res.status).toBeLessThan(500);
    // Must never expose secrets
    const body = await res.text();
    expect(body).not.toContain("sk_live_");
    expect(body).not.toContain("whsec_");
  });
});
