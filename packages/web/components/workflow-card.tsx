import Link from "next/link";
import type { Workflow } from "@/lib/types";

/* ─── Category Icons ───
   Monochrome SVGs — distinguished by SHAPE, not color.
   Eye grabs shape faster than reading text. */

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  research: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.5 13.5L17 17" strokeLinecap="round" />
      <path d="M7 9h4M9 7v4" strokeLinecap="round" opacity={0.5} />
    </svg>
  ),
  development: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M7 5L3 10l4 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3L9 17" strokeLinecap="round" opacity={0.4} />
    </svg>
  ),
  marketing: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 10h2l2-4 3 8 2-4h3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="10" r="1" fill="currentColor" opacity={0.4} />
    </svg>
  ),
  business: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="14" height="14" rx="2" opacity={0.3} />
      <path d="M6 14V9M10 14V6M14 14V8" strokeLinecap="round" strokeWidth={2} />
    </svg>
  ),
  operations: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="10" cy="10" r="3" />
      <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" strokeLinecap="round" />
    </svg>
  ),
  design: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M10 3l2 5h5l-4 3.5 1.5 5.5L10 14l-4.5 3 1.5-5.5L3 8h5l2-5z" strokeLinejoin="round" />
    </svg>
  ),
  data: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="10" cy="6" rx="6" ry="2.5" />
      <path d="M4 6v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V6" />
      <path d="M4 10v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V10" opacity={0.5} />
    </svg>
  ),
  productivity: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M11 3L5 11h4l-1 6 6-8h-4l1-6z" strokeLinejoin="round" />
    </svg>
  ),
  finance: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 17L7 10l3 4 4-8 3 5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="11" r="1.5" fill="currentColor" opacity={0.3} />
    </svg>
  ),
};

function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category] ?? CATEGORY_ICONS["operations"];
}

/* ─── Category Tints ───
   Very muted — 0.08 bg, 0.55 icon/text. Whispers, not shouts.
   On hover, everything shifts to accent indigo. */
const CATEGORY_TINTS: Record<string, { bg: string; fg: string }> = {
  research:     { bg: "rgba(56, 189, 248, 0.08)",  fg: "rgba(56, 189, 248, 0.55)" },   // sky
  development:  { bg: "rgba(99, 102, 241, 0.08)",  fg: "rgba(99, 102, 241, 0.55)" },   // indigo
  marketing:    { bg: "rgba(251, 146, 60, 0.08)",  fg: "rgba(251, 146, 60, 0.55)" },   // amber
  business:     { bg: "rgba(52, 211, 153, 0.08)",  fg: "rgba(52, 211, 153, 0.55)" },   // emerald
  operations:   { bg: "rgba(168, 162, 158, 0.08)", fg: "rgba(168, 162, 158, 0.55)" },  // stone
  design:       { bg: "rgba(244, 114, 182, 0.08)", fg: "rgba(244, 114, 182, 0.55)" },  // pink
  data:         { bg: "rgba(139, 92, 246, 0.08)",  fg: "rgba(139, 92, 246, 0.55)" },   // violet
  productivity: { bg: "rgba(250, 204, 21, 0.08)",  fg: "rgba(250, 204, 21, 0.55)" },   // yellow
  finance:      { bg: "rgba(52, 211, 153, 0.08)",  fg: "rgba(52, 211, 153, 0.55)" },   // emerald (same as business)
};

function getCategoryTint(category: string) {
  return CATEGORY_TINTS[category] ?? CATEGORY_TINTS["operations"];
}

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const price = (workflow as any).price;
  const isFree = !price || price === 0;

  const tint = getCategoryTint(workflow.category);

  return (
    <Link
      href={`/w/${workflow.name}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] transition-all duration-150 hover:border-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.20),0_8px_32px_rgba(99,102,241,0.08)]"
    >
      <div className="flex flex-1 flex-col p-5">
        {/* Row 1: Icon + Category */}
        <div className="mb-4 flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            style={{ backgroundColor: tint.bg, color: tint.fg }}
          >
            {getCategoryIcon(workflow.category)}
          </span>
          <span
            className="text-[11px] font-medium uppercase tracking-wider"
            style={{ color: tint.fg }}
          >
            {workflow.category}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3 className="mb-1 text-[15px] font-semibold text-[rgba(255,255,255,0.92)] leading-snug">
          {workflow.displayName}
        </h3>

        {/* Row 3: CLI command — unique fingerprint */}
        <p className="mb-3 font-mono text-[11px] text-[rgba(255,255,255,0.25)] tracking-tight">
          claudeflows install {workflow.name}
        </p>

        {/* Row 4: Outcome tagline — the scannable element */}
        {workflow.tagline ? (
          <p className="mb-auto text-[13px] text-[rgba(255,255,255,0.60)] leading-relaxed">
            {workflow.tagline}
          </p>
        ) : (
          <p className="mb-auto line-clamp-2 text-[13px] leading-relaxed text-[rgba(255,255,255,0.60)]">
            {workflow.description}
          </p>
        )}

        {/* Row 5: Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
          <div className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.30)]">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span>{workflow.installs.toLocaleString()}</span>
          </div>
          {isFree ? (
            <span className="rounded-md bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[11px] font-medium text-[#10B981]">
              Free
            </span>
          ) : (
            <span className="text-[15px] font-semibold text-[rgba(255,255,255,0.92)]">
              ${price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
