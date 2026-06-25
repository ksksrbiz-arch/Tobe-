import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";
import { getCollection, getCollectionSlugs } from "@/lib/collections";

// Display host (no protocol) for the card footer.
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

// Per-collection Open Graph image so shared collection-hub links carry the
// collection name instead of the generic site card. Mirrors the per-post card
// in app/reading-room/[slug]/opengraph-image.tsx.
export const alt = "The Reading Room · To Be Read";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCollectionSlugs().map((collection) => ({ collection }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const title = getCollection(slug)?.title ?? "The Reading Room";

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
          <span>The Reading Room · To Be Read</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(241,187,26,0.18)",
              color: "#F1BB1A",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Collection
          </div>
          <div
            style={{
              fontSize: title.length > 55 ? 60 : 72,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#FFFDF9",
              maxWidth: 1000,
            }}
          >
            {title}
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
          <span>An independent used bookstore · Milwaukie, OR</span>
          <span style={{ color: "#F1BB1A", fontWeight: 700 }}>{SITE_HOST}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
