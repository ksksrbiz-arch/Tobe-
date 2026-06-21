import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Happenings",
  description:
    "Upcoming events at To Be Read in Milwaukie, OR — Cozy Reading Hour every Saturday, Staff Picks Saturday, and monthly Trade-In Days. Free and open to the community.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Happenings · To Be Read",
    description:
      "Cozy Reading Hour, Staff Picks Saturday, and monthly Trade-In Days at our used bookstore in Milwaukie, OR. Free and open to all.",
    url: "/events",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
