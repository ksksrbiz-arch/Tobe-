import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description:
    "Save the books you're hunting for at To Be Read. We'll let you know when something matching shows up on our shelves.",
  alternates: { canonical: "/wishlist" },
  robots: {
    // Personal utility surface — no SEO value, keep it out of indexes.
    index: false,
    follow: true,
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
