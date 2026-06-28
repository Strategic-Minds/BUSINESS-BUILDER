import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    status: "approval_recorded_preview",
    action: body.action || "approve",
    step: body.step || "current",
    receipt_timestamp: new Date().toISOString(),
    live_write: false
  });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    approvals: [{ step: "Share Your Idea", status: "active", receipt_timestamp: null }]
  });
}
