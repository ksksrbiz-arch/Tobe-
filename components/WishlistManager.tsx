"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BookMarked, Plus, Trash2, RefreshCw, Search, LogIn, LogOut, Mail, Send, X } from "lucide-react";
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
      // With redirect: false, failures come back as { error }, not a throw.
      const res = await signIn("resend", { email: trimmed, redirect: false });
      if (res?.error) {
        setError("We couldn't send the magic link. Please try again in a moment.");
      } else {
        setSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="py-12 text-center animate-page-enter" role="status" aria-live="polite">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--gold) 15%, transparent)" }}
        >
          <Mail size={26} style={{ color: "var(--gold)" }} aria-hidden="true" />
        </div>
        <h3
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
        >
          Check your inbox
        </h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
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
        style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
      >
        <LogIn size={26} style={{ color: "var(--purple)" }} aria-hidden="true" />
      </div>
      <h3
        className="mb-1 text-xl font-bold"
        style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
      >
        Sign in to save your wishlist
      </h3>
      <p className="mb-6 text-sm" style={{ color: "var(--muted)" }}>
        We&apos;ll email you the moment a title from your list arrives.
      </p>
      <div className="mx-auto flex max-w-sm flex-col gap-3">
        <label htmlFor="wishlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="wishlist-email"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMagicLink()}
          required
          autoComplete="email"
          inputMode="email"
          disabled={loading}
          aria-invalid={!!error}
          aria-describedby={error ? "wishlist-email-error" : undefined}
          className="rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 disabled:opacity-60"
          style={{
            borderColor: error ? "#fca5a5" : "color-mix(in srgb, var(--purple) 20%, transparent)",
            boxShadow: error ? "0 0 0 2px rgba(252,165,165,0.5)" : undefined,
            color: "var(--ink)",
            background: "white",
          }}
        />
        {error && (
          <p id="wishlist-email-error" role="alert" className="text-xs font-medium" style={{ color: "#B91C1C" }}>
            {error}
          </p>
        )}
        <button
          onClick={sendMagicLink}
          disabled={loading}
          aria-busy={loading}
          aria-label="Send a magic sign-in link to my email"
          className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
        >
          {loading ? <RefreshCw size={14} className="animate-spin" aria-hidden="true" /> : <Mail size={14} aria-hidden="true" />}
          {loading ? "Sending…" : "Send magic link"}
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
    } catch {
      setError("Couldn't add this book — please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "color-mix(in srgb, var(--purple) 3%, transparent)", borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
    >
      <p id="hunt-list-label" className="mb-3 text-sm font-bold" style={{ color: "var(--purple)" }}>Add a title to your hunt list</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="ISBN (e.g. 9780-06-112008-4)"
          value={input}
          onChange={(e) => { setInput(e.target.value); setPreview(null); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          aria-labelledby="hunt-list-label"
          inputMode="numeric"
          enterKeyHint="search"
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? "hunt-list-error" : undefined}
          className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2"
          style={{
            borderColor: error ? "#fca5a5" : "color-mix(in srgb, var(--purple) 18%, transparent)",
            boxShadow: error ? "0 0 0 2px rgba(252,165,165,0.5)" : undefined,
            color: "var(--ink)",
            background: "white",
          }}
        />
        <button
          onClick={handleLookup}
          disabled={lookingUp}
          aria-busy={lookingUp}
          aria-label="Look up this ISBN"
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
        >
          {lookingUp ? <RefreshCw size={13} className="animate-spin" aria-hidden="true" /> : <Search size={13} aria-hidden="true" />}
          {lookingUp ? "Looking up…" : "Look up"}
        </button>
      </div>

      {error && <p id="hunt-list-error" role="alert" className="mt-2 text-xs font-medium" style={{ color: "#B91C1C" }}>{error}</p>}

      {preview && (
        <div
          className="mt-4 flex items-center gap-3 rounded-xl border p-3"
          style={{ background: "white", borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
        >
          {preview.cover_url && (
            <Image
              src={preview.cover_url}
              alt={preview.title ? `Cover of ${preview.title}` : "Book cover"}
              width={40}
              height={56}
              unoptimized
              className="h-14 w-10 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm truncate" style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}>{preview.title}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{preview.author}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            aria-busy={saving}
            aria-label={preview.title ? `Add ${preview.title} to my hunting list` : "Add this book to my hunting list"}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--gold)", color: "#1a1a1a" }}
          >
            {saving ? <RefreshCw size={11} className="animate-spin" aria-hidden="true" /> : <Plus size={11} aria-hidden="true" />}
            {saving ? "Adding…" : "Add"}
          </button>
        </div>
      )}
    </div>
  );
}

function WishlistRow({ item, onRemove }: { item: WishlistItem; onRemove: () => void }) {
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    setRemoveError(false);
    try {
      const res = await fetch(`/api/wishlist?id=${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) setRemoveError(true);
    } catch {
      setRemoveError(true);
    } finally {
      setRemoving(false);
    }
    onRemove();
  };

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: item.notified
          ? "linear-gradient(135deg, color-mix(in srgb, var(--gold) 8%, transparent), color-mix(in srgb, var(--purple) 5%, transparent))"
          : "white",
        borderColor: item.notified ? "color-mix(in srgb, var(--gold) 40%, transparent)" : "color-mix(in srgb, var(--purple) 10%, transparent)",
      }}
    >
      {item.cover_url ? (
        <Image
          src={item.cover_url}
          alt={item.title ? `Cover of ${item.title}` : "Book cover"}
          width={44}
          height={64}
          unoptimized
          className="h-16 w-11 flex-shrink-0 rounded object-cover"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
        />
      ) : (
        <div className="flex h-16 w-11 flex-shrink-0 items-center justify-center rounded" style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)" }}>
          <BookMarked size={18} style={{ color: "color-mix(in srgb, var(--purple) 40%, transparent)" }} aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-sm" style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}>{item.title}</p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>{item.author}</p>
        {item.isbn && <p className="mt-0.5 text-[10px] font-mono" style={{ color: "var(--muted)" }}>ISBN: {item.isbn}</p>}
        {item.notified && (
          <span
            className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "color-mix(in srgb, var(--gold) 20%, transparent)", color: "#92400e" }}
          >
            ✦ It&apos;s here! Check the shelf.
          </span>
        )}
        {removeError && (
          <p role="alert" className="mt-1 text-[10px] font-medium" style={{ color: "#B91C1C" }}>
            Couldn&apos;t remove this book — please try again.
          </p>
        )}
      </div>
      <button
        onClick={handleRemove}
        disabled={removing}
        aria-busy={removing}
        className="touch-target flex flex-shrink-0 items-center justify-center rounded-full bg-transparent transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Remove ${item.title} from wishlist`}
      >
        {/* 44px tap target (accessibility) with a smaller visible circle. */}
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
        >
          {removing ? <RefreshCw size={13} className="animate-spin" aria-hidden="true" /> : <Trash2 size={13} aria-hidden="true" />}
        </span>
      </button>
    </div>
  );
}

function buildExportEmail(items: WishlistItem[]) {
  const lines = items.map((item) => {
    const author = item.author ? ` — ${item.author}` : "";
    const isbn = item.isbn ? ` (ISBN ${item.isbn})` : "";
    return `• ${item.title}${author}${isbn}`;
  });
  const subject = "My To Be Read hunting list";
  const body =
    `My hunting list (${items.length} ${items.length === 1 ? "title" : "titles"}):\n\n` +
    lines.join("\n") +
    "\n\n— Sent from To Be Read · tobereadshop.com";
  return { subject, body };
}

/**
 * Email-export action. Sending opens the visitor's own mail client with the
 * list pre-filled, so it's a deliberate, reversible action — but we still gate
 * it behind an inline confirmation so a stray tap can't fire off an email.
 */
function WishlistExport({ items, email }: { items: WishlistItem[]; email: string }) {
  const [confirming, setConfirming] = useState(false);

  // Without a recipient the mailto link is meaningless — hide the action.
  if (!email) return null;

  const handleSend = () => {
    const { subject, body } = buildExportEmail(items);
    // The recipient must keep its literal "@" — only the query params are encoded.
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== "undefined") {
      window.location.href = href;
    }
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div
        className="mt-5 rounded-2xl border p-4"
        role="group"
        aria-label="Confirm emailing your hunting list"
        style={{ background: "color-mix(in srgb, var(--gold) 8%, transparent)", borderColor: "color-mix(in srgb, var(--gold) 40%, transparent)" }}
      >
        <p className="mb-3 text-sm" style={{ color: "var(--ink)" }}>
          Email a copy of your {items.length}-title list to{" "}
          <strong style={{ color: "var(--purple)" }}>{email}</strong>? This opens your mail app with the list ready to send.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSend}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
            aria-label={`Yes, email my hunting list to ${email}`}
          >
            <Send size={13} aria-hidden="true" />
            Yes, email it to me
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02]"
            style={{ borderColor: "color-mix(in srgb, var(--purple) 18%, transparent)", color: "var(--purple)" }}
            aria-label="Cancel emailing my hunting list"
          >
            <X size={13} aria-hidden="true" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex justify-center">
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02]"
        style={{ borderColor: "color-mix(in srgb, var(--purple) 18%, transparent)", color: "var(--purple)" }}
        aria-label="Email a copy of my hunting list to myself"
      >
        <Mail size={13} aria-hidden="true" />
        Email me my list
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
      <div className="space-y-3" role="status" aria-live="polite">
        <span className="sr-only">Loading your wishlist…</span>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl" style={{ background: "color-mix(in srgb, var(--purple) 6%, transparent)" }} aria-hidden="true" />
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
          borderColor: "color-mix(in srgb, var(--purple) 14%, transparent)",
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
        borderColor: "color-mix(in srgb, var(--purple) 14%, transparent)",
        boxShadow: "0 20px 60px color-mix(in srgb, var(--purple) 10%, transparent)",
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
          >
            <BookMarked size={20} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--purple)", fontSize: "1.15rem" }}
            >
              My Hunting List
            </h3>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          aria-label="Sign out of your wishlist"
          className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 18%, transparent)", color: "var(--purple)" }}
        >
          <LogOut size={12} aria-hidden="true" />
          Sign out
        </button>
      </div>

      <div className="mb-6">
        <AddBookPanel onAdded={fetchWishlist} />
      </div>

      {loadingItems ? (
        <div className="space-y-3" role="status" aria-live="polite">
          <span className="sr-only">Loading the books on your list…</span>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl" style={{ background: "color-mix(in srgb, var(--purple) 6%, transparent)" }} aria-hidden="true" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-12 text-center"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
        >
          <BookMarked size={32} style={{ color: "color-mix(in srgb, var(--purple) 25%, transparent)" }} aria-hidden="true" />
          <p className="mt-3 text-sm font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}>
            Your hunt list is empty
          </p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Add a title by ISBN above and we&apos;ll email you the moment it lands on our shelf — so you can grab it first.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <WishlistRow key={item.id} item={item} onRemove={fetchWishlist} />
            ))}
          </div>
          <WishlistExport items={items} email={session.user.email ?? ""} />
        </>
      )}

      <p className="mt-5 text-center text-[10px] leading-4" style={{ color: "var(--muted)" }}>
        We&apos;ll email you at {session.user.email} when a book from your list is processed at the trade desk.
      </p>
    </div>
  );
}
