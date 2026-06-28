import { PageChrome } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap legal">
          <span className="eyebrow">Terms</span>
          <h1>Terms of Service</h1>
          <p>
            Strategic Minds Advisory provides planning, automation, website, and AI system services under agreed package scope, approval gates, and release controls.
          </p>
          <h2>Approval Gates</h2>
          <p>
            Client-facing deliverables, payment actions, notification sends, production releases, and destructive system changes require the relevant approval before execution.
          </p>
          <h2>Preview Build</h2>
          <p>
            This site version includes preview-safe integrations. Live Stripe, Supabase, Twilio, deployment, and customer notification behavior requires configured environments and operator approval.
          </p>
        </div>
      </main>
    </PageChrome>
  );
}
