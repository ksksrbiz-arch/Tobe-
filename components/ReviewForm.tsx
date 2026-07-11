"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Star, Check, Loader2, ChevronDown } from "lucide-react";

const NAME_MAX = 60;
const TITLE_MAX = 120;
const BODY_MIN = 10;
const BODY_MAX = 2000;

type ErrorField = "rating" | "name" | "body" | null;

/**
 * Client-side pagination for the (server-rendered) review cards. The cards are
 * passed in as `children` so they keep their SSR markup, Reveal animations, and
 * contribution to the page's Review structured data; this wrapper only limits
 * how many are shown at once and reveals the rest in batches on demand.
 */
export function ReviewsGrid({
  children,
  className,
  initialCount = 9,
  step = 9,
}: {
  children: React.ReactNode;
  className?: string;
  initialCount?: number;
  step?: number;
}) {
  const items = React.Children.toArray(children);
  const total = items.length;
  const [visible, setVisible] = useState(() => Math.min(initialCount, total));
  const gridRef = useRef<HTMLDivElement>(null);
  const prevVisibleRef = useRef(visible);
  const expandingRef = useRef(false);

  useEffect(() => {
    if (!expandingRef.current) return;
    expandingRef.current = false;
    // Move focus to the first newly revealed card so keyboard and screen-reader
    // users land on the new content instead of losing their place.
    const firstNew = gridRef.current?.children[prevVisibleRef.current] as
      | HTMLElement
      | undefined;
    if (firstNew) {
      firstNew.setAttribute("tabindex", "-1");
      firstNew.focus();
    }
    prevVisibleRef.current = visible;
  }, [visible]);

  const showMore = () => {
    prevVisibleRef.current = visible;
    expandingRef.current = true;
    setVisible((v) => Math.min(v + step, total));
  };

  const remaining = total - visible;

  return (
    <div className="mb-16">
      <div ref={gridRef} className={className}>
        {items.slice(0, visible)}
      </div>
      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={showMore}
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2"
            style={{
              borderColor: "color-mix(in srgb, var(--purple) 20%, transparent)",
              color: "var(--purple)",
              background: "white",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <ChevronDown size={16} aria-hidden="true" />
            Show more reviews
            <span style={{ color: "var(--muted)" }}>({remaining} more)</span>
          </button>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible} of {total} {total === 1 ? "review" : "reviews"}
      </p>
    </div>
  );
}

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);

  const ratingGroupRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const shown = hover || rating;

  // Clear an active field-level error as soon as the visitor edits that field.
  function clearFieldError(field: ErrorField) {
    if (errorField === field) {
      setError("");
      setErrorField(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setErrorField(null);

    if (rating < 1) {
      setError("Please choose a star rating.");
      setErrorField("rating");
      ratingGroupRef.current?.focus();
      return;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      setErrorField("name");
      nameRef.current?.focus();
      return;
    }
    if (body.trim().length < BODY_MIN) {
      setError(`Please write at least ${BODY_MIN} characters.`);
      setErrorField("body");
      bodyRef.current?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          author_name: name.trim(),
          rating,
          title: title.trim(),
          body: body.trim(),
          website,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-2xl border bg-white p-8 text-center"
        style={{ borderColor: "rgba(34,197,94,0.30)", background: "rgba(34,197,94,0.05)" }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <Check size={24} style={{ color: "#16a34a" }} />
        </div>
        <h3
          className="mb-1 text-lg font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
        >
          Thank you!
        </h3>
        <p className="text-sm" style={{ color: "#4B5563" }}>
          Your review has been submitted and will appear here once our team has had
          a chance to read it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 sm:p-8"
      style={{ borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)", boxShadow: "var(--shadow-sm)" }}
      noValidate
    >
      <h3
        className="mb-1 text-xl font-bold"
        style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
      >
        Share your experience
      </h3>
      <p className="mb-5 text-sm" style={{ color: "var(--muted)" }}>
        Visited the shop or traded some books? We&apos;d love to hear about it.
      </p>

      {/* Rating */}
      <fieldset className="mb-5">
        <legend
          id="review-rating-label"
          className="mb-2 text-sm font-semibold"
          style={{ color: errorField === "rating" ? "#B91C1C" : "#374151" }}
        >
          Your rating
        </legend>
        <div
          ref={ratingGroupRef}
          role="group"
          tabIndex={-1}
          aria-labelledby="review-rating-label"
          aria-describedby={errorField === "rating" ? "review-form-error" : undefined}
          className="flex w-fit items-center gap-1 rounded outline-none focus-visible:ring-2"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
              onClick={() => {
                setRating(n);
                clearFieldError("rating");
              }}
              onMouseEnter={() => setHover(n)}
              className="touch-target flex items-center justify-center rounded transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ color: "var(--gold)" }}
            >
              <Star size={30} fill={n <= shown ? "var(--gold)" : "transparent"} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Name */}
      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold" style={{ color: "#374151" }}>
          Your name
        </span>
        <input
          ref={nameRef}
          type="text"
          value={name}
          maxLength={NAME_MAX}
          onChange={(e) => {
            setName(e.target.value);
            clearFieldError("name");
          }}
          placeholder="Jamie R."
          autoComplete="name"
          aria-invalid={errorField === "name"}
          aria-describedby={errorField === "name" ? "review-form-error" : undefined}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{
            borderColor: errorField === "name" ? "#fca5a5" : "color-mix(in srgb, var(--purple) 20%, transparent)",
            boxShadow: errorField === "name" ? "0 0 0 2px rgba(252,165,165,0.5)" : undefined,
            color: "var(--ink)",
          }}
          required
        />
      </label>

      {/* Title (optional) */}
      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold" style={{ color: "#374151" }}>
          Headline <span style={{ color: "var(--muted)" }}>(optional)</span>
        </span>
        <input
          type="text"
          value={title}
          maxLength={TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A cozy neighborhood gem"
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 20%, transparent)", color: "var(--ink)" }}
        />
      </label>

      {/* Body */}
      <label className="mb-2 block">
        <span className="mb-1 block text-sm font-semibold" style={{ color: "#374151" }}>
          Your review
        </span>
        <textarea
          ref={bodyRef}
          value={body}
          maxLength={BODY_MAX}
          rows={4}
          onChange={(e) => {
            setBody(e.target.value);
            clearFieldError("body");
          }}
          placeholder="Tell other readers what you loved…"
          aria-invalid={errorField === "body"}
          aria-describedby={errorField === "body" ? "review-form-error" : undefined}
          className="w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{
            borderColor: errorField === "body" ? "#fca5a5" : "color-mix(in srgb, var(--purple) 20%, transparent)",
            boxShadow: errorField === "body" ? "0 0 0 2px rgba(252,165,165,0.5)" : undefined,
            color: "var(--ink)",
          }}
          required
        />
      </label>
      <p className="mb-4 text-right text-[11px]" style={{ color: "var(--muted)" }}>
        {body.length}/{BODY_MAX}
      </p>

      {/* Honeypot — hidden from real users, catches bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {error && (
        <p id="review-form-error" role="alert" className="mb-3 text-sm font-medium" style={{ color: "#B91C1C" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Submit review"
        )}
      </button>
      <p className="mt-3 text-[11px]" style={{ color: "var(--muted)" }}>
        Reviews are read by our team before they&apos;re published. The name you
        enter is shown publicly with your review. See our{" "}
        <Link href="/privacy" className="underline hover:text-purple">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
