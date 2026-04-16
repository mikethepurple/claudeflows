"use client";

const CATEGORIES = [
  { name: "All", slug: "all" },
  { name: "Business", slug: "business" },
  { name: "Research", slug: "research" },
  { name: "Development", slug: "development" },
  { name: "Marketing", slug: "marketing" },
  { name: "Operations", slug: "operations" },
] as const;

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
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            selected === cat.slug
              ? "bg-[#6366F1] text-white shadow-sm"
              : "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.60)] hover:bg-[rgba(255,255,255,0.10)] hover:text-[rgba(255,255,255,0.92)]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
