"use client";

import React, { useState } from "react";
import { Send, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      toast.success("You're subscribed! Welcome to the TBR family.");
      setEmail("");
      setBusy(false);
    }, 700);
  };

  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
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
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                  }}
                >
                  New arrivals, store events, and a peek at our <span style={{ color: "#F1BB1A" }}>2026 rebrand</span>.
                </h2>
                <p className="text-sm leading-relaxed text-white/75">
                  One short email a month. No spam — just the good bookish stuff.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl bg-white/95 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner outline-none transition focus:ring-2 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                    color: "#1a1a1a",
                  }}
                >
                  {busy ? "Subscribing…" : "Subscribe"}
                  <Send size={14} />
                </button>
                <p className="text-center text-[11px] text-white/60">
                  We respect your inbox. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
