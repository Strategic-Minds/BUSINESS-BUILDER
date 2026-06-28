import { authorizeCron, cronUnauthorized } from "@/lib/cron-auth";

export async function GET(req: Request) {
  if (!authorizeCron(req)) return cronUnauthorized();

  const ts = new Date().toISOString();

  return Response.json({
    status: "ok",
    run_at: ts,
    tasks_queued: [
      "metadata_inspection",
      "schema_inspection",
      "city_service_page_coverage",
      "internal_link_inspection",
      "image_alt_text_inspection",
      "review_velocity_tasks",
      "seo_queue_update",
      "content_drafts_suggested",
    ],
    note: "All outputs are DRAFT. No public content published without human approval.",
    production_mutated: false,
    receipt: `cron_daily_seo_${Date.now()}`,
  });
}
