import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

function SvgIcon({ size = 20, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => <SvgIcon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></SvgIcon>;
export const BadgeCheck = (props: IconProps) => <SvgIcon {...props}><path d="m9 12 2 2 4-5" /><circle cx="12" cy="12" r="9" /></SvgIcon>;
export const BarChart3 = (props: IconProps) => <SvgIcon {...props}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16v-5" /><path d="M12 16V8" /><path d="M16 16v-3" /></SvgIcon>;
export const Bell = (props: IconProps) => <SvgIcon {...props}><path d="M6 9a6 6 0 0 1 12 0c0 7 3 6 3 8H3c0-2 3-1 3-8" /><path d="M10 21h4" /></SvgIcon>;
export const BookOpen = (props: IconProps) => <SvgIcon {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H8a4 4 0 0 0-4 4Z" /><path d="M4 5.5V23" /></SvgIcon>;
export const Bot = (props: IconProps) => <SvgIcon {...props}><path d="M12 8V4" /><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M9 13h.01" /><path d="M15 13h.01" /><path d="M9 17h6" /></SvgIcon>;
export const BrainCircuit = (props: IconProps) => <SvgIcon {...props}><path d="M8 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4" /><path d="M16 4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4" /><path d="M8 8h3v8H8" /><path d="M13 8h3" /><path d="M13 12h3" /><path d="M13 16h3" /></SvgIcon>;
export const CalendarCheck = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4" /><path d="M16 2v4" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></SvgIcon>;
export const CalendarDays = CalendarCheck;
export const CheckCircle2 = BadgeCheck;
export const CircleDollarSign = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 6v12" /><path d="M15 9.5A3 3 0 0 0 12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2a3 3 0 0 1-3-1.5" /></SvgIcon>;
export const Code2 = (props: IconProps) => <SvgIcon {...props}><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" /></SvgIcon>;
export const CreditCard = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></SvgIcon>;
export const Download = (props: IconProps) => <SvgIcon {...props}><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></SvgIcon>;
export const FileCheck2 = (props: IconProps) => <SvgIcon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="m9 16 2 2 4-4" /></SvgIcon>;
export const FileText = (props: IconProps) => <SvgIcon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></SvgIcon>;
export const Gauge = (props: IconProps) => <SvgIcon {...props}><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l4-4" /><path d="M5 19h14" /></SvgIcon>;
export const Layers3 = (props: IconProps) => <SvgIcon {...props}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></SvgIcon>;
export const LifeBuoy = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="m4.9 4.9 4.3 4.3" /><path d="m14.8 14.8 4.3 4.3" /><path d="m19.1 4.9-4.3 4.3" /><path d="m9.2 14.8-4.3 4.3" /></SvgIcon>;
export const Lock = (props: IconProps) => <SvgIcon {...props}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></SvgIcon>;
export const LockKeyhole = Lock;
export const Mail = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></SvgIcon>;
export const MessageSquareText = (props: IconProps) => <SvgIcon {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 9h8" /><path d="M8 13h6" /></SvgIcon>;
export const Moon = (props: IconProps) => <SvgIcon {...props}><path d="M21 12.5A8.5 8.5 0 0 1 11.5 3 9 9 0 1 0 21 12.5Z" /></SvgIcon>;
export const PhoneCall = (props: IconProps) => <SvgIcon {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></SvgIcon>;
export const Rocket = (props: IconProps) => <SvgIcon {...props}><path d="M4.5 16.5c-1 1-1.5 3-1.5 4.5 1.5 0 3.5-.5 4.5-1.5" /><path d="M9 15 4 10l5-1 6-6c3 0 6 3 6 6l-6 6-1 5-5-5Z" /><path d="M14 8h.01" /></SvgIcon>;
export const ShieldCheck = (props: IconProps) => <SvgIcon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></SvgIcon>;
export const ShoppingCart = (props: IconProps) => <SvgIcon {...props}><path d="M6 6h15l-2 8H8L6 3H3" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></SvgIcon>;
export const Sparkles = (props: IconProps) => <SvgIcon {...props}><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></SvgIcon>;
export const Sun = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.9 19.1 1.4-1.4" /><path d="m17.7 6.3 1.4-1.4" /></SvgIcon>;
export const Target = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></SvgIcon>;
export const Users = (props: IconProps) => <SvgIcon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></SvgIcon>;
export const WalletCards = CreditCard;
export const Workflow = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="4" width="6" height="6" rx="1" /><rect x="15" y="14" width="6" height="6" rx="1" /><path d="M9 7h4a3 3 0 0 1 3 3v4" /><path d="M6 10v4a3 3 0 0 0 3 3h6" /></SvgIcon>;
export const Zap = (props: IconProps) => <SvgIcon {...props}><path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" /></SvgIcon>;
