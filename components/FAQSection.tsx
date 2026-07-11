// Server Component: the only interactive part (the accordion) lives in the
// <FaqAccordion> client island; the heading + FAQPage JSON-LD render to HTML.
import React from "react";
import { HelpCircle } from "lucide-react";
import Reveal from "./Reveal";
import FaqAccordion from "./FaqAccordion";
import JsonLd from "./JsonLd";
import {
  TRADE_POLICY_REDEMPTION_FULL,
  TRADE_POLICY_ROLLOVER,
  TRADE_POLICY_WAIT,
} from "@/lib/tradePolicy";

export type Faq = { q: string; a: string };

const defaultFaqs: Faq[] = [
  {
    q: "Do you really not give cash for trades?",
    a: `Correct — we operate as a trade-credit shop. ${TRADE_POLICY_WAIT} Credit is store credit only (not cash). ${TRADE_POLICY_ROLLOVER}`,
  },
  {
    q: "How is my trade credit calculated?",
    a: `You receive 25% of the book's original list price as store credit on books we accept. ${TRADE_POLICY_REDEMPTION_FULL}`,
  },
  {
    q: "What books do you accept?",
    a: "Fiction, non-fiction, biographies, kids/YA, sci-fi/fantasy, mystery, history, self-help, cookbooks, and more — as long as they're in good readable shape. Hardbacks must include their dust jackets.",
  },
  {
    q: "What books don't you accept?",
    a: "Magazines, Harlequin romance novels, hardbacks without dust jackets, encyclopedias and most textbooks, and anything heavily damaged, water-stained, or dated media like VHS tapes.",
  },
  {
    q: "When are you open?",
    a: "Monday through Saturday, 10am – 5pm. Closed Sundays. We occasionally open a few minutes late if a chapter runs long — thank you for understanding!",
  },
  {
    q: "Why are you rebranding to TBR?",
    a: "Same store, same heart — just a fresh name for the next 45 years. \"To Be Read\" captures that towering, exciting stack of books waiting on your nightstand. The change rolls out in 2026.",
  },
  {
    q: "Can I order books online for in-store pickup?",
    a: "Right now we recommend browsing PangoBooks for our online inventory. For in-store pickup, give us a call and we'll happily set books aside for you.",
  },
  {
    q: "Do you do book recommendations?",
    a: "Absolutely — that's the best part of working here. Stop in, tell us what you've been loving lately, and we'll make a stack.",
  },
  {
    q: "Do you buy used books?",
    a: "Yes — we take used books in trade for store credit. Bring them by during open hours and we'll look them over.",
  },
  {
    q: "What are your hours?",
    a: "We're open Monday through Saturday, 10am to 5pm, and closed on Sunday.",
  },
  {
    q: "Where are you located and is there parking?",
    a: "We're at 7931 SE King Rd, Unit 1, Portland, OR 97222. There's free on-site parking.",
  },
  {
    q: "Do you offer store credit?",
    a: "Yes — you earn store credit by trading in your used books, then put it toward your next reads.",
  },
  {
    q: "What kinds of books do you carry?",
    a: "Thousands of used titles across fiction, classics, romantasy, mystery, sci-fi/fantasy, kids', and nonfiction.",
  },
  {
    q: "Do you have a phone number?",
    a: "Yes — you can reach us at +1-503-659-2559 during open hours.",
  },
];

/**
 * Accordion FAQ with FAQPage structured data. Defaults to the store's general
 * trade questions (homepage); pass `faqs` + headings to reuse it elsewhere,
 * e.g. the location FAQ on /visit.
 */
export default function FAQSection({
  faqs = defaultFaqs,
  eyebrow = "Frequently asked",
  titleLead = "Quick",
  titleAccent = "answers",
  intro = "The questions we hear most often, in one place.",
  id = "faq",
}: {
  faqs?: Faq[];
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  intro?: string;
  id?: string;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
    // Help voice/AI assistants pick this FAQ block as the spoken answer,
    // mirroring the same pattern used on Reading Room articles.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [`#${id}`],
    },
  };

  return (
    <section
      className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--paper) 100%)" }}
      id={id}
    >
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)", color: "var(--purple)" }}
          >
            <HelpCircle size={12} aria-hidden="true" />
            {eyebrow}
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--purple)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            {titleLead} <span className="underline-accent">{titleAccent}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm" style={{ color: "var(--muted)" }}>
            {intro}
          </p>
        </Reveal>

        <FaqAccordion faqs={faqs} />

        <Reveal>
          <p className="mt-8 text-center text-sm" style={{ color: "var(--muted)" }}>
            Still curious?{" "}
            <a
              href="mailto:TBR@tcpbusiness.com"
              className="font-semibold underline decoration-2 underline-offset-4"
              style={{ color: "var(--purple)", textDecorationColor: "var(--gold)" }}
            >
              Send us an email
            </a>{" "}
            or stop by the shop.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
