import { PageChrome } from "@/components/site-shell";
import { envGroups, missingEnv, setupNotice } from "@/lib/site-data";

const readinessItems = [
  setupNotice("Supabase", missingEnv(envGroups.supabase)),
  setupNotice("Stripe", missingEnv(envGroups.stripe)),
  setupNotice("Twilio/WhatsApp", missingEnv(envGroups.twilio))
];

export default function SystemReadinessPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">System readiness</span>
              <h1>Environment Status</h1>
              <p className="lead">Configured and missing labels are shown without exposing secret values.</p>
            </div>
          </div>
          <section className="admin-grid">
            {readinessItems.map((item) => (
              <article className="admin-panel" key={item.system}>
                <span className={`status-pill ${item.ready ? "complete" : "revision"}`}>{item.status}</span>
                <h2>{item.system}</h2>
                <p>{item.ready ? "configured" : "missing setup values"}</p>
                <p className="muted">{item.message}</p>
              </article>
            ))}
          </section>
          <div className="notice" style={{ marginTop: 28 }}>
            Release readiness remains gated until required env values are configured, validated, and approved.
          </div>
        </div>
      </main>
    </PageChrome>
  );
}
