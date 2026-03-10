"use client";

import type { TokenEstimate as TokenEstimateType, WorkflowStep } from "@/lib/types";

// Sonnet API pricing ($/token)
const SONNET_INPUT_RATE = 3.0 / 1_000_000;
const SONNET_OUTPUT_RATE = 15.0 / 1_000_000;

// Estimated 5-hour window budgets per plan (Anthropic doesn't publish exact numbers)
// Calibrated from real-world usage: venture-studio (775K) exceeds Pro 5hr window
const PLANS = [
  { id: "pro",   label: "Pro",      price: "$20/mo",  budget5hr: 450_000,  budgetWeekly: 4_500_000 },
  { id: "max5",  label: "Max 5x",   price: "$100/mo", budget5hr: 1_125_000, budgetWeekly: 11_250_000 },
  { id: "max20", label: "Max 20x",  price: "$200/mo", budget5hr: 4_500_000, budgetWeekly: 45_000_000 },
] as const;

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function formatUsd(n: number): string {
  if (n < 0.01) return "<$0.01";
  return `$${n.toFixed(2)}`;
}

function barColor(pct: number): string {
  if (pct > 100) return "bg-red-500";
  if (pct > 70) return "bg-amber-500";
  return "bg-[#16A34A]";
}

function pctLabel(pct: number): string {
  if (pct < 1) return "<1%";
  if (pct > 200) return `${Math.round(pct)}%`;
  return `${Math.round(pct)}%`;
}

interface TokenEstimateProps {
  estimate: TokenEstimateType;
  steps?: WorkflowStep[];
}

export default function TokenEstimate({ estimate, steps }: TokenEstimateProps) {
  const stepsWithTokens = steps?.filter((s) => s.tokenEstimate) ?? [];
  const maxStepTokens = stepsWithTokens.length > 0
    ? Math.max(...stepsWithTokens.map((s) => s.tokenEstimate!.totalTokens))
    : 0;

  const apiCost =
    estimate.inputTokens * SONNET_INPUT_RATE +
    estimate.outputTokens * SONNET_OUTPUT_RATE;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Token Usage
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            estimate.confidence === "measured"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {estimate.confidence === "measured" ? "Measured" : "Estimated"}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-[#1A1A1A]">
          ~{formatTokens(estimate.totalTokens)}
        </span>
        <span className="text-xs text-[#9CA3AF]">tokens per run</span>
      </div>

      {/* API cost */}
      <div className="rounded-lg bg-[#F5F3F0] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
            API cost (Sonnet)
          </span>
          <span className="text-sm font-semibold text-[#1A1A1A]">
            {formatUsd(apiCost)}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-[#9CA3AF]">
          $3/M input + $15/M output
        </p>
      </div>

      {/* Plan usage comparison */}
      <div className="rounded-lg border border-black/[0.06] overflow-hidden">
        <div className="bg-[#F5F3F0] px-3 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
            % of your 5-hour limit
          </p>
        </div>
        <div className="divide-y divide-black/[0.04]">
          {PLANS.map((plan) => {
            const pct = (estimate.totalTokens / plan.budget5hr) * 100;
            const exceeds = pct > 100;
            return (
              <div key={plan.id} className="flex items-center gap-2.5 px-3 py-2">
                <div className="w-16 shrink-0">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">{plan.label}</span>
                  <span className="block text-[9px] text-[#9CA3AF]">{plan.price}</span>
                </div>
                <div className="flex-1 h-2 rounded-full bg-black/[0.04] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${barColor(pct)}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <span className={`w-10 shrink-0 text-right text-[11px] font-medium ${
                  exceeds ? "text-red-600" : pct > 70 ? "text-amber-600" : "text-[#16A34A]"
                }`}>
                  {pctLabel(pct)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Warning if exceeds Pro */}
        {estimate.totalTokens > PLANS[0].budget5hr && (
          <div className="border-t border-black/[0.04] bg-red-50 px-3 py-2">
            <p className="text-[10px] text-red-700">
              Exceeds Pro 5-hour limit — you&apos;ll need multiple sessions or a Max plan.
            </p>
          </div>
        )}
      </div>

      {/* Input / Output split */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-lg bg-[#F5F3F0] px-3 py-2">
          <span className="block text-[10px] uppercase tracking-wider text-[#9CA3AF]">
            Input
          </span>
          <span className="text-sm font-semibold text-[#374151]">
            {formatTokens(estimate.inputTokens)}
          </span>
        </div>
        <div className="flex-1 rounded-lg bg-[#F5F3F0] px-3 py-2">
          <span className="block text-[10px] uppercase tracking-wider text-[#9CA3AF]">
            Output
          </span>
          <span className="text-sm font-semibold text-[#374151]">
            {formatTokens(estimate.outputTokens)}
          </span>
        </div>
      </div>

      {/* Per-step bar chart */}
      {stepsWithTokens.length > 0 && (
        <div className="mt-1">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-[#9CA3AF]">
            Per step
          </p>
          <div className="flex flex-col gap-1.5">
            {stepsWithTokens.map((step) => {
              const pct = maxStepTokens > 0
                ? (step.tokenEstimate!.totalTokens / maxStepTokens) * 100
                : 0;
              return (
                <div key={step.name} className="flex items-center gap-2">
                  <span className="w-24 shrink-0 truncate text-[11px] text-[#6B7280]">
                    {step.name}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-[#F5F3F0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E8590C]"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-[11px] text-[#9CA3AF]">
                    {formatTokens(step.tokenEstimate!.totalTokens)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Note */}
      {estimate.note && (
        <p className="text-[11px] leading-relaxed text-[#9CA3AF]">
          {estimate.note}
        </p>
      )}

      <p className="text-[10px] leading-relaxed text-[#D1D5DB]">
        Plan limits are approximate — Anthropic doesn&apos;t publish exact token budgets. API rates are for Claude Sonnet.
      </p>
    </div>
  );
}
