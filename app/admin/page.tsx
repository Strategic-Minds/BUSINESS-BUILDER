import { PageChrome } from "@/components/site-shell";
import { adminModules, envGroups, missingEnv, releaseStages, setupNotice } from "@/lib/site-data";

export default function AdminPage() {
  const supabase = setupNotice("Supabase", missingEnv(envGroups.supabase));
  const stripe = setupNotice("Stripe", missingEnv(envGroups.stripe));
  const twilio = setupNotice("Twilio/WhatsApp", missingEnv(envGroups.twilio));

  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Admin operations</span>
              <h1>Strategic Minds Command Desk</h1>
              <p className="lead">Monitor leads, clients, payments, approvals, releases, receipts, and env-gated integrations.</p>
            </div>
          </div>

          <section className="admin-grid">
            {adminModules.map(([title, value, Icon]) => (
              <article className="admin-panel" key={title}>
                <span className="circle-icon">
                  <Icon size={21} />
                </span>
                <b>{title}</b>
                <p className="muted">{value}</p>
              </article>
            ))}

            <div className="admin-panel wide">
              <h2>Gated Release Logic</h2>
              <div className="timeline">
                {releaseStages.map((stage, index) => (
                  <div className="release-row" key={stage}>
                    <span className="circle-icon">{index + 1}</span>
                    <div>
                      <h3>{stage}</h3>
                      <p className="muted">
                        {stage === "Released"
                          ? "Requires explicit operator approval before production promotion."
                          : "Tracked as part of the release readiness path."}
                      </p>
                    </div>
                    <span className={`status-pill ${index < 2 ? "complete" : index === 6 ? "revision" : "locked"}`}>
                      {index < 2 ? "available" : index === 6 ? "rollback guard" : "gated"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-panel wide">
              <h2>Integration Setup Status</h2>
              <div className="timeline">
                {[supabase, stripe, twilio].map((notice) => (
                  <div className="release-row" key={notice.system}>
                    <span className={`status-pill ${notice.ready ? "complete" : "revision"}`}>{notice.status}</span>
                    <div>
                      <h3>{notice.system}</h3>
                      <p className="muted">{notice.message}</p>
                      {!notice.ready ? <small className="muted">Missing: {notice.missing.join(", ")}</small> : null}
                    </div>
                    <button className="button button-ghost">View Setup</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageChrome>
  );
}
