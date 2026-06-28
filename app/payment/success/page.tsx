import Link from "next/link";
import { PageChrome } from "@/components/site-shell";

export default function PaymentSuccessPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap legal">
          <span className="eyebrow">Payment status</span>
          <h1>Payment Success</h1>
          <p className="lead">Your checkout session completed. The client portal will show the next gated step after payment reconciliation.</p>
          <Link className="button button-primary" href="/client">Open Client Portal</Link>
        </div>
      </main>
    </PageChrome>
  );
}
