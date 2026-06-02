import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Public, indexable routes. Admin and API routes are intentionally excluded
// (see robots.ts), as are user-utility surfaces like /wishlist that hold no
// SEO value on their own.
const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/visit", changeFrequency: "monthly", priority: 0.9 },
  { path: "/trade", changeFrequency: "monthly", priority: 0.9 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.9 },
  { path: "/shelf", changeFrequency: "daily", priority: 0.7 },
  { path: "/connect", changeFrequency: "weekly", priority: 0.8 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.7 },
  { path: "/loop", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
