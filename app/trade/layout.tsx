import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, SITE_URL } from "@/lib/seo";
import {
  TRADE_POLICY_CAP,
  TRADE_POLICY_ROLLOVER,
  TRADE_POLICY_NOV1,
  TRADE_POLICY_WAIT,
} from "@/lib/tradePolicy";

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

// HowTo structured data for the four trade steps that are visibly rendered on
// the page (keep these in sync with the `steps` array in trade/page.tsx).
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to trade your used books for store credit at To Be Read",
  description:
    "Bring readable used books to To Be Read in Portland, OR and trade them for store credit toward your next reads.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Pack a stack",
      text: "Round up the books you've finished, fall out of love with, or just want to share with a new reader.",
      url: `${SITE_URL}/trade#trade`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Wait while we review",
      text: TRADE_POLICY_WAIT,
      url: `${SITE_URL}/trade#trade`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Get store credit",
      text: `Receive 25% of the original list price as credit on each accepted book. ${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1} ${TRADE_POLICY_ROLLOVER}`,
      url: `${SITE_URL}/trade#trade`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Pick new reads",
      text: "Browse, ask for recommendations, and use your credit toward the next stack. Pay only the swap fee + 50% of list.",
      url: `${SITE_URL}/trade#trade`,
    },
  ],
};

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Trade Your Books", path: "/trade" }])} />
      <JsonLd data={howToJsonLd} />
      {children}
    </>
  );
}
