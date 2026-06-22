"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { CONSENT_COOKIE, CONSENT_VERSION } from "@/components/ConsentInit";

/**
 * GDPR / ePrivacy-grade cookie consent banner, paired with <ConsentInit>.
 *
 * Non-essential storage (analytics) defaults to *denied* (see ConsentInit). This
 * banner lets the visitor opt in or out with equal-weight Accept / Decline
 * controls — "reject" must be as easy as "accept" — and writes the choice to a
 * first-party `tbr_consent` cookie (1 year). On a decision it issues the Google
 * Consent Mode v2 `update` so GTM-managed tags react immediately.
 *
 * Whether a choice already exists is read through useSyncExternalStore, which
 * gives a stable server snapshot (suppressed) so there's no hydration mismatch
 * or consent flash, then re-reads the real cookie on the client. The banner
 * re-opens on demand via the `tbr:open-cookie-settings` window event (wired to
 * the footer "Cookie settings" control). Strictly-necessary cookies and our
 * cookieless Plausible analytics need no consent and are unaffected.
 */

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const CONSENT_CHANGED_EVENT = "tbr:consent-changed";
const OPEN_SETTINGS_EVENT = "tbr:open-cookie-settings";

type AnalyticsChoice = "granted" | "denied";

function writeConsentCookie(analytics: AnalyticsChoice) {
  const value = encodeURIComponent(
    JSON.stringify({ v: CONSENT_VERSION, analytics, ts: Date.now() }),
  );
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

function readStoredChoice(): AnalyticsChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`),
  );
  if (!match) return null;
  try {
    const saved = JSON.parse(decodeURIComponent(match[1]));
    if (saved && saved.v === CONSENT_VERSION) {
      return saved.analytics === "granted" ? "granted" : "denied";
    }
  } catch {
    /* malformed — treat as no choice */
  }
  return null;
}

function updateConsentMode(analytics: AnalyticsChoice) {
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", { analytics_storage: analytics });
  } else {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(["consent", "update", { analytics_storage: analytics }]);
  }
}

// --- external store: "has the visitor already made a choice?" ---------------
function subscribeChoice(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
}
function getChoiceSnapshot() {
  return readStoredChoice() !== null;
}
// Suppress during SSR + hydration so the banner can't flash or mismatch; the
// real cookie is read immediately after hydration.
function getChoiceServerSnapshot() {
  return true;
}

export default function CookieConsent() {
  const hasChoice = useSyncExternalStore(
    subscribeChoice,
    getChoiceSnapshot,
    getChoiceServerSnapshot,
  );
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);

  // Footer "Cookie settings" reopens the banner regardless of a saved choice.
  useEffect(() => {
    const reopen = () => setManuallyOpened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const open = manuallyOpened || !hasChoice;

  // Move focus to the primary action only when the user explicitly reopened the
  // banner, so a first-time visitor's load isn't interrupted.
  useEffect(() => {
    if (manuallyOpened) acceptRef.current?.focus();
  }, [manuallyOpened]);

  const decide = useCallback((analytics: AnalyticsChoice) => {
    writeConsentCookie(analytics);
    updateConsentMode(analytics);
    setManuallyOpened(false);
    // Notify the external store so the banner re-reads the cookie and hides.
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[120] px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl border p-5 shadow-2xl sm:p-6"
        style={{
          background: "linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)",
          borderColor: "rgba(107,28,111,0.18)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            <Cookie size={20} />
          </span>
          <div className="min-w-0">
            <h2
              id="cookie-consent-title"
              className="text-base font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
            >
              We value your privacy
            </h2>
            <p
              id="cookie-consent-desc"
              className="mt-1.5 text-sm leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              We use strictly necessary cookies to run this site, plus optional
              analytics cookies to understand how it&apos;s used. Our page-view
              counter (Plausible) is cookieless and always on. You can accept or
              decline optional cookies — your choice is saved and you can change
              it anytime. See our <Link href="/cookies">Cookie Policy</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                ref={acceptRef}
                type="button"
                onClick={() => decide("granted")}
                className="btn-shine touch-target order-1 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] sm:order-2"
                style={{
                  background:
                    "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
                }}
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => decide("denied")}
                className="touch-target order-2 inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:bg-black/[0.03] sm:order-1"
                style={{
                  borderColor: "rgba(107,28,111,0.30)",
                  color: "#6B1C6F",
                }}
              >
                Decline optional
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
