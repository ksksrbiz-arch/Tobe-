/**
 * Shared SEO constants and structured-data builders.
 *
 * SITE_URL is the SINGLE SOURCE OF TRUTH for the production origin. Everything
 * in the app (metadata, JSON-LD, sitemap, robots, OG images, llms.txt) derives
 * from it, so changing the domain is a one-line edit here — with one exception:
 * scripts/indexnow.mjs runs in plain Node and can't import this file, so update
 * its SITE_URL constant to match when the domain changes.
 */
export const SITE_URL = "https://tobereadshop.com";

export const SITE_NAME = "To Be Read – Clackamas Book Exchange";

/**
 * Build a schema.org BreadcrumbList for a sub-page. Home is always the first
 * crumb; pass the trailing crumbs from there.
 *
 * @example
 *   breadcrumbList([{ name: "Trade Your Books", path: "/trade" }])
 */
export function breadcrumbList(
  trail: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
