import { BookOpen, FileCheck2, LifeBuoy, Rocket } from "@/components/icons";
import Link from "next/link";
import { PageChrome } from "@/components/site-shell";

const resources = [
  ["AI Automation Guide", "A practical guide for choosing the right workflow automation path.", BookOpen],
  ["Client Launch Checklist", "The gated release checklist used before public promotion.", FileCheck2],
  ["Support Center", "Questions, setup notices, and help paths for clients.", LifeBuoy],
  ["Business System Templates", "Starter templates for planning, approvals, receipts, and launch.", Rocket]
];

export default function ResourcesPage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Resources</span>
              <h1>Business Owner Toolkit</h1>
              <p className="lead">Clear, practical resources for planning and launching AI-powered business systems.</p>
            </div>
          </div>
          <div className="resource-grid">
            {resources.map(([title, copy, Icon]) => (
              <article className="resource-card" key={title as string}>
                <span className="circle-icon">
                  <Icon size={22} />
                </span>
                <h2>{title}</h2>
                <p>{copy}</p>
                <Link className="button button-ghost" href="/client">Open Resource</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </PageChrome>
  );
}
