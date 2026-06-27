"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  BookOpen,
  Send,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Share2,
  Bookmark,
  BookmarkCheck,
  BellRing,
  Trash2,
  Copy,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import DustMotes from "@/components/DustMotes";
import { useReadingList } from "@/lib/useReadingList";

/**
 * Resolve a pick to an ISBN (via /api/book-search) and add it to the
 * sign-in-gated database wishlist so it joins the inventory "hunt" emails.
 * Falls back to a helpful nudge when the visitor isn't signed in or no edition
 * with an ISBN can be found.
 */
async function trackRestock(pick: { title: string; author: string }) {
  const id = toast.loading(`Looking up “${pick.title}”…`);
  const toWishlist = () => {
    window.location.href = "/wishlist";
  };
  try {
    const params = new URLSearchParams({ title: pick.title, author: pick.author });
    const res = await fetch(`/api/book-search?${params.toString()}`);
    if (res.status === 404) {
      toast.error("Couldn't find an exact edition.", {
        id,
        description: "Add it by ISBN on the Wishlist page to track restocks.",
        action: { label: "Wishlist", onClick: toWishlist },
      });
      return;
    }
    if (!res.ok) {
      toast.error("Book lookup failed. Try again in a moment.", { id });
      return;
    }
    const { book } = (await res.json()) as {
      book: { isbn: string; title: string; author: string; cover_url: string; list_price: number | null };
    };
    const save = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (save.status === 401) {
      toast.message("Sign in to track restocks", {
        id,
        description: "Your wishlist watches for incoming copies and emails you.",
        action: { label: "Go to Wishlist", onClick: toWishlist },
      });
      return;
    }
    if (!save.ok) {
      toast.error("Couldn't add to your wishlist. Try again.", { id });
      return;
    }
    toast.success(`Now tracking “${book.title}”`, {
      id,
      description: "We'll watch for a copy and email you when one lands.",
    });
  } catch {
    toast.error("Something went wrong. Try again.", { id });
  }
}

// Query param used to make a set of picks shareable: /?match=<prompt>#next-read
// Anyone who opens the link re-runs the same prompt, turning a good
// recommendation into a referral back to the site.
const MATCH_PARAM = "match";

interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  cover_url?: string;
  pango_url?: string;
  reason?: string;
  in_stock?: boolean;
  source_url?: string;
  source_name?: string;
}

interface RecommendResponse {
  recommendations: BookRecommendation[];
  error?: string;
}

const EXAMPLE_PROMPTS = [
  "Something like The Nightingale but set in a different war",
  "Cozy mystery with a strong female lead and lots of food",
  "Literary fiction that makes me ugly-cry",
  "Something meditative and slow like Stoner by John Williams",
];

function RecommendationCard({ rec }: { rec: BookRecommendation }) {
  const { save, remove, has } = useReadingList();
  const saved = has(rec.title, rec.author);

  const toggleSave = () => {
    if (saved) {
      remove(rec.title, rec.author);
    } else {
      save({
        title: rec.title,
        author: rec.author,
        description: rec.description,
        cover_url: rec.cover_url,
        reason: rec.reason,
      });
      toast.success(`Saved “${rec.title}” to your reading list`);
    }
  };

  return (
    <div
      className="group flex gap-4 rounded-2xl border p-5 card-cozy"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(253,248,240,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "0 8px 24px rgba(107,28,111,0.06)",
        animation: "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {rec.cover_url ? (
        // next/image ships intrinsic width/height so the cover slot is reserved
        // before the image loads (no layout shift). Covers come from the live
        // shelf's configured CDNs (Open Library / Google Books); lazy by default.
        <Image
          src={rec.cover_url}
          alt={`${rec.title} cover`}
          width={64}
          height={96}
          className="h-24 w-16 flex-shrink-0 rounded-lg object-cover"
          style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.15)" }}
        />
      ) : (
        <div
          className="flex h-24 w-16 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: "linear-gradient(135deg, rgba(107,28,111,0.10), rgba(241,187,26,0.12))" }}
        >
          <BookOpen size={22} style={{ color: "rgba(107,28,111,0.40)" }} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p
            className="flex-1 font-bold leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F", fontSize: "1rem" }}
          >
            {rec.title}
          </p>
          {rec.in_stock && (
            <span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: "rgba(34,197,94,0.15)", color: "#16a34a" }}
            >
              On the shelf
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs font-medium" style={{ color: "#6B7280" }}>
          {rec.author}
        </p>
        {rec.reason && (
          <p
            className="mt-1.5 rounded-lg px-2.5 py-1.5 text-xs italic leading-relaxed"
            style={{ background: "rgba(241,187,26,0.10)", color: "#374151" }}
          >
            &ldquo;{rec.reason}&rdquo;
          </p>
        )}
        {rec.description && (
          <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ color: "#4B5563" }}>
            {rec.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {rec.pango_url && !rec.in_stock && (
            <a
              href={rec.pango_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all hover:gap-1.5"
              style={{ color: "#F1BB1A" }}
            >
              Search PangoBooks <ArrowRight size={10} />
            </a>
          )}
          {rec.source_url && (
            <a
              href={rec.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold transition-all hover:gap-1.5"
              style={{ color: "#6B7280" }}
            >
              More on {rec.source_name ?? "the web"} <ArrowRight size={10} />
            </a>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleSave}
            aria-pressed={saved}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-[1.03]"
            style={{
              borderColor: saved ? "#6B1C6F" : "rgba(107,28,111,0.18)",
              color: saved ? "#FFFFFF" : "#6B1C6F",
              background: saved ? "#6B1C6F" : "rgba(107,28,111,0.04)",
            }}
          >
            {saved ? (
              <BookmarkCheck size={12} aria-hidden="true" />
            ) : (
              <Bookmark size={12} aria-hidden="true" />
            )}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => trackRestock({ title: rec.title, author: rec.author })}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-[1.03]"
            style={{
              borderColor: "rgba(241,187,26,0.40)",
              color: "#6B1C6F",
              background: "rgba(241,187,26,0.12)",
            }}
          >
            <BellRing size={12} aria-hidden="true" />
            Track restock
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NextReadMatchmaker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookRecommendation[]>([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");

  const {
    items: savedItems,
    count: savedCount,
    remove: removeSaved,
    clear: clearSaved,
  } = useReadingList();
  const [showSaved, setShowSaved] = useState(false);

  const copySavedList = async () => {
    const text = savedItems.map((p) => `• ${p.title} — ${p.author}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Reading list copied!");
    } catch {
      toast.error("Couldn't copy the list. Try again?");
    }
  };

  const runMatch = useCallback(async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);
    setLastPrompt(trimmed);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data: RecommendResponse = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't generate recommendations. Try again.");
        return;
      }
      setResults(data.recommendations ?? []);
    } catch {
      setError("Couldn't reach the recommendation engine. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  const submit = () => runMatch(query);

  // Hydrate from a shared ?match= link: prefill the prompt and auto-run it once
  // on mount. Read straight off window.location to avoid pulling the whole page
  // into dynamic rendering via useSearchParams.
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get(MATCH_PARAM);
    if (shared && shared.trim()) {
      // Defer to a microtask so the state updates inside runMatch happen in an
      // async callback rather than synchronously in the effect body — avoids the
      // cascading-render path flagged by react-hooks/set-state-in-effect.
      queueMicrotask(() => runMatch(shared));
    }
  }, [runMatch]);

  // Build a shareable link for the current picks and offer the native share
  // sheet, falling back to copying the URL to the clipboard.
  const sharePicks = async () => {
    if (!lastPrompt) return;
    const url = `${window.location.origin}/?${MATCH_PARAM}=${encodeURIComponent(
      lastPrompt,
    )}#next-read`;
    const shareData = {
      title: "Next Read Matchmaker · To Be Read",
      text: `Book picks for: "${lastPrompt}"`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Swallow — most often the user simply dismissed the native share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied — share your picks!");
    } catch {
      toast.error("Couldn't copy the link. Try again?");
    }
  };

  return (
    <div className="relative">
      {/* Animated gradient glow ring breathing behind the card */}
      <div
        aria-hidden="true"
        className="mm-glow pointer-events-none absolute -inset-px rounded-[30px] opacity-70 blur-[12px]"
      />
      <div
      className="relative rounded-[28px] border-2 p-7 shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.14)",
        boxShadow: "0 20px 60px rgba(107,28,111,0.10)",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)" }}
        >
          <Sparkles size={20} className="mm-sparkle" style={{ color: "#1a1a1a" }} />
        </div>
        <div>
          <h3
            className="font-bold"
            style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F", fontSize: "1.15rem" }}
          >
            Next Read Matchmaker
          </h3>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Tell us what you loved and we&apos;ll find your next obsession
          </p>
        </div>
      </div>

      {/* Saved picks (reading list) */}
      {savedCount > 0 && (
        <div className="mb-5">
          <button
            type="button"
            onClick={() => setShowSaved((s) => !s)}
            aria-expanded={showSaved}
            className="flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors"
            style={{ borderColor: "rgba(107,28,111,0.14)", background: "rgba(107,28,111,0.04)" }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              style={{ color: "#6B1C6F" }}
            >
              <BookmarkCheck size={14} aria-hidden="true" />
              Saved picks ({savedCount})
            </span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300"
              style={{ color: "#6B1C6F", transform: showSaved ? "rotate(180deg)" : "none" }}
            />
          </button>
          {showSaved && (
            <div
              className="mt-2 rounded-xl border p-3"
              style={{ borderColor: "rgba(107,28,111,0.10)", background: "rgba(255,255,255,0.7)" }}
            >
              <ul className="space-y-2">
                {savedItems.map((p) => (
                  <li
                    key={`${p.title}-${p.author}`}
                    className="flex items-start justify-between gap-3 rounded-lg px-2 py-1.5"
                    style={{ background: "rgba(253,248,240,0.7)" }}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold" style={{ color: "#4A1350" }}>
                        {p.title}
                      </p>
                      <p className="truncate text-xs" style={{ color: "#6B7280" }}>
                        {p.author}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => trackRestock({ title: p.title, author: p.author })}
                        aria-label={`Track restock for ${p.title}`}
                        className="touch-target rounded-lg p-1.5 transition-colors hover:bg-[rgba(241,187,26,0.16)]"
                        style={{ color: "#6B1C6F" }}
                      >
                        <BellRing size={14} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSaved(p.title, p.author)}
                        aria-label={`Remove ${p.title} from saved picks`}
                        className="touch-target rounded-lg p-1.5 transition-colors hover:bg-[rgba(239,68,68,0.10)]"
                        style={{ color: "#6B7280" }}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                className="mt-3 flex items-center justify-end gap-4 border-t pt-3"
                style={{ borderColor: "rgba(107,28,111,0.08)" }}
              >
                <button
                  type="button"
                  onClick={copySavedList}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                  style={{ color: "#6B1C6F" }}
                >
                  <Copy size={12} aria-hidden="true" /> Copy list
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearSaved();
                    toast.success("Reading list cleared");
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                  style={{ color: "#B91C1C" }}
                >
                  <Trash2 size={12} aria-hidden="true" /> Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <textarea
          aria-label="Describe a book you loved or the kind of read you're after"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="I just finished The Secret History and want something equally dark and campus-set…"
          rows={3}
          className="w-full resize-none rounded-xl border px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:ring-2"
          style={{
            borderColor: "rgba(107,28,111,0.18)",
            color: "#1F1A2E",
            background: "white",
          }}
        />
        <button
          onClick={submit}
          disabled={loading || !query.trim()}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.04] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
        >
          {loading ? <RefreshCw size={12} className="animate-spin" /> : <Send size={12} />}
          {loading ? (
            <span className="flex items-center gap-1.5">
              Thinking
              <span className="flex gap-0.5" aria-hidden="true">
                <span className="h-1 w-1 animate-bounce rounded-full bg-white" style={{ animationDelay: "0ms" }} />
                <span className="h-1 w-1 animate-bounce rounded-full bg-white" style={{ animationDelay: "120ms" }} />
                <span className="h-1 w-1 animate-bounce rounded-full bg-white" style={{ animationDelay: "240ms" }} />
              </span>
            </span>
          ) : (
            "Match me"
          )}
        </button>
      </div>

      {/* Example prompts */}
      {!hasSearched && (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p, i) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="mm-chip rounded-full border px-3 py-1 text-[11px] font-medium transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md"
              style={{
                borderColor: "rgba(107,28,111,0.15)",
                color: "#6B1C6F",
                background: "rgba(107,28,111,0.04)",
                animation: "fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: `${120 + i * 70}ms`,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 rounded-xl border px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.20)", color: "#B91C1C" }}>
          {error}
        </p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B1C6F" }}>
              Your personalised picks
            </p>
            <button
              type="button"
              onClick={sharePicks}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-[1.03]"
              style={{
                borderColor: "rgba(107,28,111,0.18)",
                color: "#6B1C6F",
                background: "rgba(107,28,111,0.04)",
              }}
            >
              <Share2 size={12} aria-hidden="true" />
              Share picks
            </button>
          </div>
          <div className="space-y-3">
            {results.map((rec, i) => (
              <div key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <RecommendationCard rec={rec} />
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && !error && (
        <p className="mt-6 text-center text-sm" style={{ color: "#6B7280" }}>
          No recommendations came back — try rephrasing your prompt.
        </p>
      )}
      </div>
    </div>
  );
}

// Standalone section for embedding on the homepage
export function NextReadSection() {
  return (
    <section
      id="next-read"
      className="relative overflow-hidden px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(107,28,111,0.08), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(253,248,240,0.90) 100%)",
      }}
    >
      <DustMotes />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider animate-pulse-glow"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            <Sparkles size={12} className="mm-sparkle" />
            AI Matchmaker
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Find your <span className="underline-accent">next read</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Describe what you just finished or the vibe you&apos;re chasing — our AI checks our live
            shelf and grounds every pick with DuckDuckGo to find real titles waiting for you.
          </p>
          <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
        </div>
        <NextReadMatchmaker />
      </div>
    </section>
  );
}
