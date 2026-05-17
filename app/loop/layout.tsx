import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The TBR Loop",
  description:
    "Swap, read, repeat. Watch the TBR Loop animation — bring a book, earn store credit, pick something new.",
  alternates: { canonical: "/loop" },
  openGraph: {
    title: "The TBR Loop · To Be Read",
    description:
      "Swap, read, repeat. The loop that keeps thousands of stories moving through Milwaukie.",
    url: "/loop",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function LoopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
