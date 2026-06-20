import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  name: "About To Be Read",
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#bookstore` },
};

export const metadata: Metadata = {
  title: "About the Store",
  description:
    "Meet the team behind Clackamas Book Exchange — a 45-year-old neighborhood used bookstore in Milwaukie, OR, now rebranding as To Be Read (TBR).",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About To Be Read · Clackamas Book Exchange",
    description:
      "Meet the team behind Clackamas Book Exchange — a 45-year-old neighborhood used bookstore in Milwaukie, OR, now rebranding as To Be Read (TBR).",
    url: "/about",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "About the Store", path: "/about" }])} />
      <JsonLd data={aboutPageJsonLd} />
      {children}
    </>
  );
}
