import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Happenings",
  description:
    "Upcoming events at To Be Read in Milwaukie, OR — free Summer Reading Programs for youth (Reading Circle & Reading Challenge, July 1–August 21), Cozy Reading Hour every Saturday, and Staff Picks Saturday. Free and open to the community.",
  keywords: [
    "summer reading program Milwaukie",
    "summer reading challenge Portland",
    "kids summer reading Oregon",
    "free bookstore events Milwaukie",
    "youth reading program Clackamas",
    "bookstore events Portland OR",
  ],
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Happenings · To Be Read",
    description:
      "Free Summer Reading Programs for youth, Cozy Reading Hour, and Staff Picks Saturday at our used bookstore in Milwaukie, OR. Free and open to all.",
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
