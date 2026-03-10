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
            ? "bg-[#E8590C] text-white shadow-sm"
            : "bg-[#F5F3F0] text-[#6B7280] hover:bg-[#E8590C]/10 hover:text-[#E8590C]"
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
              ? "bg-[#E8590C] text-white shadow-sm"
              : "bg-[#F5F3F0] text-[#6B7280] hover:bg-[#E8590C]/10 hover:text-[#E8590C]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
