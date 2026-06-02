"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Camera,
  RefreshCw,
  LogIn,
  LogOut,
  Lock,
  Check,
  X as XIcon,
  Sparkles,
  BookOpen,
  Upload,
  ExternalLink,
  Pencil,
  Search,
} from "lucide-react";
import { toast } from "sonner";

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;

// Map Gemini's 0–1 read confidence to a small badge. Spines are hardest to
// read, so anything below ~0.5 is worth a second look before publishing.
function confidenceMeta(confidence: number): { label: string; color: string; bg: string } | null {
  if (!confidence || confidence <= 0) return null;
  if (confidence >= 0.8) return { label: "High confidence", color: "#166534", bg: "rgba(34,197,94,0.14)" };
  if (confidence >= 0.5) return { label: "Check spelling", color: "#92400E", bg: "rgba(241,187,26,0.20)" };
  return { label: "Low — verify", color: "#991B1B", bg: "rgba(239,68,68,0.14)" };
}

interface ResolvedBook {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  description: string;
}

interface ApiCandidate {
  detectedTitle: string;
  detectedAuthor: string;
  confidence: number;
  matched: boolean;
  book: ResolvedBook | null;
}

interface Candidate extends ApiCandidate {
  key: string;
  selected: boolean;
  sourcePhotoUrl: string;
}

type PhotoStatus = "uploading" | "analyzing" | "done" | "error";
interface PhotoJob {
  id: string;
  name: string;
  status: PhotoStatus;
  found: number;
  error?: string;
}

// ─── Image helpers ───────────────────────────────────────────────────────────

// Downscale a phone photo in-browser before upload: saves mobile data and keeps
// the image well within Cloudinary's free-tier and the analyzer's needs.
function downscale(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Could not process image"))),
        "image/jpeg",
        JPEG_QUALITY,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

async function uploadToCloudinary(blob: Blob): Promise<string> {
  // Get a short-lived signature from our password-gated server route, then
  // upload directly to Cloudinary. The secret never reaches the browser.
  const signRes = await fetch("/api/studio/sign", { method: "POST" });
  const sign = await signRes.json();
  if (!signRes.ok) throw new Error(sign?.error ?? "Couldn't authorize upload");

  const form = new FormData();
  form.append("file", blob);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("folder", sign.folder);
  form.append("signature", sign.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.error?.message ?? "Upload failed");
  }
  const json = (await res.json()) as { secure_url?: string };
  if (!json.secure_url) throw new Error("Upload returned no URL");
  return json.secure_url;
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function StudioPage() {
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [uploadsReady, setUploadsReady] = useState(false);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/studio/session", { cache: "no-store" });
      const data = (await res.json()) as { authed: boolean; configured: boolean; uploads: boolean };
      setAuthed(data.authed);
      setConfigured(data.configured);
      setUploadsReady(data.uploads);
    } catch {
      setConfigured(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: "var(--background)" }}>
        <RefreshCw size={28} className="animate-spin" style={{ color: "#6B1C6F" }} />
      </main>
    );
  }

  if (!configured) {
    return (
      <Centered>
        <Lock size={26} style={{ color: "#6B1C6F" }} />
        <h1 className="mt-3 text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}>
          Studio not configured
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
          Ask your developer to set <code>STUDIO_PASSWORD</code> and the Cloudinary
          environment variables, then refresh.
        </p>
      </Centered>
    );
  }

  if (!authed) {
    return <PasswordGate onSuccess={() => void refreshSession()} />;
  }

  return <Studio cloudReady={uploadsReady} onSignOut={() => setAuthed(false)} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)" }}>
      <div
        className="w-full max-w-sm rounded-[28px] border-2 p-8 text-center shadow-xl"
        style={{ borderColor: "rgba(107,28,111,0.20)", background: "white" }}
      >
        {children}
      </div>
    </main>
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!password) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Sign-in failed.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Centered>
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "rgba(107,28,111,0.10)" }}
      >
        <Camera size={26} style={{ color: "#6B1C6F" }} />
      </div>
      <h1 className="mt-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}>
        Photo Studio
      </h1>
      <p className="mb-5 mt-1 text-sm" style={{ color: "#6B7280" }}>
        Snap a stack — we&apos;ll shelve it. Staff password required.
      </p>
      <input
        type="password"
        placeholder="Studio password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        autoFocus
        className="mb-3 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
        style={{ borderColor: "rgba(107,28,111,0.20)", color: "#1F1A2E" }}
      />
      {error && <p className="mb-2 text-xs" style={{ color: "#B91C1C" }}>{error}</p>}
      <button
        onClick={submit}
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
      >
        {submitting ? <RefreshCw size={14} className="animate-spin" /> : <LogIn size={14} />}
        Enter studio
      </button>
    </Centered>
  );
}

function Studio({ cloudReady, onSignOut }: { cloudReady: boolean; onSignOut: () => void }) {
  const [jobs, setJobs] = useState<PhotoJob[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [busy, setBusy] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [resolving, setResolving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const startEdit = (c: Candidate) => {
    setEditingKey(c.key);
    setEditTitle(c.book?.title ?? c.detectedTitle);
    setEditAuthor(c.book?.author ?? c.detectedAuthor);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditTitle("");
    setEditAuthor("");
  };

  const submitEdit = async (key: string) => {
    const title = editTitle.trim();
    if (!title) return;
    setResolving(true);
    try {
      const res = await fetch("/api/studio/resolve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, author: editAuthor.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "No match found");
      const book = data.book as ResolvedBook;
      const newKey = `isbn:${book.isbn}`;
      setCandidates((prev) =>
        prev
          // Drop any other card that already resolves to this ISBN to avoid a
          // duplicate after the re-match.
          .filter((c) => c.key === key || c.key !== newKey)
          .map((c) =>
            c.key === key
              ? { ...c, book, matched: true, selected: true, key: newKey }
              : c,
          ),
      );
      cancelEdit();
      toast.success(`Matched "${book.title}"`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No match found");
    } finally {
      setResolving(false);
    }
  };

  const mergeCandidates = useCallback((incoming: Candidate[]) => {
    setCandidates((prev) => {
      const byKey = new Map(prev.map((c) => [c.key, c]));
      for (const c of incoming) {
        if (!byKey.has(c.key)) byKey.set(c.key, c);
      }
      return Array.from(byKey.values());
    });
  }, []);

  const processFiles = useCallback(
    async (files: FileList) => {
      if (!cloudReady) {
        toast.error("Cloudinary isn't configured yet.");
        return;
      }
      setBusy(true);
      for (const file of Array.from(files)) {
        const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setJobs((prev) => [{ id, name: file.name, status: "uploading", found: 0 }, ...prev]);
        const update = (patch: Partial<PhotoJob>) =>
          setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));

        try {
          const blob = await downscale(file);
          const url = await uploadToCloudinary(blob);
          update({ status: "analyzing" });

          const res = await fetch("/api/studio/analyze", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ imageUrl: url }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.error ?? "Analysis failed");

          const apiCandidates = (data.candidates ?? []) as ApiCandidate[];
          const mapped: Candidate[] = apiCandidates.map((c) => ({
            ...c,
            key: c.book ? `isbn:${c.book.isbn}` : `t:${c.detectedTitle.toLowerCase()}`,
            selected: c.matched,
            sourcePhotoUrl: url,
          }));
          mergeCandidates(mapped);
          update({ status: "done", found: mapped.filter((m) => m.matched).length });
        } catch (err) {
          update({ status: "error", error: err instanceof Error ? err.message : "Failed" });
        }
      }
      setBusy(false);
    },
    [cloudReady, mergeCandidates],
  );

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      void processFiles(e.target.files);
    }
    e.target.value = "";
  };

  const toggle = (key: string) =>
    setCandidates((prev) => prev.map((c) => (c.key === key ? { ...c, selected: !c.selected } : c)));

  const matched = candidates.filter((c) => c.matched);
  const unmatched = candidates.filter((c) => !c.matched);
  const selectedCount = matched.filter((c) => c.selected).length;

  const publish = async () => {
    const toPublish = matched.filter((c) => c.selected && c.book);
    if (toPublish.length === 0) return;
    setPublishing(true);
    try {
      const res = await fetch("/api/studio/publish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          books: toPublish.map((c) => ({ ...c.book, source_photo_url: c.sourcePhotoUrl })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Publish failed");
      const total = (data.published ?? 0) + (data.resurfaced ?? 0);
      toast.success(`Shelved ${total} book${total === 1 ? "" : "s"} to Just Shelved!`);
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        toast.error(`${data.errors.length} couldn't be saved.`);
      }
      // Clear the published ones from the review list.
      const publishedKeys = new Set(toPublish.map((c) => c.key));
      setCandidates((prev) => prev.filter((c) => !publishedKeys.has(c.key)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  const signOut = async () => {
    await fetch("/api/studio/logout", { method: "POST" });
    onSignOut();
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1
              className="font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1.7rem" }}
            >
              Photo Studio
            </h1>
            <p className="mt-0.5 text-sm" style={{ color: "#6B7280" }}>
              Photograph a stack of books — we read the spines, look up each title, and shelve them.
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium"
            style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F" }}
          >
            <LogOut size={12} />
            Sign out
          </button>
        </div>

        {!cloudReady && (
          <div
            className="mb-5 rounded-2xl border p-4 text-sm"
            style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.30)", color: "#991B1B" }}
          >
            Cloudinary isn&apos;t configured. Set <code>CLOUDINARY_URL</code> on the
            server to enable uploads.
          </div>
        )}

        {/* Capture */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={onPick}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy || !cloudReady}
          className="btn-shine flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-5 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
        >
          {busy ? <RefreshCw size={20} className="animate-spin" /> : <Camera size={20} />}
          {busy ? "Working…" : "Take or choose photos"}
        </button>
        <p className="mt-2 text-center text-[11px]" style={{ color: "#9CA3AF" }}>
          Tip: photograph spines straight-on in good light. You can add several photos at once.
        </p>

        {/* Photo jobs */}
        {jobs.length > 0 && (
          <div className="mt-6 space-y-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm"
                style={{
                  borderColor:
                    job.status === "error" ? "rgba(239,68,68,0.30)" : "rgba(107,28,111,0.12)",
                  background: job.status === "error" ? "rgba(239,68,68,0.04)" : "white",
                }}
              >
                <Upload size={15} style={{ color: "#6B1C6F", flexShrink: 0 }} />
                <span className="min-w-0 flex-1 truncate" style={{ color: "#374151" }}>
                  {job.name}
                </span>
                <span className="flex-shrink-0 text-xs" style={{ color: "#6B7280" }}>
                  {job.status === "uploading" && "Uploading…"}
                  {job.status === "analyzing" && "Reading spines…"}
                  {job.status === "done" && `${job.found} found`}
                  {job.status === "error" && (job.error ?? "Error")}
                </span>
                {(job.status === "uploading" || job.status === "analyzing") && (
                  <RefreshCw size={14} className="animate-spin flex-shrink-0" style={{ color: "#6B7280" }} />
                )}
                {job.status === "done" && <Check size={16} className="flex-shrink-0" style={{ color: "#22c55e" }} />}
                {job.status === "error" && <XIcon size={15} className="flex-shrink-0" style={{ color: "#ef4444" }} />}
              </div>
            ))}
          </div>
        )}

        {/* Review */}
        {matched.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6B1C6F" }}>
                Review &amp; publish ({selectedCount}/{matched.length})
              </h2>
              <button
                onClick={() =>
                  setCandidates((prev) => {
                    const allSelected = prev.filter((c) => c.matched).every((c) => c.selected);
                    return prev.map((c) => (c.matched ? { ...c, selected: !allSelected } : c));
                  })
                }
                className="text-xs font-semibold"
                style={{ color: "#6B1C6F" }}
              >
                Toggle all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {matched.map((c) => {
                const conf = confidenceMeta(c.confidence);
                const isEditing = editingKey === c.key;
                return (
                  <div
                    key={c.key}
                    className="rounded-2xl border p-3 transition-all"
                    style={{
                      borderColor: c.selected ? "rgba(34,197,94,0.45)" : "rgba(107,28,111,0.12)",
                      background: c.selected ? "rgba(34,197,94,0.06)" : "white",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {c.book?.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.book.cover_url}
                          alt={c.book.title}
                          className="h-16 w-11 flex-shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-16 w-11 flex-shrink-0 items-center justify-center rounded"
                          style={{ background: "rgba(107,28,111,0.08)" }}
                        >
                          <BookOpen size={18} style={{ color: "rgba(107,28,111,0.4)" }} />
                        </div>
                      )}

                      {isEditing ? (
                        <div className="min-w-0 flex-1 space-y-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                            autoFocus
                            className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:ring-2"
                            style={{ borderColor: "rgba(107,28,111,0.25)", color: "#1F1A2E" }}
                          />
                          <input
                            value={editAuthor}
                            onChange={(e) => setEditAuthor(e.target.value)}
                            placeholder="Author (optional)"
                            onKeyDown={(e) => e.key === "Enter" && submitEdit(c.key)}
                            className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:ring-2"
                            style={{ borderColor: "rgba(107,28,111,0.25)", color: "#1F1A2E" }}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => submitEdit(c.key)}
                              disabled={resolving || !editTitle.trim()}
                              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                              style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                            >
                              {resolving ? (
                                <RefreshCw size={12} className="animate-spin" />
                              ) : (
                                <Search size={12} />
                              )}
                              Re-match
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                              style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B7280" }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggle(c.key)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-bold" style={{ color: "#1F1A2E" }}>
                              {c.book?.title}
                            </p>
                            {conf && (
                              <span
                                className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{ background: conf.bg, color: conf.color }}
                              >
                                {conf.label}
                              </span>
                            )}
                          </div>
                          {c.book?.author && (
                            <p className="truncate text-xs" style={{ color: "#6B7280" }}>
                              {c.book.author}
                            </p>
                          )}
                          <p className="mt-0.5 font-mono text-[10px]" style={{ color: "#9CA3AF" }}>
                            ISBN {c.book?.isbn}
                            {c.book && c.book.list_price > 0
                              ? ` · $${c.book.list_price.toFixed(2)} list`
                              : ""}
                          </p>
                        </button>
                      )}

                      {!isEditing && (
                        <div className="flex flex-shrink-0 flex-col items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggle(c.key)}
                            aria-label={c.selected ? "Deselect" : "Select"}
                            className="flex h-6 w-6 items-center justify-center rounded-md border-2"
                            style={{
                              borderColor: c.selected ? "#16A34A" : "rgba(107,28,111,0.18)",
                              background: c.selected ? "#16A34A" : "white",
                            }}
                          >
                            <Check
                              size={14}
                              strokeWidth={3}
                              style={{ color: "white", opacity: c.selected ? 1 : 0 }}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => startEdit(c)}
                            aria-label="Edit title"
                            className="flex h-6 w-6 items-center justify-center rounded-md border"
                            style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F" }}
                          >
                            <Pencil size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={publish}
              disabled={publishing || selectedCount === 0}
              className="btn-shine mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
            >
              {publishing ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Publish {selectedCount} to Just Shelved
            </button>
          </div>
        )}

        {/* Unmatched */}
        {unmatched.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
              Couldn&apos;t match online ({unmatched.length})
            </p>
            <p className="mb-3 text-xs" style={{ color: "#9CA3AF" }}>
              Tap one to correct the spelling and search again — or add it by ISBN on the Trade Desk.
            </p>
            <div className="space-y-2">
              {unmatched.map((c) => {
                const isEditing = editingKey === c.key;
                return (
                  <div
                    key={c.key}
                    className="rounded-xl border p-2.5"
                    style={{ borderColor: "rgba(107,28,111,0.12)", background: "white" }}
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Title"
                          autoFocus
                          className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:ring-2"
                          style={{ borderColor: "rgba(107,28,111,0.25)", color: "#1F1A2E" }}
                        />
                        <input
                          value={editAuthor}
                          onChange={(e) => setEditAuthor(e.target.value)}
                          placeholder="Author (optional)"
                          onKeyDown={(e) => e.key === "Enter" && submitEdit(c.key)}
                          className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:ring-2"
                          style={{ borderColor: "rgba(107,28,111,0.25)", color: "#1F1A2E" }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => submitEdit(c.key)}
                            disabled={resolving || !editTitle.trim()}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                          >
                            {resolving ? <RefreshCw size={12} className="animate-spin" /> : <Search size={12} />}
                            Search
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                            style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B7280" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(c)}
                        className="flex w-full items-center gap-2 text-left"
                      >
                        <Pencil size={12} style={{ color: "#6B1C6F", flexShrink: 0 }} />
                        <span className="min-w-0 flex-1 truncate text-sm" style={{ color: "#374151" }}>
                          {c.detectedTitle}
                        </span>
                        {confidenceMeta(c.confidence) && (
                          <span
                            className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                            style={{
                              background: confidenceMeta(c.confidence)!.bg,
                              color: confidenceMeta(c.confidence)!.color,
                            }}
                          >
                            {confidenceMeta(c.confidence)!.label}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              href="/admin"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "#6B1C6F" }}
            >
              Add these by ISBN on the Trade Desk
              <ExternalLink size={11} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
