import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "To Be Read – Clackamas Book Exchange",
    short_name: "To Be Read",
    description:
      "Your neighborhood used bookstore in Milwaukie, Oregon. Trade books for store credit, browse thousands of titles in-store and online.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDF9",
    theme_color: "#6B1C6F",
    // `/icon` and `/apple-icon` resolve to the dynamic ImageResponse handlers
    // in `app/icon.tsx` and `app/apple-icon.tsx` (Next.js file-based metadata).
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
