import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    status: "logged_preview",
    receipt: {
      type: "notification",
      channel: body.channel || "whatsapp",
      approved: body.approved === true,
      created_at: new Date().toISOString()
    }
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok", mode: "append_only_preview" });
}
