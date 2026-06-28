import { NextResponse } from "next/server";
import { envGroups, missingEnv } from "@/lib/site-data";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "strategic-minds-enterprise-site-v2",
    pwa: "ready",
    integrations: {
      supabase_missing: missingEnv(envGroups.supabase),
      stripe_missing: missingEnv(envGroups.stripe),
      twilio_missing: missingEnv(envGroups.twilio)
    },
    live_mutations: false
  });
}
