import React from "react";
import Link from "next/link";

export const metadata = {
  title: "AutoBuilder OS — The Idea Machine",
  description: "Any thought, dream, desire, want, or need → finished production system. The front of the AutoBuilder OS pipeline.",
};

export default function IdeaMachinePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0A", color: "#FAFAFA", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(0,0,0,0.95)", borderBottom: "1px solid #1a1a1a", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F6B800", boxShadow: "0 0 8px #F6B800" }} />
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.05em" }}>AUTOBUILDER <span style={{ color: "#F6B800" }}>OS</span></span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/discovery" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Discovery</Link>
          <Link href="/api/idea" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>API</Link>
          <Link href="/api/health" style={{ background: "#1a1a1a", color: "#F6B800", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>System Status</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 32px 60px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111", border: "1px solid #F6B80033", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#F6B800", fontWeight: 600, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          PIPELINE ACTIVE — ALL SYSTEMS ONLINE
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Any Thought.<br />
          <span style={{ color: "#F6B800" }}>Any Dream.</span><br />
          Finished System.
        </h1>
        <p style={{ fontSize: 18, color: "#888", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 40px" }}>
          Type a desire, paste a URL, drop a vision document, describe a problem —
          AutoBuilder OS converts anything a human or AI can possibly think or dream of into a live, production-grade system.
        </p>

        {/* The Input */}
        <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 16, padding: 4, maxWidth: 700, margin: "0 auto 16px", boxShadow: "0 0 40px rgba(246,184,0,0.05)" }}>
          <textarea
            placeholder="What do you want to build? A city site for Dallas... An AI that closes leads while I sleep... I want $50k/month from epoxy... My customers need instant quotes..."
            style={{ width: "100%", minHeight: 120, background: "transparent", border: "none", outline: "none", padding: "20px 24px 12px", fontSize: 16, color: "#FAFAFA", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px 12px 24px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {["💭 Thought", "🔗 URL", "📄 Document", "💰 Desire", "🎯 Problem"].map((tag, i) => (
                <button key={i} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#888", padding: "4px 10px", borderRadius: 12, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  {tag}
                </button>
              ))}
            </div>
            <button style={{ background: "#F6B800", color: "#000", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", border: "none", fontFamily: "inherit", letterSpacing: "0.03em" }}>
              BUILD IT →
            </button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#444" }}>AI parses → simulates → queues → builds. No configuration needed.</p>
      </section>

      {/* The Pipeline */}
      <section style={{ padding: "0 32px 80px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>WHAT HAPPENS NEXT</p>
          <p style={{ color: "#666", fontSize: 14 }}>From input to live system — fully autonomous, no human required</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, alignItems: "start" }}>
          {[
            { n: "1", label: "IDEA", desc: "Parse + classify", color: "#F6B800", icon: "💡" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "2", label: "SIMULATE", desc: "Revenue + ROI", color: "#60A5FA", icon: "📊" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "3", label: "DISCOVER", desc: "Research + benchmark", color: "#34D399", icon: "🔍" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "4", label: "QUEUE", desc: "Priority ranked", color: "#A78BFA", icon: "📋" },
          ].map((step, i) => (
            step.label ? (
              <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{step.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{step.desc}</div>
              </div>
            ) : (
              <div key={i} style={{ textAlign: "center", paddingTop: 24, color: "#2a2a2a", fontSize: 20 }}>→</div>
            )
          ))}
        </div>

        <div style={{ marginTop: 4, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {[
            { n: "5", label: "ANALYZE", desc: "Agent-Zero scores 12 dimensions", color: "#F59E0B", icon: "🧠" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "6", label: "QA TEST", desc: "Frontend + backend tested", color: "#EC4899", icon: "✅" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "7", label: "BUILD", desc: "AUTO_BUILDER executes", color: "#8B5CF6", icon: "🔨" },
            { n: "→", label: "", desc: "", color: "#333", icon: "" },
            { n: "8", label: "LIVE", desc: "Production deployed", color: "#4ade80", icon: "🚀" },
          ].map((step, i) => (
            step.label ? (
              <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{step.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{step.desc}</div>
              </div>
            ) : (
              <div key={i} style={{ textAlign: "center", paddingTop: 24, color: "#2a2a2a", fontSize: 20 }}>→</div>
            )
          ))}
        </div>
      </section>

      {/* What it can build */}
      <section style={{ padding: "60px 32px", background: "#0a0a0a", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 40 }}>
            ANYTHING A HUMAN OR AI CAN POSSIBLY THINK OR DREAM OF
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              ["🌐", "Website", "Full production site, SEO, CRO"],
              ["🏙️", "City Site", "One of 70 epoxy metro sites"],
              ["🤖", "AI Agent", "Custom autonomous agent"],
              ["⚙️", "Automation", "Workflow + cron + pipeline"],
              ["🔍", "Intelligence", "Market + competitor research"],
              ["📱", "Content Machine", "Social + SEO factory"],
              ["📊", "Client Portal", "Delivery dashboard"],
              ["📦", "Consulting Pack", "Brand + strategy + PDF"],
              ["🛒", "E-Commerce", "Shopify + checkout"],
              ["📈", "Data System", "Analytics + reporting"],
            ].map(([icon, type, desc], i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{type}</div>
                <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Queue */}
      <section style={{ padding: "60px 32px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>LIVE QUEUE</p>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Ideas in Pipeline</h2>
          </div>
          <Link href="/api/idea" style={{ background: "#F6B800", color: "#000", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            + New Idea
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { idea: "Build 70 city epoxy floor sites — one per US metro", type: "city_site", priority: 10, status: "building", rev: "$2.1M/yr", score: 90 },
            { idea: "Automated PCU alumni WhatsApp + email outreach campaign", type: "automation", priority: 9, status: "queued", rev: "$498K/yr", score: 88 },
            { idea: "Sell AutoBuilder OS to any business owner globally", type: "consulting_pack", priority: 10, status: "queued", rev: "$1.2M/yr", score: 95 },
            { idea: "AI floor visualizer — homeowner uploads room photo", type: "website", priority: 8, status: "discovery", rev: "$360K/yr", score: 85 },
            { idea: "600 AI posts/month — faceless content machine", type: "content_machine", priority: 7, status: "queued", rev: "$844K/yr", score: 82 },
          ].map((item, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: item.status === "building" ? "#F6B80022" : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: item.priority >= 9 ? "#F6B800" : "#666", flexShrink: 0 }}>
                {item.priority}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.idea}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "#555", background: "#1a1a1a", padding: "2px 8px", borderRadius: 10 }}>{item.type}</span>
                  <span style={{ fontSize: 11, color: "#4ade80" }}>{item.rev}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.status === "building" ? "#F6B800" : item.status === "discovery" ? "#60A5FA" : "#666", textTransform: "uppercase" }}>{item.status}</div>
                <div style={{ fontSize: 11, color: "#444" }}>Score: {item.score}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #111", padding: "24px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#333", margin: 0 }}>
          AutoBuilder OS — <span style={{ color: "#F6B800" }}>ai@autobuilderos.com</span> — Built while Jeremy sleeps.
        </p>
      </footer>
    </main>
  );
}
