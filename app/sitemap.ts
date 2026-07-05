import type { MetadataRoute } from "next";

const siteUrl = "https://strategic-minds-ai-business-factory.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/intake", "/dashboard", "/payment", "/admin/system-readiness"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
