"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Star, Check, X, RefreshCw, LogIn, LogOut, Inbox } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

type ReviewStatus = "pending" | "approved" | "rejected";

interface AdminReview {
  id: string;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  status: ReviewStatus;
  created_at: string;
}

const FILTERS: Array<{ key: ReviewStatus | "all"; label: string }> = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#F1BB1A" : "transparent"}
          style={{ color: "#F1BB1A" }}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const sessionState = useSession();
  const session = sessionState?.data ?? null;
  const status = sessionState?.status ?? "loading";

  const [email, setEmail] = useState("");
  const [signinSent, setSigninSent] = useState(false);
  const [authError, setAuthError] = useState("");

  const [filter, setFilter] = useState<ReviewStatus | "all">("pending");
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const sendMagicLink = useCallback(async () => {
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setAuthError("Enter a valid email.");
      return;
    }
    setAuthError("");
    try {
      // With redirect: false, failures come back as { error }, not a throw.
      const res = await signIn("resend", { email: trimmed, redirect: false });
      if (res?.error) {
        setAuthError("Couldn't send the magic link. Try again.");
      } else {
        setSigninSent(true);
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Sign-in failed.");
    }
  }, [email]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/reviews?status=${filter}`);
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error ?? "Failed to load reviews.");
        setReviews([]);
      } else {
        setReviews(payload.reviews ?? []);
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    // Defer out of the effect body so the setState calls inside load() don't run
    // synchronously during the effect (lint-safe; avoids cascading renders).
    if (status === "authenticated") queueMicrotask(() => void load());
  }, [status, load]);

  async function moderate(id: string, next: ReviewStatus) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error ?? "Update failed.");
      } else {
        // Drop the row if it no longer matches the active filter.
        setReviews((prev) =>
          filter === "all" || filter === next
            ? prev.map((r) => (r.id === id ? { ...r, status: next } : r))
            : prev.filter((r) => r.id !== id),
        );
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: "var(--background)" }}>
        <RefreshCw size={28} className="animate-spin" style={{ color: "#6B1C6F" }} />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)" }}>
        <div
          className="w-full max-w-sm rounded-[28px] border-2 p-8 text-center shadow-xl"
          style={{ borderColor: "rgba(107,28,111,0.20)", background: "white" }}
        >
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(107,28,111,0.10)" }}
          >
            <LogIn size={26} style={{ color: "#6B1C6F" }} />
          </div>
          <h1 className="mb-1 text-xl font-bold" style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}>
            Staff Sign In
          </h1>
          <p className="mb-5 text-sm" style={{ color: "#6B7280" }}>
            Review moderation · TBR internal tool
          </p>
          {signinSent ? (
            <p className="text-sm" style={{ color: "#374151" }}>
              Magic link sent to <strong>{email}</strong>. Click it to sign in.
            </p>
          ) : (
            <>
              <input
                type="email"
                aria-label="Staff email address"
                placeholder="staff@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMagicLink()}
                className="mb-3 w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E" }}
              />
              {authError && <p className="mb-2 text-xs" style={{ color: "#B91C1C" }}>{authError}</p>}
              <button
                onClick={sendMagicLink}
                className="w-full rounded-xl py-3 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
              >
                Send magic link
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  // Server-side authorization is enforced in /api/admin/reviews. The client gate
  // is UX only — non-admins will see 403 errors surfaced from the API.
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-bold" style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F", fontSize: "1.8rem" }}>
              Review Moderation
            </h1>
            <p className="mt-0.5 text-sm" style={{ color: "#6B7280" }}>
              Approve reviews to publish them to{" "}
              <Link href="/reviews" className="underline" style={{ color: "#6B1C6F" }}>
                /reviews
              </Link>
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium"
            style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F" }}
          >
            <LogOut size={12} />
            Sign out
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
              style={
                filter === f.key
                  ? { background: "#6B1C6F", color: "white" }
                  : { background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }
              }
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => void load()}
            className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }}
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border p-3 text-sm" style={{ borderColor: "rgba(239,68,68,0.30)", background: "rgba(239,68,68,0.05)", color: "#B91C1C" }}>
            {error}
          </p>
        )}

        {loading && reviews.length === 0 ? (
          <div className="flex justify-center py-12">
            <RefreshCw size={24} className="animate-spin" style={{ color: "#6B1C6F" }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border bg-white py-16 text-center" style={{ borderColor: "rgba(107,28,111,0.10)" }}>
            <Inbox size={28} style={{ color: "#6B7280" }} />
            <p className="text-sm" style={{ color: "#6B7280" }}>
              No {filter === "all" ? "" : filter} reviews.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border bg-white p-5"
                style={{ borderColor: "rgba(107,28,111,0.12)" }}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <Stars rating={r.rating} />
                    {r.title && (
                      <p className="mt-1 text-sm font-bold" style={{ color: "#6B1C6F" }}>
                        {r.title}
                      </p>
                    )}
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background:
                        r.status === "approved"
                          ? "rgba(34,197,94,0.12)"
                          : r.status === "rejected"
                            ? "rgba(239,68,68,0.10)"
                            : "rgba(241,187,26,0.18)",
                      color:
                        r.status === "approved"
                          ? "#16a34a"
                          : r.status === "rejected"
                            ? "#B91C1C"
                            : "#92700A",
                    }}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed" style={{ color: "#374151" }}>
                  {r.body}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {r.author_name} · {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    {r.status !== "approved" && (
                      <button
                        onClick={() => moderate(r.id, "approved")}
                        disabled={busyId === r.id}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        style={{ background: "#16a34a" }}
                      >
                        <Check size={13} /> Approve
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        onClick={() => moderate(r.id, "rejected")}
                        disabled={busyId === r.id}
                        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
                        style={{ borderColor: "rgba(239,68,68,0.35)", color: "#B91C1C" }}
                      >
                        <X size={13} /> Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
