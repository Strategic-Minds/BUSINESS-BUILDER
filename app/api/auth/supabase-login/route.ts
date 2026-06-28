import { NextResponse } from "next/server";
import { envGroups, missingEnv, setupNotice } from "@/lib/site-data";

export async function POST(request: Request) {
  const missing = missingEnv(envGroups.supabase);
  if (missing.length) return NextResponse.json(setupNotice("Supabase Auth", missing), { status: 200 });

  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      "content-type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) return NextResponse.json({ status: "auth_failed", message: data.error_description || data.msg || "Login failed" }, { status: 401 });
  return NextResponse.json({ status: "ok", user: data.user?.email, session: Boolean(data.access_token) });
}

export async function GET() {
  return NextResponse.json(setupNotice("Supabase Auth", missingEnv(envGroups.supabase)));
}
