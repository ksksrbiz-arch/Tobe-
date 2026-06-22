import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reader Reviews",
  description:
    "Read reviews from readers who've visited To Be Read in Milwaukie, OR — and share your own experience with our used-book selection, trade-in credit, and cozy shop.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reader Reviews · To Be Read",
    description:
      "What neighbors and fellow book-lovers say about To Be Read, the Clackamas Book Exchange in Milwaukie, OR. Leave your own review.",
    url: "/reviews",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
