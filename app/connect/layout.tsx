import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/connect`,
  name: "Connect With To Be Read",
  url: `${SITE_URL}/connect`,
  mainEntity: {
    "@id": `${SITE_URL}/#bookstore`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-503-659-2559",
      email: "TBR@tcpbusiness.com",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  },
};

export const metadata: Metadata = {
  title: "Connect With Us",
  description:
    "Follow To Be Read on Instagram, TikTok, Facebook, Yelp, and Google. Read real reviews from our community and join the conversation.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect With To Be Read · Clackamas Book Exchange",
    description:
      "Follow us on Instagram, TikTok, Facebook, Yelp, and Google. Real reviews and community love.",
    url: "/connect",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Connect With Us", path: "/connect" }])} />
      <JsonLd data={contactPageJsonLd} />
      {children}
    </>
  );
}
