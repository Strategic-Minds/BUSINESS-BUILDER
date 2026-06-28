import { authorizeCron, cronUnauthorized } from "@/lib/cron-auth";

export async function GET(req: Request) {
  if (!authorizeCron(req)) return cronUnauthorized();

  const ts = new Date().toISOString();

  const envChecks = {
    supabase:   !!(process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")),
    stripe:     !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")),
    twilio:     !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith("AC")),
    openai:     !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")),
    cron_secret:!!(process.env.CRON_SECRET && !process.env.CRON_SECRET.includes("PLACEHOLDER")),
  };

  const allHealthy = Object.values(envChecks).every(Boolean);

  return Response.json({
    status:            allHealthy ? "healthy" : "degraded",
    run_at:            ts,
    env_readiness:     envChecks,
    api_routes: {
      health:         "/api/health",
      cron_5min:      "/api/cron/5min",
      nightly_qa:     "/api/cron/nightly-qa",
      daily_seo:      "/api/cron/daily-seo",
      workflow_health:"/api/cron/workflow-health",
    },
    production_mutated: false,
    receipt: `cron_workflow_health_${Date.now()}`,
  });
}
