import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Validate Stripe env
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
  if (!stripeKey || stripeKey.includes("PLACEHOLDER") || !stripeKey.startsWith("sk_")) {
    return NextResponse.json(
      { error: "Payment provider not configured.", setup_url: "/admin/system-readiness" },
      { status: 400 }
    );
  }

  // Never expose secret key in response
  return NextResponse.json(
    { error: "Authentication required to initiate checkout." },
    { status: 401 }
  );
}
