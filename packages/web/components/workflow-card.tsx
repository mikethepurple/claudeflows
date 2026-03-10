import Link from "next/link";
import type { Workflow } from "@/lib/types";
import DifficultyBadge from "@/components/difficulty-badge";

const CATEGORY_COLORS: Record<string, string> = {
  business: "bg-white/20 text-white",
  development: "bg-white/20 text-white",
  data: "bg-white/20 text-white",
  research: "bg-white/20 text-white",
  marketing: "bg-white/20 text-white",
  design: "bg-white/20 text-white",
  operations: "bg-white/20 text-white",
  productivity: "bg-white/20 text-white",
  finance: "bg-white/20 text-white",
};

const HERO_GRADIENTS: Record<string, string> = {
  "from-orange-500 to-red-600": "from-orange-500 to-red-600",
  "from-yellow-500 to-amber-600": "from-yellow-500 to-amber-600",
  "from-green-500 to-emerald-600": "from-green-500 to-emerald-600",
  "from-pink-500 to-rose-600": "from-pink-500 to-rose-600",
};

function fallbackGradient(name: string): string {
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-cyan-500 to-teal-600",
    "from-orange-500 to-red-600",
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

function CategoryBadge({ category }: { category: string }) {
  const colorClass =
    CATEGORY_COLORS[category] ?? "bg-white/20 text-white";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm ${colorClass}`}
    >
      {category}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-yellow-500 text-xs">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>&#9733;</span>
      ))}
      {hasHalf && <span>&#9734;</span>}
      <span className="ml-1 text-[#6B7280]">{rating.toFixed(1)}</span>
    </span>
  );
}

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const gradient =
    (workflow.heroColor && HERO_GRADIENTS[workflow.heroColor]) ||
    fallbackGradient(workflow.name);

  return (
    <Link
      href={`/w/${workflow.name}`}
      className="group block overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm transition-all duration-200 hover:border-[#E8590C]/40 hover:shadow-md hover:scale-[1.02]"
    >
      {/* Gradient hero banner */}
      <div
        className={`relative h-16 bg-gradient-to-r ${gradient} transition-all duration-200 group-hover:brightness-110`}
      >
        <div className="absolute bottom-2 left-3">
          <CategoryBadge category={workflow.category} />
        </div>
      </div>

      <div className="p-5 pt-4">
        <h3 className="mb-1 text-base font-semibold text-[#1A1A1A] group-hover:text-[#E8590C] transition-colors">
          {workflow.displayName}
        </h3>

        <p className="mb-1 text-xs text-[#9CA3AF]">
          by{" "}
          <span className="text-[#6B7280]">{workflow.author.name}</span>
        </p>

        {workflow.tagline ? (
          <p className="mb-3 text-sm font-medium text-[#374151]">
            {workflow.tagline}
          </p>
        ) : (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
            {workflow.description}
          </p>
        )}

        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {workflow.difficulty && (
            <DifficultyBadge difficulty={workflow.difficulty} />
          )}
          {workflow.estimatedTime && (
            <span className="rounded-full bg-[#F5F3F0] px-2 py-0.5 text-[10px] text-[#6B7280]">
              {workflow.estimatedTime}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-black/[0.06] pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
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
            <StarRating rating={workflow.rating} />
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
            Free
          </span>
        </div>
      </div>
    </Link>
  );
}
