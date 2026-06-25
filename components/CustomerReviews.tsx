"use client";

import React, { useEffect, useState } from "react";
import { Star, Quote, ExternalLink } from "lucide-react";
import {
  type ExternalReview,
  FACEBOOK_REVIEWS,
  FACEBOOK_REVIEWS_URL,
  GOOGLE_REVIEWS_URL,
} from "@/lib/external-reviews";

// lucide-react has no Facebook glyph; reuse the brand SVG used elsewhere
// (Footer / ConnectSection). `size` keeps the call sites lucide-like.
function FacebookGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface ReviewsPayload {
  configured: boolean;
  placeName: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  reviews: ExternalReview[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i < Math.round(rating) ? "#F1BB1A" : "transparent"}
          style={{ color: "#F1BB1A" }}
        />
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: ExternalReview["source"] }) {
  if (source === "facebook") {
    return (
      <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#0C5EC9" }}>
        <FacebookGlyph size={12} /> Facebook
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
      <span aria-hidden="true" className="font-bold" style={{ color: "#4285F4" }}>
        G
      </span>
      Google
    </span>
  );
}

function ReviewCard({ review }: { review: ExternalReview }) {
  const initial = review.author.trim().charAt(0).toUpperCase() || "★";
  return (
    <div
      className="relative flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <Quote
        aria-hidden="true"
        size={32}
        className="absolute right-4 top-4 opacity-15"
        style={{ color: "#F1BB1A" }}
      />
      <StarRow rating={review.rating} />
      <p className="mb-5 mt-3 text-sm leading-relaxed line-clamp-6" style={{ color: "#374151" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div
        className="mt-auto flex items-center gap-3 border-t pt-4"
        style={{ borderColor: "rgba(107,28,111,0.08)" }}
      >
        {review.photoUri ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photoUri}
            alt={review.author}
            className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "#6B1C6F" }}>
            {review.author}
          </p>
          <div className="flex items-center gap-1.5">
            {review.relativeTime && (
              <span className="text-xs" style={{ color: "#6B7280" }}>
                {review.relativeTime} ·
              </span>
            )}
            <SourceBadge source={review.source} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interleave the two sources so both show up in the first row when present. */
function mix(google: ExternalReview[], facebook: ExternalReview[]): ExternalReview[] {
  const out: ExternalReview[] = [];
  const max = Math.max(google.length, facebook.length);
  for (let i = 0; i < max; i++) {
    if (facebook[i]) out.push(facebook[i]);
    if (google[i]) out.push(google[i]);
  }
  return out;
}

export default function CustomerReviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then(async (res) => {
        const payload = await res.json();
        if (!cancelled && res.ok) setData(payload as ReviewsPayload);
      })
      .catch(() => {
        /* Google may be unavailable; we still render Facebook reviews + links. */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl"
            style={{ background: "rgba(107,28,111,0.06)" }}
          />
        ))}
      </div>
    );
  }

  const googleReviews = data?.reviews?.filter((r) => r.source === "google") ?? [];
  const rating = data?.rating ?? null;
  const userRatingCount = data?.userRatingCount ?? null;
  const googleMapsUri = data?.googleMapsUri ?? GOOGLE_REVIEWS_URL;

  const cards = mix(googleReviews, FACEBOOK_REVIEWS).slice(0, 6);

  return (
    <div>
      <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
        {(rating != null || userRatingCount != null) && (
          <div className="flex items-center gap-2">
            <StarRow rating={rating ?? 5} />
            <span className="text-sm font-bold" style={{ color: "#6B1C6F" }}>
              {rating != null ? rating.toFixed(1) : "—"}
            </span>
            {userRatingCount != null && (
              <span className="text-xs" style={{ color: "#6B7280" }}>
                · {userRatingCount} Google reviews
              </span>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#6B1C6F" }}
          >
            Read reviews on Google <ExternalLink size={11} />
          </a>
          <a
            href={FACEBOOK_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#0C5EC9" }}
          >
            <FacebookGlyph size={12} /> Reviews on Facebook
          </a>
        </div>
      </div>

      {cards.length === 0 ? (
        <p className="text-center text-sm" style={{ color: "#6B7280" }}>
          Catch our latest reviews on{" "}
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: "#6B1C6F" }}
          >
            Google
          </a>{" "}
          and{" "}
          <a
            href={FACEBOOK_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: "#0C5EC9" }}
          >
            Facebook
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((r, i) => (
            <ReviewCard key={`${r.source}-${r.author}-${i}`} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
