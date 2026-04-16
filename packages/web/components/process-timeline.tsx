import type { WorkflowStep } from "@/lib/types";

interface ProcessTimelineProps {
  steps: WorkflowStep[];
}

function getStepColor(index: number, total: number): { bg: string; text: string; line: string } {
  // Gradient from light indigo to dark indigo
  const colors = [
    { bg: "bg-indigo-300", text: "text-white", line: "bg-indigo-200" },
    { bg: "bg-indigo-400", text: "text-white", line: "bg-indigo-300" },
    { bg: "bg-indigo-500", text: "text-white", line: "bg-indigo-400" },
    { bg: "bg-[#6366F1]", text: "text-white", line: "bg-indigo-400" },
    { bg: "bg-indigo-700", text: "text-white", line: "bg-indigo-600" },
    { bg: "bg-indigo-800", text: "text-white", line: "bg-indigo-700" },
    { bg: "bg-indigo-900", text: "text-white", line: "bg-indigo-800" },
  ];
  if (total <= 1) return colors[3];
  const idx = Math.round((index / (total - 1)) * (colors.length - 1));
  return colors[idx];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <>
      {/* Mobile: vertical layout */}
      <div className="sm:hidden px-2 py-4">
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const color = getStepColor(index, steps.length);
            return (
              <div key={step.name} className="flex items-start gap-4">
                {/* Left column: circle + connector line */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text} text-sm font-bold`}>
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-12 ${color.line}`} />
                  )}
                </div>
                {/* Right column: text */}
                <div className="pt-1.5 pb-6">
                  <h4 className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">
                    {step.name}
                  </h4>
                  <p className="mt-1 text-xs text-[rgba(255,255,255,0.60)] leading-relaxed">
                    {step.description}
                  </p>
                  {step.methodologyCount > 0 && (
                    <span className="mt-2 inline-flex items-center rounded-full bg-[rgba(99,102,241,0.15)] px-2 py-0.5 text-[10px] font-medium text-[#6366F1]">
                      {step.methodologyCount} method{step.methodologyCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden sm:block overflow-x-auto scrollbar-hide">
        <div className="flex items-start gap-0 min-w-max px-4 py-6">
          {steps.map((step, index) => {
            const color = getStepColor(index, steps.length);
            return (
              <div key={step.name} className="flex items-start">
                {/* Step */}
                <div className="flex flex-col items-center text-center w-40">
                  {/* Numbered circle */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text} text-sm font-bold`}>
                    {index + 1}
                  </div>
                  {/* Step name */}
                  <h4 className="mt-3 text-sm font-semibold text-[rgba(255,255,255,0.92)]">
                    {step.name}
                  </h4>
                  {/* Step description */}
                  <p className="mt-1 text-xs text-[rgba(255,255,255,0.60)] leading-relaxed max-w-[140px]">
                    {step.description}
                  </p>
                  {/* Methodology badge */}
                  {step.methodologyCount > 0 && (
                    <span className="mt-2 inline-flex items-center rounded-full bg-[rgba(99,102,241,0.15)] px-2 py-0.5 text-[10px] font-medium text-[#6366F1]">
                      {step.methodologyCount} method{step.methodologyCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex items-center pt-5">
                    <div className={`h-px w-8 ${color.line}`} />
                    <svg
                      className={`h-3 w-3 -ml-1 ${color.line.replace("bg-", "text-")}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className={`h-px w-8 -ml-1 ${color.line}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
