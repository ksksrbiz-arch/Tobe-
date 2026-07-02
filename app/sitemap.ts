import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getAllTagSlugs, getPostsByTag, getTagBySlug } from "@/lib/blog";
import { getCollectionPosts, getCollectionSlugs } from "@/lib/collections";
import type { BlogPost } from "@/lib/blog";

// A hub page's real last-modified is its newest member post — stamping every
// URL with the build time trains crawlers to distrust the field.
function newestPostDate(posts: BlogPost[]): Date | undefined {
  if (posts.length === 0) return undefined;
  const newest = posts
    .map((p) => p.updated ?? p.date)
    .sort()
    .at(-1)!;
  return new Date(`${newest}T00:00:00`);
}

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
  { path: "/events/summer-reading", changeFrequency: "weekly", priority: 0.7 },
  { path: "/reviews", changeFrequency: "weekly", priority: 0.7 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.7 },
  { path: "/loop", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes carry no lastModified: we don't track real edit dates for
  // them, and a build-time stamp would claim ~20 URLs changed on every deploy.
  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
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
  const tagEntries: MetadataRoute.Sitemap = getAllTagSlugs().map((slug) => {
    const tag = getTagBySlug(slug);
    return {
      url: `${SITE_URL}/reading-room/tags/${slug}`,
      lastModified: tag ? newestPostDate(getPostsByTag(tag)) : undefined,
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  // Reading Room collection hubs — curated topic clusters across posts.
  const collectionEntries: MetadataRoute.Sitemap = getCollectionSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/reading-room/collections/${slug}`,
      lastModified: newestPostDate(getCollectionPosts(slug)),
      changeFrequency: "weekly",
      priority: 0.55,
    }),
  );

  return [...staticEntries, ...postEntries, ...tagEntries, ...collectionEntries];
}
