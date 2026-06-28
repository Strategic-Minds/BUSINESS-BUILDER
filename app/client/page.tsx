import React from "react";
import { Bell, CalendarDays, CheckCircle2, Download, MessageSquareText, WalletCards } from "@/components/icons";
import { PageChrome } from "@/components/site-shell";
import { clientSteps, deliverables } from "@/lib/site-data";

export default function ClientPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Client project portal</span>
              <h1>Welcome Back</h1>
              <p className="lead">Track your Strategic Minds project, review deliverables, approve gated steps, and request revisions.</p>
            </div>
            <button className="button button-primary">
              <MessageSquareText size={16} />
              Message Support
            </button>
          </div>

          <section className="portal-grid">
            <div className="portal-panel">
              <span className="circle-icon">
                <CheckCircle2 size={22} />
              </span>
              <h2>Current Project Status</h2>
              <p className="muted">Strategic Minds Enterprise Site V2 is in preview build with approval gates active.</p>
              <span className="status-pill">Active: Share Your Idea</span>
            </div>
            <div className="portal-panel">
              <span className="circle-icon">
                <WalletCards size={22} />
              </span>
              <h2>Payment Status</h2>
              <p className="muted">Stripe status is connected through env-gated checkout. Live reconciliation requires configured secrets.</p>
              <span className="status-pill revision">Setup notice</span>
            </div>
            <div className="portal-panel">
              <span className="circle-icon">
                <CalendarDays size={22} />
              </span>
              <h2>Next Meeting</h2>
              <p className="muted">Strategy review call placeholder. Connect scheduling to replace with the live booked slot.</p>
              <button className="button button-ghost">Schedule Call</button>
            </div>
            <div className="portal-panel">
              <span className="circle-icon">
                <Bell size={22} />
              </span>
              <h2>Notifications</h2>
              <p className="muted">WhatsApp/SMS alerts are preview-only until the admin approves and Twilio envs are configured.</p>
              <span className="status-pill locked">Send locked</span>
            </div>

            <div className="portal-panel wide">
              <h2>10-Step Approval Journey</h2>
              <div className="timeline">
                {clientSteps.map((step, index) => (
                  <div className="timeline-row" key={step.title}>
                    <span className="circle-icon">{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p className="muted">{step.description}</p>
                      <small className="muted">{step.receipt}</small>
                    </div>
                    <div className="small-actions">
                      <span className={`status-pill ${step.status.includes("revision") ? "revision" : step.status}`}>
                        {step.status}
                      </span>
                      <button className="button button-ghost">Approve</button>
                      <button className="button button-ghost">Request Revision</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="portal-panel wide">
              <h2>Document and Deliverable Library</h2>
              <div className="deliverable-grid">
                {deliverables.map(({ title, type, status, updated, icon: Icon }) => (
                  <article className="deliverable-card" key={title}>
                    <div className="deliverable-thumb">
                      <Icon size={28} />
                    </div>
                    <h3>{title}</h3>
                    <p className="muted">{type}</p>
                    <span className={`status-pill ${status === "Locked" ? "locked" : ""}`}>{status}</span>
                    <p className="muted">Last updated: {updated}</p>
                    <div className="small-actions">
                      <button className="button button-ghost">Open</button>
                      <button className="button button-ghost">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageChrome>
  );
}
