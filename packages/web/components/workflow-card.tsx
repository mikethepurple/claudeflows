import Link from "next/link";
import type { Workflow } from "@/lib/types";
import DifficultyBadge from "@/components/difficulty-badge";

const CATEGORY_ICONS: Record<string, string> = {
  business: "briefcase",
  development: "code",
  research: "search",
  marketing: "megaphone",
  data: "database",
  design: "palette",
  operations: "server",
  productivity: "zap",
  finance: "chart",
};

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">
      {category}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400 text-xs">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>&#9733;</span>
      ))}
      {hasHalf && <span>&#9734;</span>}
      <span className="ml-1 text-neutral-400">{rating.toFixed(1)}</span>
    </span>
  );
}

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link
      href={`/w/${workflow.name}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
    >
      {/* Subtle top accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-700/60 to-orange-700/20" />

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <CategoryTag category={workflow.category} />
          {workflow.difficulty && (
            <DifficultyBadge difficulty={workflow.difficulty} />
          )}
        </div>

        <h3 className="mb-1 text-base font-semibold text-neutral-900 group-hover:text-orange-800 transition-colors">
          {workflow.displayName}
        </h3>

        <p className="mb-1 text-xs text-neutral-400">
          by{" "}
          <span className="text-neutral-500">{workflow.author.name}</span>
        </p>

        {workflow.tagline ? (
          <p className="mb-3 text-sm text-neutral-600 leading-relaxed">
            {workflow.tagline}
          </p>
        ) : (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {workflow.description}
          </p>
        )}

        {workflow.estimatedTime && (
          <p className="mb-3 text-xs text-neutral-400">
            {workflow.estimatedTime}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-neutral-400">
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
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            Free
          </span>
        </div>
      </div>
    </Link>
  );
}
