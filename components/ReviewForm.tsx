"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Check, Loader2 } from "lucide-react";

const NAME_MAX = 60;
const TITLE_MAX = 120;
const BODY_MIN = 10;
const BODY_MAX = 2000;

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const shown = hover || rating;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (rating < 1) {
      setError("Please choose a star rating.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (body.trim().length < BODY_MIN) {
      setError(`Please write at least ${BODY_MIN} characters.`);
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
          style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
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
      style={{ borderColor: "rgba(107,28,111,0.12)", boxShadow: "var(--shadow-sm)" }}
      noValidate
    >
      <h3
        className="mb-1 text-xl font-bold"
        style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
      >
        Share your experience
      </h3>
      <p className="mb-5 text-sm" style={{ color: "#6B7280" }}>
        Visited the shop or traded some books? We&apos;d love to hear about it.
      </p>

      {/* Rating */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-sm font-semibold" style={{ color: "#374151" }}>
          Your rating
        </legend>
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ color: "#F1BB1A" }}
            >
              <Star size={30} fill={n <= shown ? "#F1BB1A" : "transparent"} />
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
          type="text"
          value={name}
          maxLength={NAME_MAX}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jamie R."
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E" }}
          required
        />
      </label>

      {/* Title (optional) */}
      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold" style={{ color: "#374151" }}>
          Headline <span style={{ color: "#9CA3AF" }}>(optional)</span>
        </span>
        <input
          type="text"
          value={title}
          maxLength={TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A cozy neighborhood gem"
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E" }}
        />
      </label>

      {/* Body */}
      <label className="mb-2 block">
        <span className="mb-1 block text-sm font-semibold" style={{ color: "#374151" }}>
          Your review
        </span>
        <textarea
          value={body}
          maxLength={BODY_MAX}
          rows={4}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell other readers what you loved…"
          className="w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E" }}
          required
        />
      </label>
      <p className="mb-4 text-right text-[11px]" style={{ color: "#9CA3AF" }}>
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
        <p className="mb-3 text-sm" style={{ color: "#B91C1C" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 sm:w-auto"
        style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Submit review"
        )}
      </button>
      <p className="mt-3 text-[11px]" style={{ color: "#9CA3AF" }}>
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
