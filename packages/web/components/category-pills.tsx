"use client";

const JOB_FUNCTIONS = [
  { name: "All", slug: "all" },
  { name: "Research", slug: "research" },
  { name: "Strategy", slug: "strategy" },
  { name: "Engineering", slug: "engineering" },
  { name: "Design", slug: "design" },
  { name: "Marketing", slug: "marketing" },
  { name: "Operations", slug: "operations" },
] as const;

/** Maps backend workflow categories to frontend job-function slugs */
const CATEGORY_TO_JOB_FUNCTION: Record<string, string> = {
  business: "strategy",
  development: "engineering",
  data: "research",
  research: "research",
  marketing: "marketing",
  design: "design",
  operations: "operations",
  productivity: "operations",
  finance: "strategy",
};

export function mapCategoryToJobFunction(category: string): string {
  return CATEGORY_TO_JOB_FUNCTION[category] ?? "operations";
}

interface CategoryPillsProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryPills({
  selected,
  onSelect,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {JOB_FUNCTIONS.map((jf) => (
        <button
          key={jf.slug}
          onClick={() => onSelect(jf.slug)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            selected === jf.slug
              ? "bg-neutral-900 text-white shadow-sm"
              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
          }`}
        >
          {jf.name}
        </button>
      ))}
    </div>
  );
}
