"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Send, X, BookOpen, Check } from "lucide-react";
import { toast } from "sonner";
import RatingBadge from "./RatingBadge";

// Persistence keys: the exit-intent modal is suppressed for a long time once
// the visitor has seen/dismissed/subscribed; the slim bar only stays closed for
// the current tab session so it can return on a later visit.
const SEEN_KEY = "tbr_newsletter_prompt_seen";
const BAR_CLOSED_KEY = "tbr_newsletter_bar_closed";

function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

async function subscribe(email: string): Promise<boolean> {
  if (!email.includes("@")) {
    toast.error("Please enter a valid email address.");
    return false;
  }
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
    toast.success("You're subscribed! Welcome to the TBR family.");
    return true;
  } catch (err: unknown) {
    toast.error(err instanceof Error ? err.message : "Something went wrong — please try again.");
    return false;
  }
}

export default function NewsletterPrompts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const armed = useRef(false); // exit-intent listener should only fire once
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Exit-intent: desktop pointers only, fires once when the cursor leaves
  // through the top of the viewport (toward the tab bar / close button).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!finePointer || hasSeen()) return;

    const onMouseOut = (e: MouseEvent) => {
      if (armed.current) return;
      if (e.clientY <= 0 && !e.relatedTarget) {
        armed.current = true;
        markSeen();
        setBarOpen(false);
        setModalOpen(true);
      }
    };
    // Give the visitor a moment before arming so it never feels instant.
    const t = window.setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
    }, 4000);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  // Slim sticky bar: appears after the visitor has scrolled a bit, unless the
  // modal already covers the same job or the bar was closed this session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let barClosed = false;
    try {
      barClosed = sessionStorage.getItem(BAR_CLOSED_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (barClosed || hasSeen()) return;

    const onScroll = () => {
      if (window.scrollY > 900) {
        setBarOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the modal; focus the close button when it opens.
  useEffect(() => {
    if (!modalOpen) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const closeBar = useCallback(() => {
    setBarOpen(false);
    try {
      sessionStorage.setItem(BAR_CLOSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, source: "modal" | "bar") => {
      e.preventDefault();
      setBusy(true);
      const ok = await subscribe(email);
      setBusy(false);
      if (ok) {
        setEmail("");
        markSeen();
        if (source === "modal") setModalOpen(false);
        else closeBar();
      }
    },
    [email, closeBar],
  );

  return (
    <>
      {/* ─── Slim sticky bar ─── */}
      {barOpen && !modalOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 animate-page-enter px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          role="region"
          aria-label="Newsletter signup"
        >
          <div
            className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur sm:flex-row sm:gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(107,28,111,0.97), rgba(74,19,80,0.97))",
              borderColor: "rgba(241,187,26,0.25)",
            }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <BookOpen size={16} style={{ color: "#F1BB1A" }} />
              First dibs on rare finds & new arrivals.
            </p>
            <form onSubmit={(e) => handleSubmit(e, "bar")} className="flex flex-1 items-center gap-2">
              <label htmlFor="bar-email" className="sr-only">
                Email address
              </label>
              <input
                id="bar-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-xl bg-white/95 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                disabled={busy}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-transform hover:scale-[1.03] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)", color: "#1a1a1a" }}
              >
                {busy ? "…" : "Join"}
                <Send size={13} />
              </button>
            </form>
            <button
              type="button"
              onClick={closeBar}
              aria-label="Dismiss newsletter bar"
              className="touch-target absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white sm:static sm:h-auto sm:w-auto"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ─── Exit-intent modal ─── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(31,26,46,0.55)" }}
            onClick={() => setModalOpen(false)}
          />
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[28px] p-7 shadow-2xl animate-page-enter"
            style={{
              background:
                "radial-gradient(circle at 12% 16%, rgba(241,187,26,0.30), transparent 40%), linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
            }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="touch-target absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            <BookOpen aria-hidden="true" size={120} className="absolute -right-6 -top-8 opacity-10" style={{ color: "#F1BB1A", transform: "rotate(-15deg)" }} />

            <span
              className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ background: "rgba(241,187,26,0.18)", color: "#F1BB1A" }}
            >
              Before you go
            </span>
            <h2
              id="exit-modal-title"
              className="mb-3 font-bold leading-tight text-white"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
            >
              Don&apos;t miss the <span style={{ color: "#F1BB1A" }}>good finds</span>.
            </h2>

            <ul className="mb-5 space-y-2">
              {[
                "First dibs on rare & collectible books",
                "Just-Shelved arrivals before the floor",
                "Author events & community happenings",
              ].map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-white/90">
                  <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#F1BB1A" }} />
                  {perk}
                </li>
              ))}
            </ul>

            <form onSubmit={(e) => handleSubmit(e, "modal")} className="space-y-3">
              <label htmlFor="exit-email" className="sr-only">
                Email address
              </label>
              <input
                id="exit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-2xl bg-white/95 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                disabled={busy}
                className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-transform hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)", color: "#1a1a1a" }}
              >
                {busy ? "Subscribing…" : "Subscribe"}
                <Send size={14} />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between gap-3">
              <RatingBadge tone="dark" showLink={false} />
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white/90 hover:underline"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
