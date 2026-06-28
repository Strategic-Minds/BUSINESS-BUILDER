import Link from "next/link";
import { PageChrome } from "@/components/site-shell";

export default function PaymentCancelPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap legal">
          <span className="eyebrow">Payment status</span>
          <h1>Checkout Canceled</h1>
          <p className="lead">No payment was processed. You can return to package selection when you are ready.</p>
          <Link className="button button-primary" href="/payment">Back to Packages</Link>
        </div>
      </main>
    </PageChrome>
  );
}
