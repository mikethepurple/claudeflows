import type { SetupStep } from "@/lib/types";

interface SetupGuideProps {
  steps: SetupStep[];
}

export default function SetupGuide({ steps }: SetupGuideProps) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="flex gap-3 rounded-lg bg-[#F5F3F0] p-3"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8590C]/20 text-xs font-bold text-[#E8590C]">
            {index + 1}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1A1A1A]">
                {step.title}
              </span>
              {!step.required && (
                <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-[#9CA3AF]">
                  optional
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
