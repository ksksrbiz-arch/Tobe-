import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";

const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

// Open Graph image for the Summer Reading Programs landing page. 1200×630 is the
// spec-recommended size. Sunny palette echoes the in-store flyer.
export const alt =
  "Summer Reading Programs at To Be Read — free summer reading for kids and teens in Milwaukie, Oregon. July 1 to August 21, 2026.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SummerReadingOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background:
            "radial-gradient(circle at 14% 16%, rgba(255,255,255,0.55), transparent 38%), radial-gradient(circle at 88% 12%, rgba(251,191,90,0.9), transparent 42%), linear-gradient(135deg, #FBD24E 0%, #F7A93B 52%, #F0823B 100%)",
          color: "#5A2A12",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#6B1C6F",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "#6B1C6F",
              color: "#F1BB1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 800,
              fontSize: 40,
              lineHeight: 1,
            }}
          >
            T
          </div>
          <span>To Be Read · Milwaukie, OR</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.92)",
              color: "#B11668",
              borderRadius: 24,
              padding: "14px 30px",
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Summer Reading Programs
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              fontWeight: 600,
              color: "#5A2A12",
              maxWidth: 900,
            }}
          >
            Two free programs for kids &amp; teens — the Reading Circle and the
            Reading Challenge. July 1 – August 21, 2026.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#6B1C6F" }}>Free &amp; open to all · No registration</span>
          <span style={{ color: "#7A3A18" }}>{SITE_HOST}/events/summer-reading</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
