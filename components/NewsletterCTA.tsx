"use client";

import React, { useState } from "react";
import { Send, BookOpen, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[36px] p-8 sm:p-12"
            style={{
              background:
                "radial-gradient(circle at 12% 20%, rgba(241,187,26,0.30), transparent 38%), linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
              boxShadow: "0 30px 80px rgba(107,28,111,0.30)",
            }}
          >
            {/* Decorative book shapes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: "#F1BB1A" }}
            />
            <BookOpen
              aria-hidden="true"
              size={140}
              className="absolute -right-8 -top-8 opacity-10"
              style={{ color: "#F1BB1A", transform: "rotate(-15deg)" }}
            />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ background: "rgba(241,187,26,0.18)", color: "#F1BB1A" }}
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
                  New arrivals, store events, and a peek at our <span style={{ color: "#F1BB1A" }}>2026 rebrand</span>.
                </h2>
                <p className="text-sm leading-relaxed text-white/75">
                  One short email a month. No spam — just the good bookish stuff.
                </p>
              </div>

              {status === "success" ? (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl px-5 py-8 text-center animate-page-enter"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(241,187,26,0.30)" }}
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "rgba(241,187,26,0.2)" }}
                  >
                    <CheckCircle2 size={26} style={{ color: "#F1BB1A" }} />
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
                    className="btn-warm flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
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

                  {/* Status line: errors announced assertively, hint otherwise. */}
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
                      We respect your inbox. Unsubscribe anytime.
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
