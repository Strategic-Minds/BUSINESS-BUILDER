import { CheckCircle2 } from "@/components/icons";
import { PageChrome } from "@/components/site-shell";
import { clientSteps, deliverables } from "@/lib/site-data";

export default function DashboardPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Client portal preview</span>
              <h1>Project Dashboard</h1>
              <p className="lead">A setup-gated client workspace for approvals, payment gates, deliverables, and launch receipts.</p>
            </div>
          </div>
          <section className="service-grid approval-timeline" data-testid="approval-timeline" data-section="approvals">
            {clientSteps.slice(0, 4).map((step) => (
              <article className="service-card" key={step.title}>
                <span className="circle-icon"><CheckCircle2 size={20} /></span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
                <span className="muted">Gate {step.gate}: {step.status}</span>
              </article>
            ))}
          </section>
          <section className="package-grid payment-gates" data-testid="payment-gates" data-section="payments" style={{ marginTop: 28 }}>
            {deliverables.slice(0, 3).map((item) => (
              <article className="package-card" key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="muted">{item.status} - {item.type}</span>
              </article>
            ))}
          </section>
        </div>
      </main>
    </PageChrome>
  );
}
