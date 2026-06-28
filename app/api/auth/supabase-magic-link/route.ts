import { NextResponse } from "next/server";
import { envGroups, missingEnv, setupNotice } from "@/lib/site-data";

export async function POST(request: Request) {
  const missing = missingEnv(envGroups.supabase);
  if (missing.length) return NextResponse.json(setupNotice("Supabase Magic Link", missing), { status: 200 });

  const form = await request.formData();
  const email = String(form.get("email") || "");
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/otp`, {
    method: "POST",
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      "content-type": "application/json"
    },
    body: JSON.stringify({ email, type: "magiclink" })
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) return NextResponse.json({ status: "magic_link_failed", message: data.error_description || data.msg || "Magic link failed" }, { status: 400 });
  return NextResponse.json({ status: "ok", message: "Magic link requested." });
}

export async function GET() {
  return NextResponse.json(setupNotice("Supabase Magic Link", missingEnv(envGroups.supabase)));
}
