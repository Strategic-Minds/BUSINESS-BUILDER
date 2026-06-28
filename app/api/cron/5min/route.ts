import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const authorized = !expected || auth === `Bearer ${expected}`;

  if (!authorized) return NextResponse.json({ status: "unauthorized" }, { status: 401 });

  return NextResponse.json({
    status: "ok",
    cadence: "5 minutes",
    duties: [
      "check pending approvals",
      "check missing deliverables",
      "check failed notifications",
      "check payment status placeholders",
      "check project step status",
      "write receipt/log placeholder"
    ],
    production_actions: false,
    destructive_actions: false,
    receipt_timestamp: new Date().toISOString()
  });
}
