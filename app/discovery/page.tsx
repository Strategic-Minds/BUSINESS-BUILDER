import Link from "next/link";

export const metadata = {
  title: "DISCOVERY — AutoBuilder OS Pipeline",
  description: "Entry point for the unified AI pipeline: Discovery → Analysis → QA → Fix → Heal → Evolve",
};

export default function DiscoveryPage() {
  return (
    <main style={{
      minHeight: "100vh", background: "#0A0A0A", color: "#FAFAFA",
      fontFamily: "system-ui,-apple-system,sans-serif", padding: "0"
    }}>
      {/* Header */}
      <header style={{
        background: "#111", borderBottom: "1px solid #222",
        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F6B800" }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: "#F6B800" }}>AUTOBUILDER OS</span>
          <span style={{ color: "#444", fontSize: 14 }}>/ DISCOVERY GATE</span>
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>ai@autobuilderos.com</div>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 32px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
            Discovery <span style={{ color: "#F6B800" }}>Pipeline Gate</span>
          </h1>
          <p style={{ color: "#888", fontSize: 16, maxWidth: 600, lineHeight: 1.6 }}>
            Every build starts here. Drop a URL or target — the pipeline analyzes, scores, tests, fixes, heals, and evolves it autonomously.
          </p>
        </div>

        {/* Pipeline Visual */}
        <div style={{
          background: "#111", border: "1px solid #222", borderRadius: 12,
          padding: 32, marginBottom: 40
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
            5-STAGE AUTONOMOUS PIPELINE
          </p>
          <div style={{ display: "flex", gap: 0, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { num: "1", name: "DISCOVERY", desc: "Intake URL + purpose", color: "#F6B800" },
              { num: "2", name: "ANALYSIS", desc: "Agent-Zero scores 12 dimensions", color: "#60A5FA" },
              { num: "3", name: "QA TEST", desc: "SM QA Agent tests frontend + API", color: "#34D399" },
              { num: "4", name: "AUTO-FIX", desc: "AUTO_BUILDER patches + deploys", color: "#A78BFA" },
              { num: "5", name: "EVOLVE", desc: "Memory sync + next cycle", color: "#F472B6" },
            ].map((stage, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  background: "#1a1a1a", border: `1px solid ${stage.color}22`,
                  borderRadius: 8, padding: "12px 16px", minWidth: 130, textAlign: "center"
                }}>
                  <div style={{ fontSize: 10, color: stage.color, fontWeight: 700, marginBottom: 4 }}>
                    STAGE {stage.num}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{stage.name}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>{stage.desc}</div>
                </div>
                {i < 4 && <div style={{ color: "#333", fontSize: 18, padding: "0 8px" }}>→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            API ENDPOINT
          </p>
          <pre style={{ background: "#0a0a0a", borderRadius: 8, padding: 16, fontSize: 12, color: "#ccc", overflow: "auto" }}>
{`POST /api/discovery
Content-Type: application/json

{
  "target_url": "https://example.com",
  "target_name": "Example Corp",
  "target_type": "competitor",       // website|competitor|ai_company|tech_stack|own_system
  "purpose": "benchmark",            // benchmark|monitor|clone_intel|qa_test|evolve
  "triggered_by": "operator",        // operator|cron|agent_zero|auto_builder|apex
  "project": "AutoBuilder OS",
  "priority": 8,                     // 1-10
  "strict_score_threshold": 90       // Agent-Zero must score >= this to pass
}`}
          </pre>
        </div>

        {/* What Agent-Zero Does */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "Agent-Zero Analysis", items: ["12-dimension FAANG audit", "Score 0-100 per dimension", "Identify top 3 exploitable gaps", "Strict threshold enforcement", "Write receipts to Supabase"] },
            { title: "SM QA Agent Testing", items: ["Frontend route validation", "API endpoint health checks", "Performance scoring", "Accessibility audit", "Security header check"] },
            { title: "AUTO_BUILDER Auto-Fix", items: ["Read audit gaps", "Generate code patches", "Create GitHub branch + PR", "Vercel preview deploy", "Re-validate after fix"] },
            { title: "Evolution + Memory", items: ["Log all findings to agent_memory", "Sync to APEX memory layer", "Update agent_memory_events", "Track score delta over time", "Post summary to Slack"] },
          ].map((section, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#F6B800", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                {section.title}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#999", borderBottom: j < section.items.length-1 ? "1px solid #1a1a1a" : "none" }}>
                    <span style={{ color: "#4ade80", fontSize: 10 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/api/discovery" style={{ background: "#F6B800", color: "#000", padding: "10px 20px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            GET /api/discovery →
          </a>
          <a href="/" style={{ border: "1px solid #333", color: "#888", padding: "10px 20px", borderRadius: 6, fontSize: 13, textDecoration: "none" }}>
            ← Home
          </a>
        </div>
      </div>
    </main>
  );
}
