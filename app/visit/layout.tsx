import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Visit Clackamas Book Exchange / To Be Read at 7931 SE King Rd, Milwaukie, OR. Open Mon–Sat 10am–5pm. Directions, parking, and what to expect on your first visit.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Plan Your Visit · To Be Read",
    description:
      "7931 SE King Rd, Milwaukie, OR · Mon–Sat 10am–5pm. Directions, parking, and what to expect.",
    url: "/visit",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function VisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
