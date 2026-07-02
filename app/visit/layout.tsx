import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Visit Clackamas Book Exchange / To Be Read at 7931 SE King Rd, Unit 1, Portland, OR 97222. Open Mon–Sat 10am–5pm. Directions, parking, and what to expect on your first visit.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Plan Your Visit · To Be Read",
    description:
      "7931 SE King Rd, Unit 1, Portland, OR 97222 · Mon–Sat 10am–5pm. Directions, parking, and what to expect.",
    url: "/visit",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

// Page-level local listing for the storefront. References the canonical root
// BookStore entity by @id and restates the visit-critical NAP/hours/geo so this
// page carries the location facts directly. Values mirror the root entity in
// app/layout.tsx — keep them in sync.
const visitLocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BookStore",
  "@id": `${SITE_URL}/#bookstore`,
  name: "Clackamas Book Exchange (To Be Read)",
  url: `${SITE_URL}/visit`,
  telephone: "+1-503-659-2559",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7931 SE King Rd, Unit 1",
    addressLocality: "Portland",
    addressRegion: "OR",
    postalCode: "97222",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4473932,
    longitude: -122.5808603,
  },
  hasMap: "https://maps.google.com/?cid=5188254409265281028",
  publicAccess: true,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
};

export default function VisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Plan Your Visit", path: "/visit" }])} />
      <JsonLd data={visitLocalBusinessJsonLd} />
      {children}
    </>
  );
}
