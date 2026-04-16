const DIFFICULTY_CONFIG = {
  beginner: {
    label: "Beginner",
    color: "bg-[rgba(16,185,129,0.15)] text-[#10B981]",
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]",
  },
  advanced: {
    label: "Advanced",
    color: "bg-[rgba(239,68,68,0.15)] text-[#EF4444]",
  },
} as const;

interface DifficultyBadgeProps {
  difficulty: "beginner" | "intermediate" | "advanced";
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}
