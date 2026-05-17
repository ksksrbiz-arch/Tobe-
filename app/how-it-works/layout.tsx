import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A friendly walk-through of how To Be Read works — trading books, earning store credit, online ordering, events, and more.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works · To Be Read",
    description:
      "A friendly walk-through of trades, store credit, online ordering, and events at To Be Read.",
    url: "/how-it-works",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
