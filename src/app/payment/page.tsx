import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Setup — AI Business Factory",
  robots: "noindex",
};

function checkStripe(): boolean {
  const k = process.env.STRIPE_SECRET_KEY ?? "";
  return !!k && !k.includes("PLACEHOLDER") && k.startsWith("sk_");
}

function checkSquare(): boolean {
  const k = process.env.SQUARE_ACCESS_TOKEN ?? "";
  return !!k && !k.includes("PLACEHOLDER");
}

export default function PaymentPage() {
  const hasStripe = checkStripe();
  const hasSquare = checkSquare();

  if (!hasStripe && !hasSquare) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div
          data-testid="stripe-setup-notice"
          className="setup-notice env-missing max-w-lg text-center"
        >
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-900/10 p-8 mb-6">
            <h2 className="text-xl font-bold mb-3 text-yellow-400">Payment Provider Not Configured</h2>
            <p className="text-gray-400 mb-4">
              To accept payments, configure Stripe or Square in your Vercel environment variables.
              This page will automatically activate once credentials are set.
            </p>
            <div className="text-left bg-black/30 rounded-lg p-4 text-sm font-mono text-gray-300 space-y-1">
              <p className="text-yellow-400 mb-2"># Required env vars:</p>
              <p>STRIPE_SECRET_KEY=sk_live_...</p>
              <p>STRIPE_WEBHOOK_SECRET=whsec_...</p>
              <p>STRIPE_PRICE_STARTER=price_...</p>
            </div>
          </div>
          <a href="/admin/system-readiness" className="text-sm text-[#F6B800] hover:underline">
            → View System Readiness Dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-black mb-8">Complete Your Setup</h1>
        <div id="stripe-checkout" data-testid="stripe-checkout-container">
          <p className="text-gray-400 text-center py-12">Loading payment options...</p>
        </div>
      </div>
    </main>
  );
}
