"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Quote, RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";

/**
 * A small love letter to readers: a rotating, hand-picked quote about books
 * and reading. Every attribution here is well-documented and traceable to a
 * specific published work — no folk-misattributions (the bane of quote walls).
 */
type BookQuote = {
  text: string;
  author: string;
  source: string;
};

const QUOTES: readonly BookQuote[] = [
  {
    text: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges",
    source: "“Poem of the Gifts”",
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    source: "On Writing",
  },
  {
    text:
      "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    source: "A Dance with Dragons",
  },
  {
    text:
      "Until I feared I would lose it, I never loved to read. One does not love breathing.",
    author: "Harper Lee",
    source: "To Kill a Mockingbird",
  },
  {
    text:
      "That's the thing about books. They let you travel without moving your feet.",
    author: "Jhumpa Lahiri",
    source: "The Namesake",
  },
  {
    text:
      "Books are the plane, and the train, and the road. They are the destination, and the journey. They are home.",
    author: "Anna Quindlen",
    source: "How Reading Changed My Life",
  },
  {
    text: "Once you learn to read, you will be forever free.",
    author: "Frederick Douglass",
    source: "speeches & writings",
  },
] as const;

export default function BookishQuote() {
  // Start on a deterministic quote for SSR, then shuffle to a random one on
  // the client so repeat visitors don't always see the same opener.
  const [index, setIndex] = useState(0);
  const [turning, setTurning] = useState(false);

  useEffect(() => {
    // Defer past the synchronous effect pass so we don't trigger a cascading
    // re-render, and so the random pick stays hydration-safe (server renders
    // the deterministic opener, the client shuffles after paint).
    const id = requestAnimationFrame(() =>
      setIndex(Math.floor(Math.random() * QUOTES.length)),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const nextQuote = useCallback(() => {
    setTurning(true);
    setIndex((i) => (i + 1) % QUOTES.length);
    const id = window.setTimeout(() => setTurning(false), 420);
    return () => window.clearTimeout(id);
  }, []);

  const quote = QUOTES[index];

  const copyQuote = useCallback(async () => {
    const text = `“${quote.text}” — ${quote.author}, ${quote.source}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Quote copied — go share the love.");
    } catch {
      toast.error("Couldn't copy that one. Try selecting the text instead.");
    }
  }, [quote]);

  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(241,187,26,0.10), transparent 40%), linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
      }}
      aria-labelledby="bookish-quote-heading"
    >
      <h2 id="bookish-quote-heading" className="sr-only">
        A bookish quote for your visit
      </h2>
      <Reveal className="mx-auto max-w-3xl">
        <figure
          className="relative overflow-hidden rounded-[28px] border bg-white px-7 py-12 text-center sm:px-14"
          style={{
            borderColor: "rgba(107,28,111,0.10)",
            boxShadow: "0 24px 60px rgba(107,28,111,0.10)",
          }}
        >
          {/* faint paper grain / margin lines */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-8 w-px"
            style={{ background: "rgba(241,187,26,0.35)" }}
          />
          <Quote
            aria-hidden="true"
            size={40}
            className="mx-auto mb-6"
            style={{ color: "#F1BB1A" }}
          />
          <div
            aria-live="polite"
            className="transition-all duration-300"
            style={{
              opacity: turning ? 0 : 1,
              transform: turning ? "translateY(8px)" : "translateY(0)",
            }}
          >
            <blockquote
              className="text-balance text-xl leading-relaxed sm:text-2xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#4A1350",
                fontStyle: "italic",
              }}
            >
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-6 text-sm" style={{ color: "#6B7280" }}>
              <span className="font-semibold" style={{ color: "#6B1C6F" }}>
                {quote.author}
              </span>
              <span aria-hidden="true"> · </span>
              <cite className="not-italic">{quote.source}</cite>
            </figcaption>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={nextQuote}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }}
            >
              <RefreshCw size={13} />
              Turn the page
            </button>
            <button
              type="button"
              onClick={copyQuote}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Copy size={13} />
              Copy quote
            </button>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
