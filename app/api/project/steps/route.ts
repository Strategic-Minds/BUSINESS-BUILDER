import { NextResponse } from "next/server";
import { clientSteps } from "@/lib/site-data";

export async function GET() {
  return NextResponse.json({ status: "ok", steps: clientSteps });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    status: "step_update_staged",
    requested_step: body.step || null,
    requested_status: body.status || null,
    live_write: false
  });
}
