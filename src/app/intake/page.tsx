import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started — AI Business Factory",
  description: "Tell us about your epoxy or concrete business. Setup takes 5 minutes.",
  robots: "noindex",
};

interface IntakePageProps {
  searchParams: Promise<{ package?: string }>;
}

export default async function IntakePage({ searchParams }: IntakePageProps) {
  const params = await searchParams;
  const selectedPackage = params.package ?? "";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-black mb-2">Let&apos;s Build Your System</h1>
        <p className="text-gray-400 mb-8">
          {selectedPackage
            ? `You selected the ${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} package.`
            : "Answer a few questions and we\'ll configure your AI business OS."}
        </p>
        <form data-testid="intake-form" action="/api/intake" method="POST" className="space-y-5">
          <input type="hidden" name="package" value={selectedPackage} />
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              id="name" name="name" type="text" required
              placeholder="Your full name"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#F6B800] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="business" className="block text-sm font-medium mb-1">Business Name *</label>
            <input
              id="business" name="business" type="text" required
              placeholder="Your company name"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#F6B800] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">Primary City / Market *</label>
            <input
              id="city" name="city" type="text" required
              placeholder="e.g. Phoenix, AZ"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#F6B800] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">WhatsApp / Phone *</label>
            <input
              id="phone" name="phone" type="tel" required
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#F6B800] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="revenue" className="block text-sm font-medium mb-1">Current Monthly Revenue</label>
            <select
              id="revenue" name="revenue"
              className="w-full rounded-lg border border-white/20 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#F6B800] focus:outline-none"
            >
              <option value="">Select range</option>
              <option value="0-5k">$0 – $5K</option>
              <option value="5k-20k">$5K – $20K</option>
              <option value="20k-50k">$20K – $50K</option>
              <option value="50k+">$50K+</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold bg-[#F6B800] text-black hover:bg-[#D4A000] transition-colors"
          >
            Build My System →
          </button>
          <p className="text-center text-xs text-gray-500">
            No credit card required. Preview-safe — no live data sent.
          </p>
        </form>
      </div>
    </main>
  );
}
