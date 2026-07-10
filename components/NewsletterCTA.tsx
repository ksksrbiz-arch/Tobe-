"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, BookOpen, Loader2, CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { EMAIL_ENABLED } from "@/lib/flags";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Brand marks (this lucide build has no social icons, so inline the glyphs —
// mirrors ConnectSection).
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.54V6.88a4.85 4.85 0 01-1.02-.19z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SOCIALS = [
  { name: "Instagram", handle: "@toberead_clackamas", href: "https://instagram.com/toberead_clackamas", Icon: InstagramIcon },
  { name: "TikTok", handle: "@clackamas.book.ex", href: "https://www.tiktok.com/@clackamas.book.ex", Icon: TikTokIcon },
  { name: "Facebook", handle: "Clackamas Book Exchange", href: "https://www.facebook.com/ClackamasBooksExchange/", Icon: FacebookIcon },
];

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const busy = status === "loading";
  const invalid = status === "error";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong — please try again.");
      setStatus("success");
      setEmail("");
      toast.success("You're subscribed! Welcome to the TBR family.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong — please try again.";
      setStatus("error");
      setMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <section
      id="newsletter"
      className="px-4 py-12 sm:py-20 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, var(--paper) 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[36px] p-8 sm:p-12"
            style={{
              background:
                "radial-gradient(circle at 12% 20%, color-mix(in srgb, var(--gold) 30%, transparent), transparent 38%), linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
              boxShadow: "0 30px 80px color-mix(in srgb, var(--purple) 30%, transparent)",
            }}
          >
            {/* Decorative book shapes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--gold)" }}
            />
            <BookOpen
              aria-hidden="true"
              size={140}
              className="absolute -right-8 -top-8 opacity-10"
              style={{ color: "var(--gold)", transform: "rotate(-15deg)" }}
            />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--gold)" }}
                >
                  Stay in the loop
                </span>
                <h2
                  className="mb-3 font-bold leading-tight text-white"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                  }}
                >
                  New arrivals, store events, and a peek at our <span style={{ color: "var(--gold)" }}>2026 rebrand</span>.
                </h2>
                <p className="text-sm leading-relaxed text-white/75">
                  {EMAIL_ENABLED
                    ? "One short email a month. No spam — just the good bookish stuff."
                    : "Follow along on social for new arrivals, events, and the good bookish stuff. (Our newsletter is on a short break while we switch email providers.)"}
                </p>
              </div>

              {!EMAIL_ENABLED ? (
                /* Email paused — point people to social instead. */
                <div className="space-y-3">
                  {SOCIALS.map(({ name, handle, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all"
                      style={{ background: "rgba(255,255,255,0.10)", border: "1px solid color-mix(in srgb, var(--gold) 30%, transparent)" }}
                    >
                      <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--gold)" }}
                      >
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">Follow on {name}</span>
                        <span className="block truncate text-[11px] text-white/60">{handle}</span>
                      </span>
                      <ArrowUpRight size={16} className="icon-bob flex-shrink-0 text-white/70" />
                    </a>
                  ))}
                </div>
              ) : status === "success" ? (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl px-5 py-8 text-center animate-page-enter"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid color-mix(in srgb, var(--gold) 30%, transparent)" }}
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in srgb, var(--gold) 20%, transparent)" }}
                  >
                    <CheckCircle2 size={26} style={{ color: "var(--gold)" }} />
                  </span>
                  <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                    You&apos;re on the list!
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Watch your inbox for our next dispatch from the shelves.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 underline-offset-4 hover:underline"
                  >
                    <Sparkles size={12} /> Add another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                    disabled={busy}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? "cta-email-error" : undefined}
                    className="w-full rounded-2xl bg-white/95 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner outline-none transition focus:ring-2 disabled:opacity-60"
                    style={{ boxShadow: invalid ? "0 0 0 2px #fca5a5" : undefined }}
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="btn-warm flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                      color: "#1a1a1a",
                    }}
                  >
                    {busy ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  {invalid ? (
                    <p
                      id="cta-email-error"
                      role="alert"
                      className="text-center text-[12px] font-semibold"
                      style={{ color: "#FFD7D7" }}
                    >
                      {message}
                    </p>
                  ) : (
                    <p className="text-center text-[11px] text-white/60">
                      We respect your inbox. Unsubscribe anytime. By subscribing
                      you agree to our{" "}
                      <Link href="/privacy" className="underline hover:text-white/90">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
