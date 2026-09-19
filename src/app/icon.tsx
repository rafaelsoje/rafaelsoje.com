import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#090d16",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "monospace",
          fontWeight: 900,
          borderRadius: "4px",
          border: "1px solid #1e293b",
        }}
      >
        <span>rs</span>
        <span style={{ color: "#0d9488" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}

