"use client";

import { CATEGORIES } from "@/lib/sample-data";

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
      <button
        onClick={() => onSelect("all")}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          selected === "all"
            ? "bg-neutral-900 text-white shadow-sm"
            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            selected === cat.slug
              ? "bg-neutral-900 text-white shadow-sm"
              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
