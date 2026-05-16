import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Your Books",
  description:
    "Turn the books you've finished into store credit for what's next. Learn what we accept, how much credit you'll earn, and how to bring in a stack at To Be Read in Milwaukie, OR.",
  alternates: { canonical: "/trade" },
  openGraph: {
    title: "Trade Your Books for Store Credit · To Be Read",
    description:
      "Turn the books you've finished into store credit for what's next. See what we accept and how much you'll earn.",
    url: "/trade",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
