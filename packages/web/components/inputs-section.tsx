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
          className="rounded-lg border border-black/[0.06] bg-[#F5F5F5] p-4"
        >
          <div className="mb-1 text-sm font-medium text-[#171717]">
            {input.name}
          </div>
          <p className="text-xs text-[#6B7280]">{input.description}</p>
          {input.example && (
            <div className="mt-2 rounded-md bg-white px-3 py-2 border border-black/[0.04]">
              <span className="text-xs text-[#9CA3AF]">Example: </span>
              <span className="text-xs text-[#C2410C]">
                &ldquo;{input.example}&rdquo;
              </span>
            </div>
          )}
        </div>
      ))}

      {prerequisites && prerequisites.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Prerequisites
          </h4>
          <ul className="flex flex-col gap-1.5">
            {prerequisites.map((prereq) => (
              <li key={prereq} className="flex items-center gap-2 text-sm text-[#6B7280]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D1D5DB]" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
