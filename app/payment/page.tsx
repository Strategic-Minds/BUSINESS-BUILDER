import React from "react";
import { CheckCircle2, CreditCard } from "@/components/icons";
import { PageChrome } from "@/components/site-shell";
import { envGroups, missingEnv, packages, setupNotice } from "@/lib/site-data";

export default function PaymentPage() {
  const notice = setupNotice("Stripe Checkout", missingEnv(envGroups.stripe));

  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Secure package checkout</span>
              <h1>Choose Your Package</h1>
              <p className="lead">Stripe Checkout is wired for live use once price IDs and secrets are configured.</p>
            </div>
          </div>
          {!notice.ready ? (
            <div className="notice" style={{ marginBottom: 24 }}>
              <b>Setup required:</b> add {notice.missing.join(", ")}. Package buttons return preview-safe responses until then.
            </div>
          ) : null}
          <div className="payment-grid">
            {packages.map((item) => (
              <form className="payment-option" action="/api/payments/checkout" method="post" key={item.id}>
                <input type="hidden" name="packageId" value={item.id} />
                <h2>{item.name}</h2>
                <div className="price">{item.price}</div>
                <p className="muted">{item.subtitle}</p>
                <ul className="feature-list">
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={16} className="blue-text" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`button ${item.popular ? "button-primary" : "button-ghost"}`} type="submit">
                  <CreditCard size={16} />
                  Start Checkout
                </button>
              </form>
            ))}
          </div>
        </div>
      </main>
    </PageChrome>
  );
}
