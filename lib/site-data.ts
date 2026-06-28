import {
  BarChart3,
  Bell,
  Bot,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  FileCheck2,
  FileText,
  Gauge,
  Layers3,
  LifeBuoy,
  Lock,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap
} from "@/components/icons";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Packages", href: "/payment" },
  { label: "How It Works", href: "/#journey" },
  { label: "About", href: "/#why" },
  { label: "Resources", href: "/resources" }
];

export const services = [
  {
    title: "Business Strategy",
    copy: "We turn goals into a clear system plan your team can approve, fund, and launch.",
    icon: Target
  },
  {
    title: "Workflow Automation",
    copy: "We remove manual work with practical automations for intake, delivery, reminders, and reporting.",
    icon: Zap
  },
  {
    title: "AI System Development",
    copy: "We build AI assistants, operating workflows, and data-aware tools around your business rules.",
    icon: Code2
  },
  {
    title: "Websites & Funnels",
    copy: "We create premium sites, payment flows, and conversion paths that connect to your backend.",
    icon: BarChart3
  }
];

export const journey = [
  ["Choose Package", "Pick the right starting point."],
  ["Secure Payment", "Use an env-gated checkout flow."],
  ["Schedule Call", "Book the launch session."],
  ["Share Your Idea", "Provide goals, assets, and context."],
  ["We Plan Your System", "Receive the blueprint and gate plan."],
  ["MVP Development", "Preview the working system."],
  ["Review & Feedback", "Approve or request revisions."],
  ["Launch Your System", "Move from preview to release gate."],
  ["Automated Updates", "Track receipts and next actions."],
  ["Scale & Optimize", "Improve workflows over time."]
];

export const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "$497",
    subtitle: "Perfect for small businesses",
    features: ["1-on-1 strategy call", "Workflow audit", "Custom action plan", "Recommendations"]
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,497",
    subtitle: "Automate and scale faster",
    popular: true,
    features: ["Everything in Starter", "Workflow automation", "System integrations", "Training and support"]
  },
  {
    id: "pro",
    name: "Pro",
    price: "$2,997",
    subtitle: "Advanced systems for growth",
    features: ["Everything in Growth", "MVP system build", "Database and backend", "Two revision rounds"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$5,997+",
    subtitle: "Full business transformation",
    features: ["Everything in Pro", "Advanced automations", "Team training", "Priority support"]
  }
];

export const integrations = ["Google Workspace", "Supabase", "Stripe", "Twilio", "OpenAI", "Vercel"];

export const clientSteps = journey.map(([title, description], index) => ({
  title,
  description,
  status:
    index < 3
      ? "complete"
      : index === 3
        ? "active"
        : index === 4
          ? "submitted"
          : index === 5
            ? "revision requested"
            : "locked",
  receipt: index < 3 ? "Receipt pending sync" : "Awaiting activity"
}));

export const deliverables = [
  "MVP Preview",
  "Business Proposal",
  "Business Plan",
  "Strategy Blueprint",
  "Discovery Report",
  "Contract",
  "Brand Pack",
  "Logo Pack",
  "Website Preview",
  "Workflow Map",
  "Automation Plan",
  "Launch Checklist",
  "Invoice / Payment Receipt"
].map((title, index) => ({
  title,
  type: index % 3 === 0 ? "Preview" : index % 3 === 1 ? "Document" : "Approval Packet",
  status: index < 4 ? "Ready for review" : index < 8 ? "Drafting" : "Locked",
  updated: index < 4 ? "Today" : "Pending",
  icon: [FileText, FileCheck2, Layers3, Sparkles][index % 4]
}));

export const adminModules = [
  ["Leads", "18 new inquiries", Users],
  ["Clients", "7 active accounts", Users],
  ["Projects", "4 in review", Workflow],
  ["Payments", "Env gated", CircleDollarSign],
  ["Documents", "13 staged", FileText],
  ["Approval queue", "5 waiting", FileCheck2],
  ["Release queue", "2 gated", Rocket],
  ["Notifications", "Preview only", Bell],
  ["Workflow status", "Healthy", Gauge],
  ["Receipts/logs", "Append-only", ShieldCheck],
  ["5-minute cron health", "Configured", CalendarCheck],
  ["PWA install status", "Ready", Bot],
  ["Supabase status", "Setup notice until envs exist", Lock],
  ["Stripe status", "Setup notice until envs exist", CircleDollarSign],
  ["Twilio/WhatsApp status", "Send locked", MessageSquareText]
] as const;

export const releaseStages = [
  "Draft",
  "Preview",
  "Client Review",
  "Approved",
  "Ready for Release",
  "Released",
  "Needs Rollback"
];

export const envGroups = {
  supabase: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
  stripe: [
    "STRIPE_SECRET_KEY",
    "STRIPE_PRICE_STARTER",
    "STRIPE_PRICE_GROWTH",
    "STRIPE_PRICE_PRO",
    "STRIPE_PRICE_ENTERPRISE",
    "NEXT_PUBLIC_SITE_URL"
  ],
  twilio: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_FROM", "TWILIO_SMS_FROM"]
};

export function missingEnv(keys: string[]) {
  return keys.filter((key) => !process.env[key]);
}

export function setupNotice(system: string, keys: string[]) {
  return {
    ready: keys.length === 0,
    system,
    status: keys.length === 0 ? "configured" : "setup_required",
    missing: keys,
    message:
      keys.length === 0
        ? `${system} environment is configured.`
        : `${system} is preview-safe until required environment variables are added.`
  };
}

export const statusIcon = CheckCircle2;
