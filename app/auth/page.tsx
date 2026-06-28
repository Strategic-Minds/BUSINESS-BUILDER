import { LockKeyhole, Mail, ShieldCheck } from "@/components/icons";
import { PageChrome } from "@/components/site-shell";
import { envGroups, missingEnv, setupNotice } from "@/lib/site-data";

export default function AuthPage() {
  const notice = setupNotice("Supabase Auth", missingEnv(envGroups.supabase));

  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Secure client access</span>
              <h1>Client Login</h1>
              <p className="lead">Sign in with email/password or prepare a magic-link flow once Supabase is configured.</p>
            </div>
          </div>
          <div className="two-column">
            <section className="auth-panel">
              {!notice.ready ? (
                <div className="notice">
                  <b>Setup required:</b> add {notice.missing.join(", ")}. The page remains usable as a preview and does not expose secrets.
                </div>
              ) : null}
              <form className="form-grid" action="/api/auth/supabase-login" method="post">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="client@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="Password" required />
                </div>
                <button className="button button-primary" type="submit">
                  <LockKeyhole size={16} />
                  Sign In
                </button>
              </form>
            </section>
            <aside className="auth-panel">
              <span className="circle-icon">
                <ShieldCheck size={22} />
              </span>
              <h2>Magic Link Ready</h2>
              <p className="muted">
                The architecture includes a magic-link endpoint, session-safe notices, and a sign-out route. Supabase service-role access stays server-only.
              </p>
              <form className="form-grid" action="/api/auth/supabase-magic-link" method="post">
                <div className="field">
                  <label htmlFor="magic-email">Email</label>
                  <input id="magic-email" name="email" type="email" placeholder="client@example.com" required />
                </div>
                <button className="button button-ghost" type="submit">
                  <Mail size={16} />
                  Send Magic Link Preview
                </button>
              </form>
            </aside>
          </div>
        </div>
      </main>
    </PageChrome>
  );
}
