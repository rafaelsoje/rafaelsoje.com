import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["OAI-SearchBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["Bytespider", "CCBot", "Diffbot"],
        disallow: ["/"],
      },
    ],
    sitemap: "https://rafaelsoje.com/sitemap.xml",
  };
}


