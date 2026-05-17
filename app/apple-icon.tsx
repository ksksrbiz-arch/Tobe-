import { ImageResponse } from "next/og";

// Apple touch icon — iOS home screen / Safari pinned tab.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 55%, #4A1350 100%)",
          color: "#F1BB1A",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 800,
          fontSize: 120,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
