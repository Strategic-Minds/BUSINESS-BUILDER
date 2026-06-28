import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Readiness | Admin — AI Business Factory",
  robots: "noindex,nofollow",
};

type ReadinessItem = {
  name: string;
  envVars: string[];
  required: boolean;
  docLink?: string;
};

const SYSTEMS: ReadinessItem[] = [
  { name: "Supabase", envVars: ["NEXT_PUBLIC_SUPABASE_URL","NEXT_PUBLIC_SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE_KEY"], required: true },
  { name: "Stripe",   envVars: ["STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET","STRIPE_PRICE_STARTER","STRIPE_PRICE_PRO"], required: true },
  { name: "Square",   envVars: ["SQUARE_ACCESS_TOKEN","SQUARE_LOCATION_ID"], required: false },
  { name: "WhatChimp / WhatsApp", envVars: ["WHATCHIMP_API_KEY","WHATCHIMP_WORKSPACE_ID"], required: false },
  { name: "Twilio",   envVars: ["TWILIO_ACCOUNT_SID","TWILIO_AUTH_TOKEN","TWILIO_WHATSAPP_FROM"], required: true },
  { name: "Google Workspace", envVars: ["GOOGLE_SERVICE_ACCOUNT_JSON","GOOGLE_DRIVE_ROOT_FOLDER_ID"], required: true },
  { name: "OpenAI",   envVars: ["OPENAI_API_KEY"], required: true },
  { name: "GitHub",   envVars: ["GITHUB_REPO"], required: true },
  { name: "Vercel Crons", envVars: ["CRON_SECRET","QA_AGENT_SECRET","AUTOFIX_AGENT_SECRET"], required: true },
  { name: "QA Pipeline",  envVars: ["QA_AGENT_SECRET","RELEASE_GATE_SECRET"], required: true },
  { name: "SEO Agent",    envVars: ["SEO_AGENT_ENABLED","GOOGLE_SEARCH_CONSOLE_SITE_URL"], required: false },
  { name: "XPS Visualizer", envVars: ["XPS_VISUALIZER_URL"], required: false },
];

function checkStatus(vars: string[]): "configured" | "partial" | "missing" {
  const set = vars.filter(v => {
    const val = process.env[v];
    return val && val.trim() !== "" && !val.startsWith("your_") && !val.startsWith("PLACEHOLDER");
  });
  if (set.length === vars.length) return "configured";
  if (set.length > 0) return "partial";
  return "missing";
}

const STATUS_CONFIG = {
  configured: { label: "Configured",  color: "text-green-400",  bg: "bg-green-900/20",  dot: "bg-green-400" },
  partial:    { label: "Partial",      color: "text-yellow-400", bg: "bg-yellow-900/20", dot: "bg-yellow-400" },
  missing:    { label: "Missing",      color: "text-red-400",    bg: "bg-red-900/20",    dot: "bg-red-400" },
};

export default function SystemReadinessPage() {
  const checks = SYSTEMS.map(s => ({
    ...s,
    status: checkStatus(s.envVars),
    configuredCount: s.envVars.filter(v => {
      const val = process.env[v];
      return val && val.trim() !== "" && !val.startsWith("your_");
    }).length,
  }));

  const allConfigured  = checks.filter(c => c.status === "configured").length;
  const allPartial     = checks.filter(c => c.status === "partial").length;
  const allMissing     = checks.filter(c => c.status === "missing").length;
  const requiredMissing = checks.filter(c => c.required && c.status === "missing").length;

  const overallReady = requiredMissing === 0;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-8 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Admin — Internal Only</p>
          <h1 className="text-3xl font-bold mb-2">System Readiness</h1>
          <p className="text-gray-400">Environment and integration status. No secrets are displayed.</p>
        </div>

        {/* Overall status banner */}
        <div className={`rounded-lg border p-5 mb-8 ${overallReady ? "border-green-500/30 bg-green-900/10" : "border-yellow-500/30 bg-yellow-900/10"}`}>
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-bold ${overallReady ? "text-green-400" : "text-yellow-400"}`}>
              {overallReady ? "✅ Production Ready" : "⚠️ Action Required"}
            </span>
          </div>
          <div className="mt-3 flex gap-6 text-sm text-gray-400">
            <span><span className="text-green-400 font-semibold">{allConfigured}</span> configured</span>
            <span><span className="text-yellow-400 font-semibold">{allPartial}</span> partial</span>
            <span><span className="text-red-400 font-semibold">{allMissing}</span> missing</span>
            {requiredMissing > 0 && (
              <span className="text-red-400 font-semibold">{requiredMissing} required missing</span>
            )}
          </div>
        </div>

        {/* System grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checks.map(c => {
            const cfg = STATUS_CONFIG[c.status];
            return (
              <div key={c.name} className={`rounded-lg border border-white/10 ${cfg.bg} p-5`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="font-semibold">{c.name}</span>
                      {!c.required && (
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">optional</span>
                      )}
                    </div>
                    <span className={`text-sm ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {c.configuredCount}/{c.envVars.length} vars
                  </span>
                </div>
                <div className="space-y-1">
                  {c.envVars.map(v => {
                    const isSet = process.env[v] && process.env[v]!.trim() !== "" && !process.env[v]!.startsWith("your_");
                    return (
                      <div key={v} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={isSet ? "text-green-400" : "text-red-400"}>{isSet ? "●" : "○"}</span>
                        <code className="font-mono">{v}</code>
                        <span className="ml-auto">{isSet ? "set" : "missing"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600">
          <p>No secret values are displayed on this page. Add missing vars to Vercel dashboard.</p>
          <p className="mt-1">Last checked: {new Date().toISOString()}</p>
        </div>
      </div>
    </main>
  );
}
