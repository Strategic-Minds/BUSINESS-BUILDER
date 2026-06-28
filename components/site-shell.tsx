import { BrainCircuit, LockKeyhole, PhoneCall } from "@/components/icons";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/site-data";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Strategic Minds Advisory home">
          <span className="brand-mark">
            <BrainCircuit size={22} />
          </span>
          <span>
            Strategic Minds
            <small>Advisory</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-primary" href="/#final-cta">
            <PhoneCall size={15} />
            Schedule a Call
          </Link>
          <Link className="button button-ghost" href="/auth">
            <LockKeyhole size={15} />
            Client Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">
              <BrainCircuit size={22} />
            </span>
            <span>
              Strategic Minds
              <small>Advisory</small>
            </span>
          </Link>
          <p>
            We build AI-powered systems, workflows, and digital experiences that help real businesses
            grow with clarity.
          </p>
        </div>
        <FooterColumn title="Company" links={["About Us", "Our Process", "Case Studies", "Careers", "Contact"]} />
        <FooterColumn
          title="Services"
          links={["AI Automation", "Workflow Automation", "System Development", "Websites & Funnels", "Strategy & Planning"]}
        />
        <FooterColumn title="Resources" links={["Blog", "Guides", "FAQ", "Templates", "Tools"]} />
        <div className="footer-column">
          <b>Contact</b>
          <a href="mailto:hello@strategicminds.ai">hello@strategicminds.ai</a>
          <a href="tel:+15551234567">(555) 123-4567</a>
          <p>123 Innovation Drive<br />Austin, TX 78701</p>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-column">
      <b>{title}</b>
      {links.map((link) => (
        <Link href="/resources" key={link}>
          {link}
        </Link>
      ))}
    </div>
  );
}

export function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
