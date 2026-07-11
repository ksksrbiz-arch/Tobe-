import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Home, MapPin, Repeat, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookLogo from "@/components/BookLogo";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page seems to have wandered off the shelf. Find your way back to To Be Read.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: BookOpen },
  { href: "/visit", label: "Visit", icon: MapPin },
  { href: "/trade", label: "Trade", icon: Repeat },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
];

export default function NotFound() {
  return (
    <main id="main">
      <Navbar />
      <section
        className="viewport-min-height relative flex items-center justify-center overflow-hidden px-4 pb-16 pt-[calc(var(--header-offset,_6.75rem)+2rem)]"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--gold) 16%, transparent), transparent 34%), radial-gradient(circle at 85% 18%, color-mix(in srgb, var(--purple) 16%, transparent), transparent 32%), linear-gradient(135deg, var(--paper) 0%, #FFF7EC 38%, #F7F0FF 100%)",
        }}
      >
        <div
          className="card-cozy relative z-10 mx-auto w-full max-w-2xl rounded-[32px] border px-6 py-12 text-center backdrop-blur-md sm:px-10 sm:py-14"
          style={{
            background: "rgba(255,255,255,0.78)",
            borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <div className="mb-6 flex justify-center">
            <div className="lamp-glow magical-glow relative">
              <BookLogo size={120} showText={false} className="animate-float-slow" />
            </div>
          </div>

          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--purple)" }}
          >
            Error 404
          </p>
          <h1
            className="display-shadow mb-3 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--purple)",
              fontSize: "clamp(2rem, 7vw, 3.4rem)",
              lineHeight: 1.05,
            }}
          >
            This page wandered{" "}
            <span className="text-gradient" style={{ fontStyle: "italic" }}>
              off the shelf
            </span>
          </h1>
          <p
            className="mx-auto mb-8 max-w-md text-balance"
            style={{ color: "var(--muted)", fontSize: "clamp(0.98rem, 2vw, 1.08rem)", lineHeight: 1.7 }}
          >
            We couldn&apos;t find the page you were looking for — but there&apos;s plenty more to
            browse. Here&apos;s where to head next.
          </p>

          <nav aria-label="Helpful links" className="flex flex-wrap justify-center gap-2.5">
            {links.map(({ href, label, icon: Icon }, i) => (
              <Link
                key={href}
                href={href}
                className={`touch-target inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-[0.98] ${
                  i === 0 ? "btn-warm text-white" : ""
                }`}
                style={
                  i === 0
                    ? { background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)", boxShadow: "var(--shadow-md)" }
                    : {
                        background: "rgba(255,255,255,0.8)",
                        color: "var(--purple)",
                        border: "1px solid color-mix(in srgb, var(--purple) 14%, transparent)",
                      }
                }
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <Footer />
    </main>
  );
}
