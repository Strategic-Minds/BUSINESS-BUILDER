import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "Strategic Minds AI Business Factory",
    vertical: process.env.NEXT_PUBLIC_PRIMARY_VERTICAL ?? "epoxy",
    timestamp: new Date().toISOString(),
    env: {
      supabase:  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")),
      stripe:    !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")),
      twilio:    !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith("AC")),
      openai:    !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")),
    },
    // NEVER expose secret values — only boolean status
    version: "0.1.0",
  });
}
