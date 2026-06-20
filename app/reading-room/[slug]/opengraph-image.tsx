import { ImageResponse } from "next/og";
import { getAllSlugs, getPost } from "@/lib/blog";

// Per-post Open Graph image (Facebook, LinkedIn, Discord, iMessage, Slack…).
// Generated statically for every post so shared article links carry the post's
// own title instead of the generic site card.
export const alt = "The Reading Room · To Be Read";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "The Reading Room";
  const tag = post?.tags[0] ?? "Reading guides";

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
            {tag}
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
          <span style={{ color: "#F1BB1A", fontWeight: 700 }}>
            to-be-read-clackamas.netlify.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
