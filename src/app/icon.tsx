import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  // Avoids text glyphs entirely (ImageResponse's dynamic font fetch for
  // special characters like "✦" isn't reliable offline) — a rotated square
  // reads as a sparkle/diamond mark and needs no font at all.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(120deg, #8b5cf6, #22d3ee)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 24,
            height: 24,
            background: "#05060a",
            borderRadius: 5,
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
