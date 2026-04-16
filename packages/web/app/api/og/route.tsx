import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "ClaudeFlows").slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? "Claude Code Skills & Consulting").slice(0, 200);
  const category = (searchParams.get("category") ?? "").slice(0, 30);

  const categoryColors: Record<string, string> = {
    research: "rgb(56, 189, 248)",
    development: "rgb(99, 102, 241)",
    marketing: "rgb(251, 146, 60)",
    business: "rgb(52, 211, 153)",
    operations: "rgb(168, 162, 158)",
  };

  const accentColor = categoryColors[category] ?? "rgb(99, 102, 241)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#13111C",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Category pill */}
        {category && (
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: accentColor,
                background: `rgba(255,255,255,0.06)`,
                padding: "6px 16px",
                borderRadius: "20px",
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 30 ? "48px" : "56px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.15,
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.50)",
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.70)",
            }}
          >
            ClaudeFlows
          </span>
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.30)",
            }}
          >
            claudeflows.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
