import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Wall · Recent Arrivals",
  description:
    "A living wall of books recently shelved at To Be Read in Milwaukie, OR. Browse the covers of what just came in and plan your next visit.",
  alternates: { canonical: "/shelf" },
  openGraph: {
    title: "The Wall · Recently Shelved at To Be Read",
    description: "Browse the covers of books that just landed on our shelves.",
    url: "/shelf",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function ShelfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "The Wall", path: "/shelf" }])} />
      {children}
    </>
  );
}
