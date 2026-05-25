// src/app/robots.ts
// Robots Arama Motoru İndeksleme Kılavuzu (Robots.txt) — Next.js standartlarında arama motorlarının tarama izinlerini yönetir.

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://sarihan-gusto.com/sitemap.xml",
  };
}
