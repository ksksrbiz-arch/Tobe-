/**
 * Shared SEO constants and structured-data builders.
 *
 * SITE_URL is the canonical production origin. Keep it in sync with the
 * metadataBase in app/layout.tsx, sitemap.ts, and robots.ts.
 */
export const SITE_URL = "https://to-be-read-clackamas.netlify.app";

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
