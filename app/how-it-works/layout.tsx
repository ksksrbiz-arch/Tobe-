import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";
import {
  TRADE_POLICY_WAIT,
  TRADE_POLICY_CAP_AND_ROLLOVER,
} from "@/lib/tradePolicy";

// HowTo structured data for the trade-in flow — eligible for how-to rich
// results. Steps mirror the on-page content and the real trade policy.
const tradeHowToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to trade used books for store credit at To Be Read",
  description:
    "Trade your used books for store credit at To Be Read in Milwaukie, OR — bring books in, earn credit, and take home your next read the same day.",
  totalTime: "PT15M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Bring your books in",
      text: `Bring your books to the counter during open hours. ${TRADE_POLICY_WAIT}`,
      url: `${SITE_URL}/how-it-works`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Earn store credit",
      text: `Readable books earn store credit: one credit per paperback, two per hardcover. ${TRADE_POLICY_CAP_AND_ROLLOVER}`,
      url: `${SITE_URL}/how-it-works`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Take home your next read",
      text: "Spend credit on whatever speaks to you, mix credit and cash, and walk out with a fresh stack the same afternoon.",
      url: `${SITE_URL}/how-it-works`,
    },
  ],
};

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
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "How It Works", path: "/how-it-works" }])} />
      <JsonLd data={tradeHowToJsonLd} />
      {children}
    </>
  );
}
