// src/app/sitemap.ts
// Dinamik Site Haritası (Sitemap) — Next.js standartlarında arama motorları için sayfaları listeler.

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sarihan-gusto.com";
  const routes = ["", "/menu", "/galeri", "/etkinlikler", "/hakkimizda", "/iletisim", "/gizlilik", "/cerez"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route === "/menu" ? 0.9 : 0.7,
  }));
}
