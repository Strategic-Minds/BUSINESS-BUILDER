import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Dashboard — AI Business Factory",
  robots: "noindex,nofollow",
};

const TIMELINE_STEPS = [
  { gate: 1, label: "Discovery & Brand", status: "complete" },
  { gate: 2, label: "Site Build",         status: "in_progress" },
  { gate: 3, label: "Automations",        status: "pending" },
  { gate: 4, label: "Launch & SEO",       status: "pending" },
];

export default function ClientDashboard() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-black mb-1">Client Dashboard</h1>
        <p className="text-gray-400 mb-8">Track your build progress, approvals, and payments.</p>

        {/* Approval Timeline */}
        <section data-testid="approval-timeline" className="approval-timeline mb-10">
          <h2 className="text-lg font-bold mb-4">Build Timeline</h2>
          <div className="space-y-3">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.gate} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${step.status === "complete" ? "bg-green-500 text-black" :
                    step.status === "in_progress" ? "bg-[#F6B800] text-black" :
                    "bg-white/10 text-gray-400"}`}>
                  {step.gate}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Gate {step.gate}: {step.label}</p>
                  <p className="text-xs text-gray-400 capitalize">{step.status.replace("_"," ")}</p>
                </div>
                {step.status === "in_progress" && (
                  <span className="text-xs text-[#F6B800] border border-[#F6B800]/30 rounded px-2 py-1">In Progress</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Payment Gates */}
        <section data-testid="payment-gates" className="payment-gates mb-10">
          <h2 className="text-lg font-bold mb-4">Payment Gates</h2>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Gate 2 Payment</span>
              <span className="text-xs text-yellow-400 border border-yellow-400/30 rounded px-2 py-1">Due</span>
            </div>
            <p className="text-2xl font-black mb-1">$497</p>
            <p className="text-xs text-gray-400 mb-4">Due before site build begins</p>
            <a href="/payment" className="inline-block px-6 py-2 rounded-lg bg-[#F6B800] text-black font-bold text-sm hover:bg-[#D4A000] transition-colors">
              Pay Now →
            </a>
          </div>
        </section>

        {/* Document Library */}
        <section data-testid="document-library" className="mb-10">
          <h2 className="text-lg font-bold mb-4">Document Library</h2>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5 text-sm text-gray-400">
            <p>No documents yet. Your brand guide and proposal will appear here after Gate 1 approval.</p>
          </div>
        </section>

        {/* WhatsApp Notification Preview */}
        <section data-testid="whatsapp-preview" className="mb-10">
          <h2 className="text-lg font-bold mb-4">WhatsApp Notifications</h2>
          <div className="rounded-lg border border-green-500/20 bg-green-900/10 p-5">
            <p className="text-sm text-gray-400 mb-2">Next notification:</p>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
              <p className="text-green-400">✓ WhatsApp automation configured</p>
              <p className="text-gray-400 mt-1">Messages fire when payment gates and approvals update.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
