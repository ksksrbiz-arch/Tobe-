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
 * The store's postal address as a schema.org PostalAddress. Mirrors the
 * authoritative values in the root LocalBusiness/BookStore entity.
 */
export const STORE_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "7931 SE King Rd, Unit 1",
  addressLocality: "Portland",
  addressRegion: "OR",
  postalCode: "97222",
  addressCountry: "US",
} as const;

/**
 * A self-contained schema.org Place for the storefront, suitable for use as an
 * Event `location`. Unlike a bare `{ "@id": ... }` reference, this inlines the
 * name, address, and coordinates so Google's Event rich-result requirements
 * (location name + address) are satisfied on any page that emits it, while the
 * shared `@id` still links it back to the canonical BookStore entity.
 */
export function storeEventLocation(): Record<string, unknown> {
  return {
    "@type": "Place",
    "@id": `${SITE_URL}/#bookstore`,
    name: "To Be Read (Clackamas Book Exchange)",
    address: STORE_POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4473932,
      longitude: -122.5808603,
    },
    url: `${SITE_URL}/visit`,
  };
}

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
