import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Strategic Minds AI Business Factory",
    template: "%s | Strategic Minds",
  },
  description:
    "AI-powered website, CRM, proposal, payment, WhatsApp, and SEO system for epoxy and decorative concrete contractors.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-business-factory.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Strategic Minds AI Business Factory",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  themeColor: "#F6B800",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-white antialiased min-h-screen">{children}</body>
    </html>
  );
}
