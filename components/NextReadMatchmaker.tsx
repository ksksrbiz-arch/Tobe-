"use client";

import React, { useState } from "react";
import { BookOpen, Send, Sparkles, RefreshCw, ArrowRight } from "lucide-react";

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? "";

interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  cover_url?: string;
  pango_url?: string;
  reason?: string;
}

interface N8nResponse {
  recommendations: BookRecommendation[];
}

const EXAMPLE_PROMPTS = [
  "Something like The Nightingale but set in a different war",
  "Cozy mystery with a strong female lead and lots of food",
  "Literary fiction that makes me ugly-cry",
  "Something meditative and slow like Stoner by John Williams",
];

function RecommendationCard({ rec }: { rec: BookRecommendation }) {
  return (
    <div
      className="group flex gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(253,248,240,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "0 8px 24px rgba(107,28,111,0.06)",
        animation: "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {rec.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={rec.cover_url}
          alt={rec.title}
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
        <p
          className="font-bold leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1rem" }}
        >
          {rec.title}
        </p>
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
        {rec.pango_url && (
          <a
            href={rec.pango_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all hover:gap-1.5"
            style={{ color: "#F1BB1A" }}
          >
            Check our shelf <ArrowRight size={10} />
          </a>
        )}
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

  const submit = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    if (!N8N_WEBHOOK_URL) {
      setError("The recommendation service is not yet configured. Check back soon!");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: N8nResponse = await res.json();
      setResults(data.recommendations ?? []);
    } catch {
      setError("Couldn't reach the recommendation engine. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-[28px] border-2 p-7 shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.14)",
        boxShadow: "0 20px 60px rgba(107,28,111,0.10)",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)" }}
        >
          <Sparkles size={20} style={{ color: "#1a1a1a" }} />
        </div>
        <div>
          <h3
            className="font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1.15rem" }}
          >
            Next Read Matchmaker
          </h3>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Tell us what you loved and we&apos;ll find your next obsession
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="relative">
        <textarea
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
          {loading ? "Thinking…" : "Match me"}
        </button>
      </div>

      {/* Example prompts */}
      {!hasSearched && (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all hover:scale-[1.02]"
              style={{
                borderColor: "rgba(107,28,111,0.15)",
                color: "#6B1C6F",
                background: "rgba(107,28,111,0.04)",
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
          <p className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: "#6B1C6F" }}>
            Your personalised picks
          </p>
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
  );
}

// Standalone section for embedding on the homepage
export function NextReadSection() {
  return (
    <section
      id="next-read"
      className="px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(107,28,111,0.08), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(253,248,240,0.90) 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            <Sparkles size={12} />
            AI Matchmaker
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Find your <span className="underline-accent">next read</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Describe what you just finished or the vibe you&apos;re chasing — our AI cross-references our
            live shelf to find titles waiting for you.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </div>
        <NextReadMatchmaker />
      </div>
    </section>
  );
}
