import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ approvals: [], pending: 0, note: "No pending approvals." });
}

export async function POST() {
  return NextResponse.json({ error: "Approval submission requires authentication." }, { status: 401 });
}
