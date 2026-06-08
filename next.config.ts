import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
