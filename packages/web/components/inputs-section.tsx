import type { WorkflowInput } from "@/lib/types";

interface InputsSectionProps {
  inputs: WorkflowInput[];
  prerequisites?: string[];
}

export default function InputsSection({
  inputs,
  prerequisites,
}: InputsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {inputs.map((input) => (
        <div
          key={input.name}
          className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] p-4"
        >
          <div className="mb-1 text-sm font-medium text-[rgba(255,255,255,0.92)]">
            {input.name}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.60)]">{input.description}</p>
          {input.example && (
            <div className="mt-2 rounded-md bg-[rgba(255,255,255,0.03)] px-3 py-2 border border-[rgba(255,255,255,0.08)]">
              <span className="text-xs text-[rgba(255,255,255,0.36)]">Example: </span>
              <span className="text-xs text-[#6366F1]">
                &ldquo;{input.example}&rdquo;
              </span>
            </div>
          )}
        </div>
      ))}

      {prerequisites && prerequisites.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
            Prerequisites
          </h4>
          <ul className="flex flex-col gap-1.5">
            {prerequisites.map((prereq) => (
              <li key={prereq} className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.60)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,255,255,0.20)]" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
