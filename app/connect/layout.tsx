import type { Metadata } from "next";

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
  return children;
}
