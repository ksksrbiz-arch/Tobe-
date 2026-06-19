import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

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

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/reading-room#blog`,
  name: "The Reading Room",
  url: `${SITE_URL}/reading-room`,
  publisher: { "@id": `${SITE_URL}/#bookstore` },
  blogPost: getAllPosts().map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    url: `${SITE_URL}/reading-room/${p.slug}`,
  })),
};

export default function ReadingRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "The Reading Room", path: "/reading-room" }])} />
      <JsonLd data={blogJsonLd} />
      {children}
    </>
  );
}
