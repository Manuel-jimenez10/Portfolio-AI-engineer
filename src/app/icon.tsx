import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  // Built from positioned boxes rather than text or SVG paths: ImageResponse
  // resolves fonts over the network, so a glyph-based mark can fail offline.
  const ear = {
    position: "absolute" as const,
    top: 14,
    width: 13,
    height: 30,
    borderRadius: 7,
    background: "#b9743a",
  };
  const eye = {
    width: 6,
    height: 7,
    borderRadius: 3,
    background: "#2a1c12",
  };

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
          background: "#2563eb",
          position: "relative",
        }}
      >
        <div style={{ ...ear, left: 6 }} />
        <div style={{ ...ear, right: 6 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            width: 40,
            height: 38,
            borderRadius: 19,
            background: "#e8a866",
            position: "relative",
          }}
        >
          <div style={eye} />
          <div style={eye} />
          <div
            style={{
              position: "absolute",
              bottom: 5,
              width: 16,
              height: 11,
              borderRadius: 6,
              background: "#f7dcb8",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
