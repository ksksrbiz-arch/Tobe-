import React from "react";
import Link from "next/link";
import { Star, Quote, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ReviewForm from "@/components/ReviewForm";
import { SITE_URL, breadcrumbList } from "@/lib/seo";
import { getApprovedReviews, aggregate } from "@/lib/reviews";
import type { Review } from "@/lib/db";

// Statically prerendered with ISR — newly approved reviews (and their Review /
// AggregateRating structured data) appear within a few minutes.
export const revalidate = 300;

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.round(rating) ? "#F1BB1A" : "transparent"}
          style={{ color: "#F1BB1A" }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.author_name.trim().charAt(0).toUpperCase() || "R";
  return (
    <article
      className="relative flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{ borderColor: "rgba(107,28,111,0.10)", boxShadow: "var(--shadow-sm)" }}
    >
      <Quote
        aria-hidden="true"
        size={32}
        className="absolute right-4 top-4 opacity-15"
        style={{ color: "#F1BB1A" }}
      />
      <StarRow rating={review.rating} />
      {review.title && (
        <h3 className="mb-1 mt-3 text-base font-bold" style={{ color: "#6B1C6F" }}>
          {review.title}
        </h3>
      )}
      <p
        className={`mb-5 text-sm leading-relaxed ${review.title ? "mt-0" : "mt-3"}`}
        style={{ color: "#374151" }}
      >
        &ldquo;{review.body}&rdquo;
      </p>
      <div
        className="mt-auto flex items-center gap-3 border-t pt-4"
        style={{ borderColor: "rgba(107,28,111,0.08)" }}
      >
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold" style={{ color: "#6B1C6F" }}>
            {review.author_name}
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            {formatDate(review.created_at)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const { count, average } = aggregate(reviews);

  // Review + AggregateRating structured data, attached to the BookStore entity.
  // Only emitted once there's at least one approved first-party review, so the
  // markup always reflects real reviews collected directly on this site.
  const reviewsJsonLd =
    count > 0 && average != null
      ? {
          "@context": "https://schema.org",
          "@type": "BookStore",
          "@id": `${SITE_URL}/#bookstore`,
          name: "Clackamas Book Exchange (To Be Read)",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average.toFixed(1),
            reviewCount: String(count),
            bestRating: "5",
            worstRating: "1",
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author_name },
            datePublished: r.created_at.slice(0, 10),
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(r.rating),
              bestRating: "5",
              worstRating: "1",
            },
            ...(r.title ? { name: r.title } : {}),
            reviewBody: r.body,
          })),
        }
      : null;

  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <JsonLd data={breadcrumbList([{ name: "Reviews", path: "/reviews" }])} />
      {reviewsJsonLd && <JsonLd data={reviewsJsonLd} />}

      <Navbar />
      <PageHero
        title="Reader Reviews"
        subtitle="What neighbors and fellow book-lovers say about To Be Read."
        badge="Reviews"
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
        scrollTargetId="reviews-list"
      />

      <section
        id="reviews-list"
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(107,28,111,0.08), transparent 38%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Star size={12} />
              From our readers
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
              }}
            >
              What readers <span className="underline-accent">are saying</span>
            </h2>

            {count > 0 && average != null ? (
              <div className="mt-4 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <StarRow rating={average} size={18} />
                  <span className="text-base font-bold" style={{ color: "#6B1C6F" }}>
                    {average.toFixed(1)}
                  </span>
                  <span className="text-sm" style={{ color: "#6B7280" }}>
                    · {count} {count === 1 ? "review" : "reviews"}
                  </span>
                </div>
              </div>
            ) : (
              <p
                className="mx-auto max-w-xl text-sm leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                Be the first to leave a review — we&apos;d love to hear about your visit.
              </p>
            )}
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          {reviews.length > 0 && (
            <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 80}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
          )}

          {/* Submission form */}
          <Reveal>
            <div id="leave-a-review" className="mx-auto max-w-2xl scroll-mt-24">
              <ReviewForm />
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div
              className="mt-12 flex flex-col items-stretch gap-4 rounded-2xl p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
              style={{
                background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
                color: "white",
                boxShadow: "0 18px 40px rgba(107,28,111,0.20)",
              }}
            >
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <MapPin size={22} style={{ color: "#F1BB1A" }} className="flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold leading-snug">
                    7931 SE King Rd, Unit 1, Portland, OR 97222
                  </p>
                  <p className="text-xs opacity-80">Open Mon–Sat · 10am – 5pm · Free parking</p>
                </div>
              </div>
              <Link
                href="/visit"
                className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-[0.98] sm:w-auto"
                style={{ background: "#F1BB1A", color: "#1a1a1a" }}
              >
                Plan your visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
