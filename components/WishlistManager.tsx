"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BookMarked, Plus, Trash2, RefreshCw, Search, LogIn, LogOut, Mail } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

interface WishlistItem {
  id: string;
  user_id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number | null;
  notified: boolean;
  created_at: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthPanel() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendMagicLink = async () => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signIn("resend", { email: trimmed, redirect: false });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="py-12 text-center">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(241,187,26,0.15)" }}
        >
          <Mail size={26} style={{ color: "#F1BB1A" }} />
        </div>
        <h3
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
        >
          Check your inbox
        </h3>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          We sent a magic link to <strong>{email}</strong>.<br />
          Click it to sign in — no password needed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 text-center">
      <div
        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "rgba(107,28,111,0.10)" }}
      >
        <LogIn size={26} style={{ color: "#6B1C6F" }} />
      </div>
      <h3
        className="mb-1 text-xl font-bold"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
      >
        Sign in to save your wishlist
      </h3>
      <p className="mb-6 text-sm" style={{ color: "#6B7280" }}>
        We&apos;ll email you the moment a title from your list arrives.
      </p>
      <div className="mx-auto flex max-w-sm flex-col gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMagicLink()}
          className="rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E", background: "white" }}
        />
        {error && <p className="text-xs" style={{ color: "#B91C1C" }}>{error}</p>}
        <button
          onClick={sendMagicLink}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
        >
          {loading ? <RefreshCw size={14} className="animate-spin" /> : <Mail size={14} />}
          Send magic link
        </button>
      </div>
    </div>
  );
}

interface LookupResult {
  title: string;
  author: string;
  cover_url: string;
  list_price: number | null;
}

async function lookupIsbn(isbn: string): Promise<LookupResult | null> {
  const clean = isbn.replace(/[-\s]/g, "");
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${clean}&maxResults=1`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    const info = item.volumeInfo ?? {};
    const saleInfo = item.saleInfo ?? {};
    return {
      title: info.title ?? "",
      author: (info.authors ?? []).join(", "),
      cover_url: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? "",
      list_price: saleInfo.retailPrice?.amount ?? saleInfo.listPrice?.amount ?? null,
    };
  } catch {
    return null;
  }
}

function AddBookPanel({ onAdded }: { onAdded: () => void }) {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState<LookupResult | null>(null);
  const [lookingUp, setLookingUp] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setLookingUp(true);
    setError("");
    setPreview(null);
    const result = await lookupIsbn(trimmed);
    setLookingUp(false);
    if (result) setPreview(result);
    else setError("Couldn't find that ISBN. Double-check the number and try again.");
  };

  const handleSave = async () => {
    if (!preview) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          isbn: input.trim().replace(/[-\s]/g, ""),
          title: preview.title,
          author: preview.author,
          cover_url: preview.cover_url,
          list_price: preview.list_price,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setError(payload?.error ?? "Couldn't add this book.");
      } else {
        setInput("");
        setPreview(null);
        onAdded();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "rgba(107,28,111,0.03)", borderColor: "rgba(107,28,111,0.12)" }}
    >
      <p className="mb-3 text-sm font-bold" style={{ color: "#6B1C6F" }}>Add a title to your hunt list</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="ISBN (e.g. 9780-06-112008-4)"
          value={input}
          onChange={(e) => { setInput(e.target.value); setPreview(null); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2"
          style={{ borderColor: "rgba(107,28,111,0.18)", color: "#1F1A2E", background: "white" }}
        />
        <button
          onClick={handleLookup}
          disabled={lookingUp}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
        >
          {lookingUp ? <RefreshCw size={13} className="animate-spin" /> : <Search size={13} />}
          Look up
        </button>
      </div>

      {error && <p className="mt-2 text-xs" style={{ color: "#B91C1C" }}>{error}</p>}

      {preview && (
        <div
          className="mt-4 flex items-center gap-3 rounded-xl border p-3"
          style={{ background: "white", borderColor: "rgba(107,28,111,0.12)" }}
        >
          {preview.cover_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.cover_url} alt={preview.title || "Book cover"} className="h-14 w-10 rounded object-cover flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}>{preview.title}</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>{preview.author}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.04] disabled:opacity-60"
            style={{ background: "#F1BB1A", color: "#1a1a1a" }}
          >
            {saving ? <RefreshCw size={11} className="animate-spin" /> : <Plus size={11} />}
            Add
          </button>
        </div>
      )}
    </div>
  );
}

function WishlistRow({ item, onRemove }: { item: WishlistItem; onRemove: () => void }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await fetch(`/api/wishlist?id=${item.id}`, { method: "DELETE" });
    onRemove();
  };

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: item.notified
          ? "linear-gradient(135deg, rgba(241,187,26,0.08), rgba(107,28,111,0.05))"
          : "white",
        borderColor: item.notified ? "rgba(241,187,26,0.40)" : "rgba(107,28,111,0.10)",
      }}
    >
      {item.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.cover_url} alt={item.title} className="h-16 w-11 flex-shrink-0 rounded object-cover" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }} />
      ) : (
        <div className="flex h-16 w-11 flex-shrink-0 items-center justify-center rounded" style={{ background: "rgba(107,28,111,0.08)" }}>
          <BookMarked size={18} style={{ color: "rgba(107,28,111,0.40)" }} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}>{item.title}</p>
        <p className="text-xs" style={{ color: "#6B7280" }}>{item.author}</p>
        {item.isbn && <p className="mt-0.5 text-[10px] font-mono" style={{ color: "#9CA3AF" }}>ISBN: {item.isbn}</p>}
        {item.notified && (
          <span
            className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.20)", color: "#92400e" }}
          >
            ✦ It&apos;s here! Check the shelf.
          </span>
        )}
      </div>
      <button
        onClick={handleRemove}
        disabled={removing}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 disabled:opacity-50"
        style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
        aria-label={`Remove ${item.title} from wishlist`}
      >
        {removing ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
      </button>
    </div>
  );
}

export default function WishlistManager() {
  const sessionState = useSession();
  const session = sessionState?.data ?? null;
  const status = sessionState?.status ?? "loading";
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!session?.user) return;
    setLoadingItems(true);
    try {
      const res = await fetch("/api/wishlist");
      const payload = await res.json();
      if (res.ok) setItems((payload.items as WishlistItem[]) ?? []);
    } finally {
      setLoadingItems(false);
    }
  }, [session]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    void (async () => {
      await fetchWishlist();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [status, fetchWishlist]);

  if (status === "loading") {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl" style={{ background: "rgba(107,28,111,0.06)" }} />
        ))}
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div
        className="rounded-[28px] border-2 p-7 shadow-xl"
        style={{
          background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
          borderColor: "rgba(107,28,111,0.14)",
        }}
      >
        <AuthPanel />
      </div>
    );
  }

  return (
    <div
      className="rounded-[28px] border-2 p-7 shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.14)",
        boxShadow: "0 20px 60px rgba(107,28,111,0.10)",
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            <BookMarked size={20} className="text-white" />
          </div>
          <div>
            <h3
              className="font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1.15rem" }}
            >
              My Hunting List
            </h3>
            <p className="text-xs" style={{ color: "#6B7280" }}>{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
          style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F" }}
        >
          <LogOut size={12} />
          Sign out
        </button>
      </div>

      <div className="mb-6">
        <AddBookPanel onAdded={fetchWishlist} />
      </div>

      {loadingItems ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl" style={{ background: "rgba(107,28,111,0.06)" }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-12 text-center"
          style={{ borderColor: "rgba(107,28,111,0.12)" }}
        >
          <BookMarked size={32} style={{ color: "rgba(107,28,111,0.25)" }} />
          <p className="mt-3 text-sm" style={{ color: "#6B7280" }}>
            Your hunt list is empty. Add an ISBN above and we&apos;ll alert you when it arrives!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <WishlistRow key={item.id} item={item} onRemove={fetchWishlist} />
          ))}
        </div>
      )}

      <p className="mt-5 text-center text-[10px] leading-4" style={{ color: "#9CA3AF" }}>
        We&apos;ll email you at {session.user.email} when a book from your list is processed at the trade desk.
      </p>
    </div>
  );
}
