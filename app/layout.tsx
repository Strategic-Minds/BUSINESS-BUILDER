import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeBoot } from "@/components/theme-boot";
import { PwaRegister } from "@/components/pwa-register";

const siteUrl = "https://strategic-minds-ai-business-factory.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Strategic Minds Advisory | AI Systems That Grow Your Business",
  description:
    "Enterprise-grade AI automation, websites, workflows, and client delivery systems for business owners.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Strategic Minds Advisory | AI Systems That Grow Your Business",
    description:
      "Enterprise-grade AI automation, websites, workflows, and client delivery systems for business owners.",
    url: siteUrl,
    siteName: "Strategic Minds Advisory",
    type: "website"
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#006bff",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeBoot />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
