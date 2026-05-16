import { ImageResponse } from "next/og";

// Brand icon used by browsers and PWAs. 512×512 PNG so the same asset can be
// reused as the maskable/manifest icon and downscaled by the browser as needed.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 320,
          letterSpacing: -12,
          lineHeight: 1,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
