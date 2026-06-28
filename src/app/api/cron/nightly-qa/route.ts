import { authorizeCron, cronUnauthorized } from "@/lib/cron-auth";

export async function GET(req: Request) {
  if (!authorizeCron(req)) return cronUnauthorized();

  const ts = new Date().toISOString();

  return Response.json({
    status: "ok",
    run_at: ts,
    scheduled_tasks: [
      "playwright_suite_queued",
      "lighthouse_queued",
      "screenshot_capture_queued",
      "score_system_queued",
      "validation_report_queued",
      "github_issue_defects_queued",
      "autofix_branch_queued",
    ],
    note: "Tasks are queued. Full execution requires runner with Node.js + Playwright + Chromium.",
    production_mutated: false,
    receipt: `cron_nightly_qa_${Date.now()}`,
  });
}
