"use client";

import React, { useEffect, useState } from "react";
import { Star, Quote, ExternalLink } from "lucide-react";

interface GoogleReview {
  rating: number;
  text: string;
  author: string;
  photoUri?: string;
  relativeTime: string;
}

interface ReviewsPayload {
  configured: boolean;
  placeName: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  reviews: GoogleReview[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
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

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.author.trim().charAt(0).toUpperCase() || "G";
  return (
    <div
      className="relative flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
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
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold" style={{ color: "#6B1C6F" }}>
            {review.author}
          </p>
          {review.relativeTime && (
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              {review.relativeTime} · Google
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then(async (res) => {
        const payload = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(payload?.error ?? "Couldn't load reviews.");
        } else {
          setData(payload as ReviewsPayload);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load reviews.");
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

  if (error || !data) {
    return (
      <p className="text-center text-sm" style={{ color: "#6B7280" }}>
        Reviews are taking a moment to load. Catch them on{" "}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Clackamas+Book+Exchange+Milwaukie+OR"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
          style={{ color: "#6B1C6F" }}
        >
          Google
        </a>{" "}
        in the meantime.
      </p>
    );
  }

  const { rating, userRatingCount, googleMapsUri, reviews } = data;
  const reviewLink =
    googleMapsUri ??
    "https://www.google.com/maps/search/?api=1&query=Clackamas+Book+Exchange+Milwaukie+OR";

  return (
    <div>
      {(rating != null || userRatingCount != null) && (
        <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
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
          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#6B1C6F" }}
          >
            View all on Google <ExternalLink size={11} />
          </a>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-sm" style={{ color: "#6B7280" }}>
          Live review excerpts will appear here once the Google Places integration is enabled.{" "}
          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: "#6B1C6F" }}
          >
            Read all {userRatingCount ?? ""} reviews on Google
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
