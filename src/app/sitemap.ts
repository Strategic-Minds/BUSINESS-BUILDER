import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-business-factory.vercel.app";
  return [
    { url: base,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/intake`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/payment`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/client-dashboard`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.5 },
  ];
}
