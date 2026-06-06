import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization (WebP/AVIF, responsive srcset, resizing) is handled by
  // @netlify/plugin-nextjs in production. Local /public images served via
  // next/image are optimized automatically.
  images: {},
};

export default nextConfig;
