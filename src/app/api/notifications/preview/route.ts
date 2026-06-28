import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    templates: [
      { id: "project_update",   label: "Project Update",    channel: "whatsapp", status: "draft" },
      { id: "proposal_ready",   label: "Proposal Ready",    channel: "whatsapp", status: "draft" },
      { id: "payment_due",      label: "Payment Due",       channel: "whatsapp", status: "draft" },
      { id: "review_request",   label: "Review Request",    channel: "whatsapp", status: "draft" },
    ],
    configured: !!(process.env.WHATCHIMP_API_KEY && !process.env.WHATCHIMP_API_KEY.includes("PLACEHOLDER"))
             || !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith("AC")),
    note: "Preview only — no messages sent. All sends require human approval.",
    production_mutated: false,
  });
}
