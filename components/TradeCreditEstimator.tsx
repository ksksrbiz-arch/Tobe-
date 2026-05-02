"use client";

import React, { useState, useCallback } from "react";
import { Printer, Search, RefreshCw, Receipt, AlertCircle } from "lucide-react";

const SWAP_TIERS = [
  { max: 10, fee: 1, label: "$10 or under" },
  { max: 19, fee: 2, label: "$11 – $19" },
  { max: Infinity, fee: 3, label: "$20 and up" },
];

function getSwapFee(listPrice: number): { fee: number; label: string } {
  for (const tier of SWAP_TIERS) {
    if (listPrice <= tier.max) return { fee: tier.fee, label: tier.label };
  }
  return { fee: 3, label: "$20 and up" };
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

interface BookInfo {
  title: string;
  author: string;
  listPrice: number;
  coverUrl?: string;
  source: "isbn" | "manual";
  // Server-computed values; absent for manual entries (computed client-side from listPrice).
  credit?: number;
  swapFee?: number;
  swapTierLabel?: string;
  netCredit?: number;
}

export default function TradeCreditEstimator() {
  const [mode, setMode] = useState<"price" | "isbn">("price");
  const [priceInput, setPriceInput] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState<BookInfo | null>(null);

  const reset = () => {
    setBook(null);
    setError("");
  };

  const lookupISBN = useCallback(async (isbn: string) => {
    const clean = isbn.replace(/[-\s]/g, "");
    if (!/^\d{10}(\d{3})?$/.test(clean)) {
      setError("Please enter a valid ISBN — 10 or 13 digits (hyphens are OK, e.g. 978-0-06-112008-4).");
      return;
    }
    setLoading(true);
    setError("");
    setBook(null);
    try {
      const res = await fetch(`/api/credit-estimate?isbn=${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Couldn't estimate credit for that ISBN.");
        return;
      }
      setBook({
        title: data.title,
        author: data.author,
        listPrice: data.listPrice,
        coverUrl: data.coverUrl ?? undefined,
        source: "isbn",
        credit: data.credit,
        swapFee: data.swapFee,
        swapTierLabel: data.swapTierLabel,
        netCredit: data.netCredit,
      });
    } catch {
      setError("Couldn't reach the estimator. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleManualPrice = useCallback(() => {
    const val = parseFloat(priceInput.replace(/[^0-9.]/g, ""));
    if (isNaN(val) || val <= 0) {
      setError("Please enter a valid dollar amount.");
      return;
    }
    setError("");
    setBook({
      title: "Your Book",
      author: "",
      listPrice: val,
      source: "manual",
    });
  }, [priceInput]);

  const result = book
    ? book.credit != null && book.swapFee != null && book.swapTierLabel != null
      ? { credit: book.credit, fee: book.swapFee, label: book.swapTierLabel }
      : { credit: book.listPrice * 0.25, ...getSwapFee(book.listPrice) }
    : null;

  return (
    <div
      className="mx-auto max-w-xl rounded-[28px] border-2 p-7 shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
        borderColor: "rgba(107,28,111,0.18)",
        boxShadow: "0 20px 60px rgba(107,28,111,0.12)",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
        >
          <Receipt size={20} className="text-white" />
        </div>
        <div>
          <h3
            className="font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontSize: "1.15rem" }}
          >
            Trade Credit Estimator
          </h3>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            See your instant credit before you walk in
          </p>
        </div>
      </div>

      {/* Mode toggle */}
      <div
        className="mb-5 flex rounded-xl p-1"
        style={{ background: "rgba(107,28,111,0.07)" }}
      >
        {(["price", "isbn"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className="flex-1 rounded-lg py-2 text-sm font-semibold transition-all"
            style={{
              background: mode === m ? "#6B1C6F" : "transparent",
              color: mode === m ? "white" : "#6B1C6F",
            }}
          >
            {m === "price" ? "Enter List Price" : "Look Up ISBN"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {mode === "price" ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold"
              style={{ color: "#6B1C6F" }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="12.99"
              value={priceInput}
              onChange={(e) => { setPriceInput(e.target.value); reset(); }}
              onKeyDown={(e) => e.key === "Enter" && handleManualPrice()}
              className="w-full rounded-xl border py-3 pl-7 pr-4 text-sm font-medium outline-none transition-all focus:ring-2"
              style={{
                borderColor: "rgba(107,28,111,0.18)",
                color: "#1F1A2E",
                background: "white",
              }}
            />
          </div>
          <button
            onClick={handleManualPrice}
            className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            <RefreshCw size={14} />
            Calculate
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="978-0-06-112008-4"
            value={isbnInput}
            onChange={(e) => { setIsbnInput(e.target.value); reset(); }}
            onKeyDown={(e) => e.key === "Enter" && lookupISBN(isbnInput)}
            maxLength={17}
            className="flex-1 rounded-xl border py-3 px-4 text-sm font-medium outline-none transition-all focus:ring-2"
            style={{
              borderColor: "rgba(107,28,111,0.18)",
              color: "#1F1A2E",
              background: "white",
            }}
          />
          <button
            onClick={() => lookupISBN(isbnInput)}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            {loading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Search size={14} />
            )}
            Look Up
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-sm"
          style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)", color: "#B91C1C" }}
        >
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Receipt output */}
      {result && book && (
        <div
          className="mt-5 rounded-2xl border p-5"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            background: "white",
            borderColor: "rgba(107,28,111,0.14)",
            boxShadow: "0 8px 28px rgba(107,28,111,0.08)",
          }}
        >
          {/* Receipt header */}
          <div className="mb-3 border-b pb-3 text-center" style={{ borderColor: "rgba(107,28,111,0.10)", borderStyle: "dashed" }}>
            <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#6B7280" }}>
              To Be Read · Clackamas Book Exchange
            </p>
            <p className="text-[9px] uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
              Trade Credit Estimate
            </p>
          </div>

          {/* Book info */}
          <div className="mb-4 flex items-start gap-3">
            {book.coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.coverUrl}
                alt={book.title}
                className="h-16 w-11 rounded object-cover flex-shrink-0"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold" style={{ color: "#1F1A2E" }}>
                {book.title}
              </p>
              {book.author && (
                <p className="text-[11px]" style={{ color: "#6B7280" }}>
                  {book.author}
                </p>
              )}
            </div>
          </div>

          {/* Line items */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>List price</span>
              <span className="font-bold" style={{ color: "#1F1A2E" }}>{fmt(book.listPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>Credit yield (25%)</span>
              <span className="font-bold" style={{ color: "#22c55e" }}>+ {fmt(result.credit)}</span>
            </div>
            <div
              className="flex justify-between border-t pt-2"
              style={{ borderColor: "rgba(107,28,111,0.10)", borderStyle: "dashed" }}
            >
              <span style={{ color: "#6B7280" }}>Swap fee tier</span>
              <span style={{ color: "#6B7280" }}>{result.label}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>Swap fee</span>
              <span className="font-bold" style={{ color: "#F1BB1A" }}>– {fmt(result.fee)}</span>
            </div>

            <div
              className="flex justify-between rounded-lg px-3 py-2.5 border-t mt-1 pt-3"
              style={{
                background: "linear-gradient(135deg, rgba(107,28,111,0.06), rgba(241,187,26,0.08))",
                borderColor: "rgba(107,28,111,0.12)",
                borderStyle: "dashed",
              }}
            >
              <span className="font-bold uppercase tracking-wider text-[11px]" style={{ color: "#6B1C6F" }}>
                Net credit
              </span>
              <span
                className="font-bold text-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                {fmt(Math.max(0, result.credit - result.fee))}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-4 border-t pt-3 text-center text-[9px] uppercase tracking-widest"
            style={{ borderColor: "rgba(107,28,111,0.10)", borderStyle: "dashed", color: "#9CA3AF" }}
          >
            <Printer size={10} className="mb-1 inline-block" /> Estimate only · Actual credit subject to condition review
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-4 text-center text-[10px] leading-4" style={{ color: "#9CA3AF" }}>
        Credit is issued as store credit, not cash. Final amount may vary based on book condition and staff review.
      </p>
    </div>
  );
}
