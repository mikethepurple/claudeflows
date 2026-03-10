import type { WorkflowStep } from "@/lib/types";

interface ProcessTimelineProps {
  steps: WorkflowStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-start gap-0 min-w-max px-4 py-6">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-start">
            {/* Step */}
            <div className="flex flex-col items-center text-center w-40">
              {/* Numbered circle */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8590C] text-sm font-bold text-white shadow-sm">
                {index + 1}
              </div>
              {/* Step name */}
              <h4 className="mt-3 text-sm font-semibold text-[#1A1A1A]">
                {step.name}
              </h4>
              {/* Step description */}
              <p className="mt-1 text-xs text-[#6B7280] leading-relaxed max-w-[140px]">
                {step.description}
              </p>
              {/* Methodology badge */}
              {step.methodologyCount > 0 && (
                <span className="mt-2 inline-flex items-center rounded-full bg-[#E8590C]/10 px-2 py-0.5 text-[10px] font-medium text-[#E8590C]">
                  {step.methodologyCount} method{step.methodologyCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex items-center pt-5">
                <div className="h-px w-8 bg-[#D1D5DB]" />
                <svg
                  className="h-3 w-3 -ml-1 text-[#D1D5DB]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="h-px w-8 bg-[#D1D5DB] -ml-1" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
