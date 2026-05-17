import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Online",
  description:
    "Browse our curated online selection on PangoBooks and support independent bookstores through Bookshop.org. Shop used books from To Be Read · Clackamas Book Exchange.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop Online · To Be Read",
    description:
      "Curated used books on PangoBooks and Bookshop.org from To Be Read · Clackamas Book Exchange.",
    url: "/shop",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
