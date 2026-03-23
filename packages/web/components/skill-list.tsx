"use client";

import { useState } from "react";
import type { WorkflowSkill } from "@/lib/types";

interface SkillListProps {
  skills: WorkflowSkill[];
  workflowName: string;
}

function SkillCard({
  skill,
  workflowName,
}: {
  skill: WorkflowSkill;
  workflowName: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const command = `/${workflowName.replace(/-/g, "-")}-${skill.name}`;

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm transition-all hover:border-[#C2410C]/30 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C2410C]/10">
            <svg
              className="h-4 w-4 text-[#C2410C]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
              />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-[#171717] text-base">
              {skill.name}
            </span>
          </div>
        </div>
        <svg
          className={`h-4 w-4 text-[#9CA3AF] transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-black/[0.06] pt-3">
          <p className="mb-2 text-sm text-[#6B7280]">{skill.description}</p>
          <div className="rounded-lg bg-[#F5F5F5] px-3 py-2">
            <code className="text-xs text-[#C2410C] font-mono">{command}</code>
          </div>
        </div>
      )}

      {!expanded && (
        <p className="mt-1.5 text-xs text-[#9CA3AF]">{skill.description}</p>
      )}
    </button>
  );
}

export default function SkillList({ skills, workflowName }: SkillListProps) {
  return (
    <div className="flex flex-col gap-2">
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} workflowName={workflowName} />
      ))}
    </div>
  );
}
