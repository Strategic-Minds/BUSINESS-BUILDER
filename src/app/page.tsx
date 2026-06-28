import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Business Factory — Epoxy & Decorative Concrete OS",
  description:
    "Autonomous website, CRM, proposal, payment, WhatsApp, and SEO system. First vertical: epoxy garage floors and polished concrete.",
  alternates: { canonical: "/" },
};

const PACKAGES = [
  {
    name: "Starter",     price: "$297/mo",  features: ["5-page website","Lead capture","Email follow-up","Basic SEO"] },
  {
    name: "Growth",      price: "$597/mo",  features: ["10-page website","CRM + pipeline","WhatsApp automation","Advanced SEO"] },
  {
    name: "Pro",         price: "$997/mo",  features: ["Unlimited pages","Floor visualizer","Proposal engine","Payment gating"] },
  {
    name: "Enterprise",  price: "Custom",   features: ["Full OS deploy","70-city network","AI bidding engine","White-glove setup"] },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        data-testid="hero"
        className="hero min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <p className="text-sm uppercase tracking-widest text-[#F6B800] mb-4">
          Strategic Minds Advisory
        </p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 max-w-4xl">
          The AI Operating System for<br />
          <span className="text-[#F6B800]">Epoxy & Decorative Concrete</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-10">
          Autonomous website, CRM, proposal engine, payment gating, WhatsApp automation,
          floor visualizer, and SEO — all built and managed by AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/intake"
            data-testid="cta-primary"
            className="cta-primary px-8 py-4 rounded-lg font-bold text-black bg-[#F6B800] hover:bg-[#D4A000] transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="#packages"
            className="px-8 py-4 rounded-lg font-bold border border-white/20 hover:border-[#F6B800] transition-colors"
          >
            View Packages
          </Link>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-center text-sm text-gray-400">
          <div><span className="text-[#F6B800] font-bold text-2xl block">496</span>Contractors Trained</div>
          <div><span className="text-[#F6B800] font-bold text-2xl block">70</span>Cities Planned</div>
          <div><span className="text-[#F6B800] font-bold text-2xl block">20+</span>Years Industry Experience</div>
          <div><span className="text-[#F6B800] font-bold text-2xl block">24/7</span>AI Agents Running</div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" data-testid="packages" className="packages py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Choose Your Package</h2>
          <p className="text-center text-gray-400 mb-16">Start free. Scale to enterprise. Cancel anytime.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                data-package={pkg.name.toLowerCase()}
                className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col hover:border-[#F6B800]/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                <p className="text-2xl font-black text-[#F6B800] mb-4">{pkg.price}</p>
                <ul className="space-y-2 flex-1 text-sm text-gray-400 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-[#F6B800] mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/intake?package=${pkg.name.toLowerCase()}`}
                  className="block text-center py-3 rounded-lg font-bold border border-[#F6B800] text-[#F6B800] hover:bg-[#F6B800] hover:text-black transition-colors text-sm"
                >
                  Get {pkg.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Strategic Minds Advisory",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            description:
              "AI-powered business OS for epoxy and decorative concrete contractors.",
            service: {
              "@type": "Service",
              name: "AI Business Factory",
              serviceType: "Business Automation Software",
            },
          }),
        }}
      />
    </main>
  );
}
