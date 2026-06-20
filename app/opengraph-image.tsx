import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";

// Display host (no protocol) for the card footer.
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

// Open Graph image used by Facebook, LinkedIn, Discord, iMessage, etc.
// 1200×630 is the spec-recommended size.
export const alt =
  "To Be Read – Clackamas Book Exchange. Your neighborhood used bookstore in Milwaukie, Oregon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 12% 18%, rgba(241,187,26,0.22), transparent 42%), radial-gradient(circle at 90% 90%, rgba(139,46,144,0.55), transparent 42%), linear-gradient(135deg, #4A1350 0%, #6B1C6F 60%, #2A0930 100%)",
          color: "#FFFDF9",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#F1BB1A",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#F1BB1A",
              color: "#4A1350",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 800,
              fontSize: 44,
              lineHeight: 1,
            }}
          >
            T
          </div>
          <span>To Be Read · TBR</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#FFFDF9",
            }}
          >
            Clackamas Book Exchange
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "rgba(255,253,249,0.85)",
              fontFamily: "Helvetica, Arial, sans-serif",
              maxWidth: 980,
            }}
          >
            A 45-year-old beloved used bookstore in Milwaukie, OR. Trade books
            for store credit, shop online, visit us!
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 22,
            color: "rgba(255,253,249,0.85)",
          }}
        >
          <span>7931 SE King Rd, Ste 1 · Milwaukie, OR</span>
          <span style={{ color: "#F1BB1A", fontWeight: 700 }}>
            {SITE_HOST}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
