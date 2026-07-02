import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /wishlist is NOT disallowed on purpose: it's noindexed via meta
        // robots, and blocking the crawl would hide that directive — the
        // classic "indexed, though blocked by robots.txt" trap for a
        // navbar-linked page.
        disallow: ["/api/", "/admin", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
