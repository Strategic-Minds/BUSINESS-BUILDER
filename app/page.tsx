import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Zap
} from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { InstallButton } from "@/components/install-button";
import { PageChrome } from "@/components/site-shell";
import { integrations, journey, packages, services } from "@/lib/site-data";

const trust: [string, string, React.ComponentType<{size?: number}>][] = [
  ["AI Automation", "Smart systems", Sparkles],
  ["Fast Delivery", "On-time, every time", Zap],
  ["Transparent", "Real-time updates", ShieldCheck],
  ["Results Driven", "Built for growth", Gauge]
];

const why: [string, string, React.ComponentType<{size?: number}>][] = [
  ["Results That Matter", "We focus on outcomes that drive measurable growth.", BadgeCheck],
  ["Clear Communication", "You always know what is happening and what is next.", Sparkles],
  ["On-Time Delivery", "We deliver on time with clear milestones.", ShieldCheck],
  ["Ongoing Support", "We stay with you every step of the way.", Gauge]
];

const testimonials: [string, string, React.ComponentType<{size?: number}>][] = [
  ["Strategic Minds built our entire automation system. We saved 20+ hours per week and increased revenue by 36% in 3 months.", "James T.", "CEO, Home Services"],
  ["Their team delivered exactly what they promised. The automation runs like clockwork and the support is amazing.", "Sarah M.", "Marketing Director"],
  ["Best investment we have made. They transformed our business with AI and automation.", "Michael R.", "Founder, E-Commerce"]
];

export default function HomePage() {
  return (
    <PageChrome>
      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">AI-powered. Automated. Results driven.</span>
              <h1>
                We Build AI Systems That <span className="blue-text">Grow Your Business.</span>
              </h1>
              <p className="lead">
                From planning to automation, we build intelligent systems, workflows, and websites
                that save time, reduce costs, and drive real results.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/#final-cta">
                  <CalendarDays size={16} />
                  Schedule a Call
                </Link>
                <Link className="button button-ghost" href="/payment">
                  <CircleDollarSign size={16} />
                  View Packages
                </Link>
                <InstallButton />
              </div>
              <div className="trust-row">
                {trust.map(([title, copy, Icon]) => (
                  <div className="trust-item" key={title as string}>
                    <span className="circle-icon">
                      <Icon size={18} />
                    </span>
                    <span>
                      <b>{title}</b>
                      <span>{copy}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual" aria-label="Electric blue AI human head visual">
              <Image
                className="hero-head"
                src="/ai-hero-head.png"
                alt="Electric blue AI human head"
                width={760}
                height={798}
                priority
              />
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="wrap">
            <div className="section-heading">
              <span className="section-label">What we do</span>
              <h2>AI Solutions That Drive Real Business Results</h2>
            </div>
            <div className="service-grid">
              {services.map(({ title, copy, icon: Icon }) => (
                <article className="service-card" key={title}>
                  <span className="circle-icon">
                    <Icon size={24} />
                  </span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="journey">
          <div className="wrap">
            <div className="section-heading">
              <span className="section-label">Our proven process</span>
              <h2>Your 10 Step Journey to Automation</h2>
            </div>
            <div className="journey-track">
              {journey.map(([title, copy], index) => (
                <div className="journey-step" key={title}>
                  <div className="step-number">{index + 1}</div>
                  <span className="circle-icon">
                    {index === 0 ? <ShoppingCart size={19} /> : index === 7 ? <Rocket size={19} /> : <CheckCircle2 size={19} />}
                  </span>
                  <b>{title}</b>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="packages">
          <div className="wrap">
            <div className="section-heading">
              <span className="section-label">Pick the right package</span>
              <h2>Simple. Transparent. Powerful.</h2>
            </div>
            <div className="package-grid">
              {packages.map((item) => (
                <article className={`package-card ${item.popular ? "popular" : ""}`} key={item.id}>
                  {item.popular ? <span className="popular-tag">Most Popular</span> : null}
                  <h3 className="blue-text">{item.name}</h3>
                  <p>{item.subtitle}</p>
                  <div className="price">{item.price}</div>
                  <span className="muted">One-time</span>
                  <ul className="feature-list">
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle2 size={16} className="blue-text" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link className={`button ${item.popular ? "button-primary" : "button-ghost"}`} href={`/payment?package=${item.id}`}>
                    Get Started
                  </Link>
                </article>
              ))}
            </div>
            <div className="integration-strip" aria-label="Integrated platforms">
              {integrations.map((integration) => (
                <span key={integration}>{integration}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why">
          <div className="wrap">
            <div className="section-heading">
              <span className="section-label">Why businesses choose us</span>
              <h2>We Deliver More Than Promises</h2>
            </div>
            <div className="why-grid">
              {why.map(([title, copy, Icon]) => (
                <div className="why-item" key={title as string}>
                  <span className="circle-icon">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p className="muted">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <span className="section-label">Client success stories</span>
              <h2>Real Results From Real Businesses</h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map(([quote, name, role]) => (
                <article className="testimonial-card" key={name}>
                  <div className="quote-stars">★★★★★</div>
                  <p>"{quote}"</p>
                  <h3>{name}</h3>
                  <span className="muted">{role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="final-cta">
          <div className="wrap">
            <div className="cta-band">
              <span className="circle-icon" style={{ margin: "0 auto 18px" }}>
                <CalendarDays size={22} />
              </span>
              <h2>Ready to Transform Your Business?</h2>
              <p className="lead" style={{ margin: "0 auto 24px" }}>
                Schedule a strategy call and let us build your automated future.
              </p>
              <Link className="button button-primary" href="/resources">
                Schedule a Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageChrome>
  );
}
