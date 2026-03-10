const DIFFICULTY_CONFIG = {
  beginner: {
    label: "Beginner",
    color: "bg-green-100 text-green-700",
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-yellow-100 text-yellow-700",
  },
  advanced: {
    label: "Advanced",
    color: "bg-red-100 text-red-700",
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
