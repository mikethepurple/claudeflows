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
          className="flex gap-3 rounded-lg bg-[rgba(255,255,255,0.04)] p-3"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.20)] text-xs font-bold text-[#6366F1]">
            {index + 1}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[rgba(255,255,255,0.92)]">
                {step.title}
              </span>
              {!step.required && (
                <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-2 py-0.5 text-[10px] text-[rgba(255,255,255,0.36)]">
                  optional
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-[rgba(255,255,255,0.60)]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
