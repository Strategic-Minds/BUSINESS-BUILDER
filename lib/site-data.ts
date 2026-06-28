import type { ComponentType } from "react";
import {
  BarChart3, Bell, Bot, CalendarCheck, CheckCircle2,
  CircleDollarSign, Code2, FileCheck2, FileText, Gauge,
  LifeBuoy, Rocket, Target, Users, Workflow, Zap
} from "@/components/icons";

export type IconComponent = ComponentType<{ size?: number; className?: string }>;

export const navItems = [
  { label: "Home",         href: "/" },
  { label: "Services",     href: "/#services" },
  { label: "Packages",     href: "/payment" },
  { label: "How It Works", href: "/#journey" },
  { label: "About",        href: "/#why" },
  { label: "Resources",    href: "/resources" },
];

export const services = [
  { title: "Business Strategy",     copy: "We turn goals into a clear system plan.",          icon: Target as IconComponent },
  { title: "Workflow Automation",   copy: "We remove manual work with practical automations.",icon: Zap as IconComponent },
  { title: "AI System Development", copy: "We build AI assistants and data-aware tools.",     icon: Code2 as IconComponent },
  { title: "Websites & Funnels",    copy: "Premium sites and conversion paths.",              icon: BarChart3 as IconComponent },
];

export const journey: [string, string][] = [
  ["Choose Package","Pick the right starting point."],
  ["Secure Payment","Use an env-gated checkout flow."],
  ["Schedule Call","Book the launch session."],
  ["Share Your Idea","Provide goals, assets, and context."],
  ["We Plan Your System","Receive the blueprint and gate plan."],
  ["MVP Development","Preview the working system."],
  ["Review & Feedback","Approve or request revisions."],
  ["Launch Your System","Move from preview to release gate."],
  ["Automated Updates","Track receipts and next actions."],
  ["Scale & Optimize","Improve workflows over time."],
];

export const packages = [
  { id:"starter",    name:"Starter",    price:"$497",    subtitle:"Perfect for small businesses",  features:["1-on-1 strategy call","Workflow audit","Custom action plan","Recommendations"] },
  { id:"growth",     name:"Growth",     price:"$1,497",  subtitle:"Automate and scale faster",     popular:true, features:["Everything in Starter","Workflow automation","System integrations","Training and support"] },
  { id:"pro",        name:"Pro",        price:"$2,997",  subtitle:"Advanced systems for growth",   features:["Everything in Growth","MVP system build","Database and backend","Two revision rounds"] },
  { id:"enterprise", name:"Enterprise", price:"$5,997+", subtitle:"Full business transformation",  features:["Everything in Pro","Advanced automations","Team training","Priority support"] },
];

export const integrations = ["Google Workspace","Supabase","Stripe","Twilio","OpenAI","Vercel"];

// clientSteps includes .receipt field used in client/page.tsx
export const clientSteps = journey.map(([title, description], index) => ({
  title,
  description,
  status: index < 2 ? "complete" : index === 2 ? "current" : "upcoming",
  gate:    index + 1,
  receipt: index < 2 ? "Receipt issued" : "Pending approval",
}));

// deliverables includes .type, .updated, .icon fields used in client/page.tsx
export const deliverables: { title: string; type: string; status: string; updated: string; icon: IconComponent; id: string; gate: number; description: string }[] = [
  { id:"brief",     title:"Project Brief",    type:"Strategy Document", status:"Ready",    updated:"Jun 28, 2026", gate:1, description:"Goals, scope, and approval structure.",          icon: FileText as IconComponent },
  { id:"blueprint", title:"System Blueprint", type:"Architecture Doc",  status:"Ready",    updated:"Jun 28, 2026", gate:2, description:"Architecture, integrations, and data models.",  icon: FileCheck2 as IconComponent },
  { id:"mvp",       title:"MVP Preview",      type:"Live Build",        status:"Active",   updated:"Jun 28, 2026", gate:3, description:"Working preview build with all core routes.",   icon: Rocket as IconComponent },
  { id:"qa",        title:"QA Report",        type:"Test Report",       status:"Locked",   updated:"Pending",      gate:4, description:"Test results, accessibility, and Lighthouse.",  icon: CheckCircle2 as IconComponent },
  { id:"launch",    title:"Launch Package",   type:"Production Build",  status:"Locked",   updated:"Pending",      gate:5, description:"Production-ready build with receipts.",         icon: Zap as IconComponent },
  { id:"training",  title:"Training Guide",   type:"Handoff Document",  status:"Locked",   updated:"Pending",      gate:6, description:"Handoff docs and team training materials.",     icon: Bot as IconComponent },
];

export const adminModules: [string, string, IconComponent][] = [
  ["Leads & Pipeline",  "Track all leads from intake to close.",         BarChart3],
  ["Clients",           "Manage active client projects and portals.",     Users],
  ["Payments",          "View receipts, invoices, and payment events.",   CircleDollarSign],
  ["Approvals",         "Process release gates and change requests.",     CheckCircle2],
  ["Proposals",         "Draft and track proposals and SOWs.",            FileText],
  ["Deliverables",      "Manage files, docs, and delivery assets.",       FileCheck2],
  ["Notifications",     "Configure WhatsApp and email workflows.",        Bell],
  ["Integrations",      "Monitor Supabase, Stripe, Twilio, N8N status.", Gauge],
  ["Automations",       "Review N8N workflow runs and logs.",             Workflow],
  ["SEO & Content",     "Manage local SEO tasks and content queue.",      Rocket],
  ["AI Assistant",      "Run AI workflows and agent tasks.",              Bot],
  ["Support",           "Tickets, docs, and system health.",              LifeBuoy],
];

export const envGroups = {
  supabase: ["NEXT_PUBLIC_SUPABASE_URL","NEXT_PUBLIC_SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE_KEY"],
  stripe:   ["STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET","STRIPE_PRICE_STARTER"],
  twilio:   ["TWILIO_ACCOUNT_SID","TWILIO_AUTH_TOKEN","TWILIO_WHATSAPP_FROM"],
};

export function missingEnv(keys: string[]): string[] {
  return keys.filter(k => {
    const v = process.env[k] ?? "";
    return !v || v.includes("PLACEHOLDER") || v.includes("your_");
  });
}

export type SetupNotice = {
  system:  string;
  ready:   boolean;
  missing: string[];
  message: string;
  status:  "configured" | "setup_required";
};

export function setupNotice(system: string, missing: string[]): SetupNotice {
  return {
    system, missing,
    ready:  missing.length === 0,
    status: missing.length === 0 ? "configured" : "setup_required",
    message: missing.length === 0
      ? `${system} is configured.`
      : `${system} requires: ${missing.join(", ")}`,
  };
}

export const releaseStages = [
  "Planned","In Development","Preview Ready","QA Complete",
  "Approval Requested","Approved","Released",
];
