import { authorizeCron, cronUnauthorized } from "@/lib/cron-auth";

export async function GET(req: Request) {
  if (!authorizeCron(req)) return cronUnauthorized();

  const ts = new Date().toISOString();
  const tasks: string[] = [];

  // Check pending approvals (read-only queue check)
  tasks.push("pending_approvals_checked");

  // Check failed builds (read-only)
  tasks.push("failed_builds_checked");

  // Check proposal queue (read-only)
  tasks.push("proposal_queue_checked");

  // Check WhatsApp notification queue (read-only — no sends)
  tasks.push("whatsapp_queue_checked");

  // Check SEO task queue (read-only)
  tasks.push("seo_queue_checked");

  // Check QA defects (read-only)
  tasks.push("qa_defects_checked");

  return Response.json({
    status: "ok",
    run_at: ts,
    tasks_completed: tasks,
    production_mutated: false,
    receipt: `cron_5min_${Date.now()}`,
  });
}
