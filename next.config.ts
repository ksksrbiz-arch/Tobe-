import type { NextConfig } from "next";

// Site-wide security headers. Applied to every route by the `headers()` hook
// below and honored in production by @netlify/plugin-nextjs.
//
// The Content-Security-Policy is intentionally "permissive but meaningful": it
// allows any https: source for scripts/styles/images/frames/connections so the
// third-party integrations the site genuinely needs keep working (Google Tag
// Manager, cookieless Plausible, the Google Maps embed, and the TikTok embed
// widget, which each pull from several rotating CDNs). What it DOES lock down is
// the high-value, low-risk surface: no plugins (object-src 'none'), no <base>
// hijacking (base-uri 'self'), forms can only post to us (form-action 'self'),
// the site can't be framed by others (frame-ancestors 'self' — clickjacking),
// and any stray http:// subresource is upgraded to https. 'unsafe-inline' is
// required because the app emits inline JSON-LD, the Consent Mode bootstrap, and
// the Plausible/GTM init snippets, none of which can carry a nonce under static
// prerendering.
const CSP = [
  "default-src 'self' https: data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "frame-src 'self' https:",
  "media-src 'self' https: data: blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // Force HTTPS for two years, including subdomains, and allow preload listing.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Defense-in-depth against clickjacking alongside frame-ancestors above.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers from MIME-sniffing responses away from the declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin on cross-origin navigations; full path same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop powerful APIs the site never uses, and opt out of ad-topics profiling.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // Strip console.* from production client bundles (keep console.error so real
  // runtime failures still surface). Trims a little JS and avoids leaking debug
  // logging to visitors. No effect on local dev.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    // Allow next/image to optimise external book cover images (WebP/AVIF,
    // responsive srcset, lazy-loading, blur placeholders). Each domain must be
    // listed explicitly; wildcards are not supported for security reasons.
    remotePatterns: [
      // Open Library cover CDN — used by seed arrivals and admin-shelved books
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
      // Google Books API thumbnails — fallback source some admin flows use
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "/books/content/**",
      },
      // Placeholder image services used during development
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Unsplash — decorative PageHero backgrounds on /connect and /wishlist
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Serve modern formats where the browser supports them.
    // AVIF is ~50 % smaller than WebP; WebP is ~30 % smaller than JPEG.
    formats: ["image/avif", "image/webp"],
    // Reasonable set of widths for the book cover grid (card sizes: ~100 to
    // ~300 px wide depending on breakpoint; 2× for retina).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 192, 256, 384],
  },
};

export default nextConfig;
