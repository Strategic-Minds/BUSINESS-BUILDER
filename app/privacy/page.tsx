import { PageChrome } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap legal">
          <span className="eyebrow">Privacy</span>
          <h1>Privacy Policy</h1>
          <p>
            Strategic Minds Advisory uses client information to plan, build, support, and improve business systems. This preview build does not collect production customer data unless configured by the operator.
          </p>
          <h2>Data Handling</h2>
          <p>
            Client data should be stored in approved systems only. Supabase service-role keys remain server-only, payment data is handled by Stripe, and notification sends require approval before live delivery.
          </p>
          <h2>Operational Records</h2>
          <p>
            Receipts, approvals, validation records, and release gates are retained to support auditability and client delivery continuity.
          </p>
        </div>
      </main>
    </PageChrome>
  );
}
