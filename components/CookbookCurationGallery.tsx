"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChefHat, X } from "lucide-react";
import Reveal from "@/components/Reveal";

interface CookbookPhoto {
  src: string;
  caption: string;
  blurb: string;
}

const photos: CookbookPhoto[] = [
  {
    src: "/cookbooks/cookbook-shelves.jpg",
    caption: "The whole cookbook nook",
    blurb: "Freshly curated and freshly stocked — sweet, savory, and everything between.",
  },
  {
    src: "/cookbooks/world-cuisines.jpg",
    caption: "World cuisines",
    blurb: "Thai street food, Japanese garnishes, authentic French, Jewish, Turkish, and country recipes.",
  },
  {
    src: "/cookbooks/celebrity-chefs.jpg",
    caption: "Celebrity chefs & TV cooks",
    blurb: "Martha Stewart, Mark Bittman, Emeril, Food Network, Test Kitchen — the prime-time shelf.",
  },
  {
    src: "/cookbooks/healthy-and-special-diets.jpg",
    caption: "Healthy & special diets",
    blurb: "Keto, gluten-free, diabetic-friendly, juicing, plus a stack of authentic Mexican from Rick Bayless.",
  },
  {
    src: "/cookbooks/baking-and-grilling.jpg",
    caption: "Baking & grilling",
    blurb: "Cookies, cupcakes, Betty Crocker classics — and a fire-side row of grilling guides.",
  },
  {
    src: "/cookbooks/instant-pot-and-italian.jpg",
    caption: "Instant Pot & Italian",
    blurb: "Air fryer, pressure cooker, Mario Batali, Fabio Viviani, and the Cafe Cook Book.",
  },
  {
    src: "/cookbooks/drinks-and-spirits.jpg",
    caption: "Drinks & spirits",
    blurb: "Craft beer, tiki, wine, rum fever, and Caribbean party — for everything after the meal.",
  },
];

export function CookbookCurationGallery() {
  const [active, setActive] = useState<CookbookPhoto | null>(null);

  return (
    <section
      id="cookbook-curation"
      className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 90% 10%, rgba(241,187,26,0.10), transparent 40%), linear-gradient(180deg, #FDF8F0 0%, #FFFDF9 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            <ChefHat size={12} />
            Newly Curated
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Step into the new <span className="underline-accent">cookbook area</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            We just rebuilt the cookbook section from the ground up — world cuisines, celebrity chefs,
            baking, grilling, healthy living, and a drinks corner you can actually browse.
          </p>
          <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 60}
              className={i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="group relative h-full w-full overflow-hidden rounded-2xl text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1C6F]"
                style={{ minHeight: i === 0 ? "320px" : "180px" }}
                aria-label={`View larger photo: ${photo.caption}`}
              >
                {/* Below-the-fold cookbook tiles — keep them lazy so they don't
                    compete with the hero LCP, but use next/image so each <img>
                    ships with intrinsic width/height (no CLS) and a responsive
                    srcset based on the grid's responsive `sizes`. */}
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(74,19,80,0) 35%, rgba(74,19,80,0.88) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider">{photo.caption}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/85">
                    {photo.blurb}
                  </p>
                </div>
                <span
                  className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: "#F1BB1A", color: "#1a1a1a" }}
                >
                  Just curated
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{ background: "rgba(31,15,40,0.78)" }}
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-full w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photo"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#6B1C6F] shadow-md transition-colors hover:bg-white"
            >
              <X size={18} />
            </button>
            {/* Lightbox image: only mounted when the user explicitly opens it,
                so eager loading + high fetch priority is fine here. */}
            <Image
              src={active.src}
              alt={active.caption}
              width={1130}
              height={636}
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="block max-h-[70vh] w-full object-contain"
            />
            <div className="px-6 py-4">
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                {active.caption}
              </p>
              <p className="mt-1 text-sm" style={{ color: "#4B5563" }}>
                {active.blurb}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CookbookCurationGallery;
