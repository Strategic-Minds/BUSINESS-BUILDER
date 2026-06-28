import { NextResponse } from "next/server";
import { envGroups, missingEnv, packages, setupNotice } from "@/lib/site-data";

const priceEnvByPackage: Record<string, string> = {
  starter: "STRIPE_PRICE_STARTER",
  growth: "STRIPE_PRICE_GROWTH",
  pro: "STRIPE_PRICE_PRO",
  enterprise: "STRIPE_PRICE_ENTERPRISE"
};

export async function POST(request: Request) {
  const missing = missingEnv(envGroups.stripe);
  if (missing.length) return NextResponse.json(setupNotice("Stripe Checkout", missing), { status: 200 });

  const form = await request.formData();
  const packageId = String(form.get("packageId") || "growth");
  const selected = packages.find((item) => item.id === packageId) || packages[1];
  const priceEnv = priceEnvByPackage[selected.id];
  const price = process.env[priceEnv];

  if (!price) return NextResponse.json({ status: "setup_required", missing: [priceEnv] }, { status: 200 });

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
    "metadata[packageId]": selected.id,
    "metadata[packageName]": selected.name
  });
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded"
    },
    body: params
  });
  const session = await response.json().catch(() => ({}));

  if (!response.ok || !session.url) {
    return NextResponse.json({ status: "stripe_error", message: session.error?.message || "Unable to create checkout session" }, { status: 502 });
  }

  return NextResponse.redirect(session.url);
}

export async function GET() {
  return NextResponse.json(setupNotice("Stripe Checkout", missingEnv(envGroups.stripe)));
}
