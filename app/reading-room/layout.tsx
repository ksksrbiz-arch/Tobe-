import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Reading Room",
  description:
    "Reading guides, trade-in tips, and bookish notes from To Be Read — an independent used bookstore in Milwaukie, OR.",
  alternates: {
    canonical: "/reading-room",
    types: { "application/rss+xml": "/reading-room/feed.xml" },
  },
  openGraph: {
    title: "The Reading Room · To Be Read",
    description:
      "Reading guides, trade-in tips, and bookish notes from To Be Read in Milwaukie, OR.",
    url: "/reading-room",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

// The Blog JSON-LD (which enumerates every post — multi-KB) and the hub
// breadcrumb live on the hub page.tsx, not here: a layout renders around every
// post/tag/collection page too, which shipped each of them a duplicate,
// conflicting BreadcrumbList plus an irrelevant 106-post Blog blob.
export default function ReadingRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
