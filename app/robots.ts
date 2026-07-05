import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://strategic-minds-ai-business-factory.vercel.app/sitemap.xml"
  };
}
