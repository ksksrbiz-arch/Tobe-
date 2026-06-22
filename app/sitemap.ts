import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getAllTagSlugs } from "@/lib/blog";
import { getCollectionSlugs } from "@/lib/collections";

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
  { path: "/connect", changeFrequency: "weekly", priority: 0.8 },
  { path: "/reading-room", changeFrequency: "weekly", priority: 0.7 },
  { path: "/reading-room/collections", changeFrequency: "weekly", priority: 0.6 },
  { path: "/events", changeFrequency: "weekly", priority: 0.8 },
  { path: "/reviews", changeFrequency: "weekly", priority: 0.7 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.7 },
  { path: "/loop", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // Reading Room posts — each indexable on its own, dated by last update.
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/reading-room/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Reading Room topic hubs — indexable category pages that gather posts by tag.
  const tagEntries: MetadataRoute.Sitemap = getAllTagSlugs().map((tag) => ({
    url: `${SITE_URL}/reading-room/tags/${tag}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Reading Room collection hubs — curated topic clusters across posts.
  const collectionEntries: MetadataRoute.Sitemap = getCollectionSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/reading-room/collections/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.55,
    }),
  );

  return [...staticEntries, ...postEntries, ...tagEntries, ...collectionEntries];
}
