import { NextResponse } from "next/server";
import { envGroups, missingEnv, setupNotice } from "@/lib/site-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const approved = body.approved === true;
  const missing = missingEnv(envGroups.twilio);

  if (!approved) {
    return NextResponse.json({
      status: "approval_required",
      message: "Live WhatsApp/SMS sending requires explicit admin approval.",
      live_send: false
    });
  }

  if (missing.length) return NextResponse.json(setupNotice("Twilio/WhatsApp", missing), { status: 200 });

  return NextResponse.json({
    status: "send_staged",
    message: "Twilio envs are configured, but live send implementation remains approval-gated in this preview branch.",
    live_send: false
  });
}

export async function GET() {
  return NextResponse.json(setupNotice("Twilio/WhatsApp", missingEnv(envGroups.twilio)));
}
