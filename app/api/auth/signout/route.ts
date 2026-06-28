import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ status: "ok", message: "Client sign-out route is ready for Supabase session integration." });
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Use POST to sign out when session cookies are configured." });
}
