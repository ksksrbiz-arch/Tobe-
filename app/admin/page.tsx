"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScanLine, Plus, RefreshCw, Check, ShieldAlert, LogIn, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS: string[] = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);

function isAdmin(user: User | null): boolean {
  if (!user?.email) return false;
  if (ADMIN_EMAILS.length === 0) return true; // open if not configured
  return ADMIN_EMAILS.includes(user.email);
}

interface ScanEntry {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  status: "pending" | "saved" | "error";
  errorMsg?: string;
}

async function lookupBook(isbn: string) {
  const clean = isbn.replace(/[-\s]/g, "");
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${clean}&maxResults=1`,
  );
  if (!res.ok) throw new Error("Google Books API error");
  const data = await res.json();
  const item = data.items?.[0];
  if (!item) throw new Error("Book not found");
  const info = item.volumeInfo ?? {};
  const saleInfo = item.saleInfo ?? {};
  return {
    title: info.title ?? "Unknown",
    author: (info.authors ?? []).join(", "),
    cover_url: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? "",
    list_price: saleInfo.retailPrice?.amount ?? saleInfo.listPrice?.amount ?? 0,
  };
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [authError, setAuthError] = useState("");

  const [isbnInput, setIsbnInput] = useState("");
  const [queue, setQueue] = useState<ScanEntry[]>([]);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const sendMagicLink = async () => {
    const trimmed = email.trim();
    if (!trimmed.includes("@")) { setAuthError("Enter a valid email."); return; }
    setAuthError("");
    const { error } = await supabase.auth.signInWithOtp({ email: trimmed, options: { shouldCreateUser: false } });
    if (error) setAuthError(error.message);
    else setMagicSent(true);
  };

  const processISBN = async (isbn: string) => {
    const clean = isbn.replace(/[-\s]/g, "");
    if (!/^\d{10}(\d{3})?$/.test(clean)) return;

    setProcessing(true);
    const entry: ScanEntry = { isbn: clean, title: "", author: "", cover_url: "", list_price: 0, status: "pending" };
    setQueue((prev) => [entry, ...prev]);

    try {
      const book = await lookupBook(clean);
      const { error: dbError } = await supabase.from("recent_arrivals").insert({
        isbn: clean,
        title: book.title,
        author: book.author,
        cover_url: book.cover_url,
        list_price: book.list_price,
        added_at: new Date().toISOString(),
      });
      if (dbError) throw new Error(dbError.message);

      setQueue((prev) =>
        prev.map((e, i) => i === 0 ? { ...e, ...book, status: "saved" } : e),
      );
    } catch (err) {
      setQueue((prev) =>
        prev.map((e, i) => i === 0 ? { ...e, status: "error", errorMsg: String(err) } : e),
      );
    } finally {
      setProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSubmit = () => {
    const v = isbnInput.trim();
    if (v) {
      setIsbnInput("");
      processISBN(v);
    }
  };

  // ─── Auth gate ───────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: "var(--background)" }}>
        <RefreshCw size={28} className="animate-spin" style={{ color: "#6B1C6F" }} />
      </main>
    );
  }

  if (!user) {
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
          <h1
            className="mb-1 text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
          >
            Staff Sign In
          </h1>
          <p className="mb-5 text-sm" style={{ color: "#6B7280" }}>Trade desk · TBR internal tool</p>
          {magicSent ? (
            <div className="flex flex-col items-center gap-2">
              <Mail size={22} style={{ color: "#F1BB1A" }} />
              <p className="text-sm" style={{ color: "#374151" }}>Magic link sent to <strong>{email}</strong></p>
            </div>
          ) : (
            <>
              <input
                type="email"
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

  if (!isAdmin(user)) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)" }}>
        <div className="text-center">
          <ShieldAlert size={36} style={{ color: "#ef4444" }} className="mx-auto mb-3" />
          <p className="text-lg font-bold" style={{ color: "#6B1C6F" }}>Access denied</p>
          <p className="text-sm" style={{ color: "#6B7280" }}>{user.email} is not an authorised admin account.</p>
          <button onClick={() => supabase.auth.signOut()} className="mt-4 text-xs underline" style={{ color: "#6B1C6F" }}>Sign out</button>
        </div>
      </main>
    );
  }

  // ─── Admin dashboard ──────────────────────────────────────────────────────
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1.8rem" }}
            >
              Trade Desk Scanner
            </h1>
            <p className="mt-0.5 text-sm" style={{ color: "#6B7280" }}>
              Scan ISBNs to publish books to the live &quot;Just Shelved&quot; feed
            </p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-xl border px-3 py-2 text-xs font-medium"
            style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F" }}
          >
            Sign out
          </button>
        </div>

        {/* Scanner input */}
        <div
          className="mb-6 rounded-[24px] border-2 p-6"
          style={{
            background: "linear-gradient(135deg, rgba(107,28,111,0.04), rgba(241,187,26,0.04))",
            borderColor: "#6B1C6F",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <ScanLine size={18} style={{ color: "#6B1C6F" }} />
            <span className="text-sm font-bold" style={{ color: "#6B1C6F" }}>Scan or type ISBN</span>
          </div>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="978-0-00-000000-0"
              value={isbnInput}
              onChange={(e) => setIsbnInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
              maxLength={17}
              className="flex-1 rounded-xl border px-4 py-3 text-sm font-mono outline-none focus:ring-2"
              style={{ borderColor: "rgba(107,28,111,0.25)", color: "#1F1A2E", background: "white" }}
            />
            <button
              onClick={handleSubmit}
              disabled={processing}
              className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
            >
              {processing ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
              Add
            </button>
          </div>
          <p className="mt-2 text-[11px]" style={{ color: "#9CA3AF" }}>
            Press Enter or scan with a barcode reader. Each scan instantly publishes to the live feed.
          </p>
        </div>

        {/* Queue */}
        {queue.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B1C6F" }}>
              Session log
            </p>
            {queue.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border p-4"
                style={{
                  background: entry.status === "saved" ? "rgba(34,197,94,0.05)" : entry.status === "error" ? "rgba(239,68,68,0.05)" : "white",
                  borderColor: entry.status === "saved" ? "rgba(34,197,94,0.30)" : entry.status === "error" ? "rgba(239,68,68,0.30)" : "rgba(107,28,111,0.10)",
                }}
              >
                {entry.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={entry.cover_url} alt={entry.title} className="h-14 w-10 flex-shrink-0 rounded object-cover" />
                ) : (
                  <div className="h-14 w-10 flex-shrink-0 animate-pulse rounded" style={{ background: "rgba(107,28,111,0.08)" }} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold" style={{ color: "#1F1A2E" }}>{entry.title || entry.isbn}</p>
                  {entry.author && <p className="text-xs" style={{ color: "#6B7280" }}>{entry.author}</p>}
                  {entry.errorMsg && <p className="text-xs" style={{ color: "#B91C1C" }}>{entry.errorMsg}</p>}
                </div>
                <div className="flex-shrink-0">
                  {entry.status === "pending" && <RefreshCw size={16} className="animate-spin" style={{ color: "#6B7280" }} />}
                  {entry.status === "saved" && <Check size={18} style={{ color: "#22c55e" }} />}
                  {entry.status === "error" && <span className="text-xs font-bold" style={{ color: "#ef4444" }}>Error</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
