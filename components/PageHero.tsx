// Server Component: purely presentational (string props, CSS animations, a
// native anchor for the scroll control). Reused across many page heroes, so
// rendering it server-side removes that hydration everywhere it appears.
import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  imageUrl: string;
  scrollTargetId?: string;
}

export default function PageHero({
  title,
  subtitle,
  badge,
  imageUrl,
  scrollTargetId,
}: PageHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(24rem, 58vh, 42rem)",
      }}
    >
      {/* Deep purple base — sits beneath everything so we never see white flash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, var(--purple-light) 0%, var(--purple) 35%, var(--purple-dark) 70%, var(--purple-deep) 100%)",
        }}
      />

      {/* Background image — heavily desaturated and softened so faces/people read
          as texture, not portraits. Rendered via next/image with `priority` so
          it's optimized (AVIF/WebP, sized) and preloaded for a faster LCP. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ mixBlendMode: "overlay", opacity: 0.55 }}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            transform: "scale(1.08)",
            filter: "saturate(0.55) brightness(0.7) contrast(1.05) blur(2px)",
          }}
        />
      </div>

      {/* Primary purple gradient overlay — opaque enough to dominate any underlying photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--purple-deep) 95%, transparent) 0%, color-mix(in srgb, var(--purple-dark) 92%, transparent) 35%, color-mix(in srgb, var(--purple) 88%, transparent) 70%, color-mix(in srgb, var(--purple-light) 88%, transparent) 100%)",
        }}
      />

      {/* Warm gold-on-purple glow for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 110%, color-mix(in srgb, var(--gold) 18%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--gold) 10%, transparent) 0%, transparent 50%)",
        }}
      />

      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.85), transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.85), transparent 75%)",
        }}
      />

      {/* Soft floats */}
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -left-10 top-10 h-56 w-56 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gold)" }}
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -right-10 bottom-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--purple-light)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 pb-10 pt-24 text-center sm:px-6 sm:pt-28 lg:pt-32">
        {badge && (
          <span
            className="eyebrow-glow fade-in-up mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] shadow-md"
            style={{ background: "var(--gold)", color: "#1a1a1a" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--purple)" }} />
            {badge}
          </span>
        )}
        <h1
          className="fade-in-up mb-4 font-bold text-white"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.2rem, 6.5vw, 4rem)",
            lineHeight: 1.05,
            animationDelay: "100ms",
            textShadow: "0 4px 30px rgba(0,0,0,0.30)",
          }}
        >
          {title}
        </h1>
        <p
          className="fade-in-up max-w-xl text-balance text-white/90"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            lineHeight: 1.6,
            animationDelay: "200ms",
          }}
        >
          {subtitle}
        </p>
        <div
          className="accent-bar fade-in-up mt-5 h-1 w-16 rounded-full"
          style={{ animationDelay: "260ms" }}
        />
      </div>

      {/* Bottom curve */}
      <svg
        aria-hidden="true"
        className="absolute -bottom-px left-0 right-0 w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ height: 60, color: "var(--background)" }}
      >
        <path
          d="M0,40 C240,80 480,0 720,32 C960,64 1200,80 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>

      {scrollTargetId && (
        <a
          href={`#${scrollTargetId}`}
          className="touch-target animate-float absolute bottom-12 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/30 sm:bottom-16"
          aria-label="Scroll to content"
        >
          <ChevronDown size={20} />
        </a>
      )}
    </div>
  );
}
