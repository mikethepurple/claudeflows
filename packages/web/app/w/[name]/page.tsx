"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import InstallButton from "@/components/install-button";
import Requirements from "@/components/requirements";
import SkillList from "@/components/skill-list";
import SetupGuide from "@/components/setup-guide";
import BenefitsList from "@/components/benefits-list";
import InputsSection from "@/components/inputs-section";
import DifficultyBadge from "@/components/difficulty-badge";
import ProcessTimeline from "@/components/process-timeline";
import TokenEstimate from "@/components/token-estimate";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";
import type { Workflow } from "@/lib/types";

interface PageProps {
  params: Promise<{ name: string }>;
}

function findWorkflow(name: string) {
  return SAMPLE_WORKFLOWS.find((wf) => wf.name === name);
}

/* ─── Shared sub-components ─── */

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>&#9733;</span>
      ))}
      {hasHalf && <span>&#9734;</span>}
      <span className="ml-1.5 text-sm text-[#6B7280]">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const htmlParts: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        htmlParts.push(
          `<pre><code>${codeBuffer
            .join("\n")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>`
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        if (inList) {
          htmlParts.push("</ul>");
          inList = false;
        }
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push("<hr />");
      continue;
    }
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      const level = headingMatch[1].length;
      htmlParts.push(`<h${level}>${fmtInline(headingMatch[2])}</h${level}>`);
      continue;
    }
    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      if (!inList) { htmlParts.push("<ul>"); inList = true; }
      htmlParts.push(`<li>${fmtInline(listMatch[1])}</li>`);
      continue;
    }
    const numListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (numListMatch) {
      if (!inList) { htmlParts.push("<ul>"); inList = true; }
      htmlParts.push(`<li>${fmtInline(numListMatch[1])}</li>`);
      continue;
    }
    if (inList) { htmlParts.push("</ul>"); inList = false; }
    if (line.trim() === "") continue;
    htmlParts.push(`<p>${fmtInline(line)}</p>`);
  }
  if (inList) htmlParts.push("</ul>");
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlParts.join("\n") }}
    />
  );
}

function fmtInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

function parseDeliverables(text: string): string[] {
  // Try splitting by common patterns
  const byComma = text.split(/,\s+(?=[A-Z])/);
  if (byComma.length >= 3) return byComma;
  const bySentence = text.split(/\.\s+/).filter(s => s.trim().length > 0);
  if (bySentence.length >= 2) return bySentence;
  // Fallback: split on semicolons or "and"
  const bySemicolon = text.split(/;\s*/);
  if (bySemicolon.length >= 2) return bySemicolon;
  return [text];
}

const BADGE_COLORS: Record<string, string> = {
  "AI-Powered": "bg-purple-50 border-purple-200 text-purple-700",
  "Guided Setup": "bg-green-50 border-green-200 text-green-700",
  "No Keys Required": "bg-green-50 border-green-200 text-green-700",
};

const CATEGORY_COLORS: Record<string, string> = {
  business: "bg-blue-100 text-blue-700",
  development: "bg-green-100 text-green-700",
  data: "bg-cyan-100 text-cyan-700",
  research: "bg-yellow-100 text-yellow-700",
  marketing: "bg-pink-100 text-pink-700",
  design: "bg-purple-100 text-purple-700",
  operations: "bg-orange-100 text-orange-700",
  productivity: "bg-indigo-100 text-indigo-700",
  finance: "bg-emerald-100 text-emerald-700",
};

/* Tabs removed — single scrollable page, sections appear only if data exists */

/* ─── Highlights (Salesforce-inspired feature badges) ─── */

function Highlights({ wf }: { wf: Workflow }) {
  const mcpCount = Object.keys(wf.mcp).length;
  const envCount = wf.env ? Object.keys(wf.env).length : 0;
  const hasAutoSetup = wf.setupSteps && wf.setupSteps.length > 0;
  const hasSteps = wf.steps && wf.steps.length > 0;

  const badges: { label: string; icon: React.ReactNode }[] = [
    {
      label: "AI-Powered",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
  ];

  if (hasSteps) {
    badges.push({
      label: `${wf.steps!.length}-Step Pipeline`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
    });
  }

  if (hasAutoSetup) {
    badges.push({
      label: "Guided Setup",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    });
  }

  badges.push({
    label: `${wf.skills.length} Skill${wf.skills.length !== 1 ? "s" : ""}`,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  });

  if (mcpCount > 0) {
    badges.push({
      label: `${mcpCount} Integration${mcpCount !== 1 ? "s" : ""}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    });
  }

  if (envCount > 0) {
    const optionalCount = wf.env
      ? Object.values(wf.env).filter((e) => !e.required).length
      : 0;
    if (optionalCount === envCount) {
      badges.push({
        label: "No Keys Required",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        ),
      });
    }
  }

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
        Highlights
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((badge) => {
          const colors = BADGE_COLORS[badge.label] ?? "bg-orange-50 border-orange-200 text-orange-700";
          return (
            <div key={badge.label}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center ${colors}`}>
              <span className="mb-2">{badge.icon}</span>
              <span className="text-xs font-medium">{badge.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Sidebar ─── */

function Sidebar({ wf }: { wf: Workflow }) {
  const mcpEntries = Object.entries(wf.mcp);

  return (
    <aside className="w-full shrink-0 lg:w-80">
      <div className="sticky top-24 flex flex-col gap-5">
        {/* Get Started CTA */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <InstallButton workflowName={wf.name} />
        </div>

        {/* What It Costs */}
        {wf.costInfo && (
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              What It Costs
            </h3>
            <div className="flex gap-2">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                {wf.costInfo}
              </p>
            </div>
          </div>
        )}

        {/* About This Skill */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            About This Skill
          </h3>
          <div className="flex flex-col gap-2.5">
            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Price</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Free</span>
            </div>
            {/* Platform */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Platform</span>
              <span className="text-sm text-[#171717]">macOS, Linux, Windows</span>
            </div>
            {/* Installs */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Installs</span>
              <span className="text-sm font-medium text-[#171717]">{wf.installs.toLocaleString()}</span>
            </div>
            {/* Version */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Version</span>
              <code className="text-sm font-mono text-[#6B7280]">v{wf.version}</code>
            </div>
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Category</span>
              <span className="text-sm text-[#6B7280] capitalize">{wf.category}</span>
            </div>
            {/* Difficulty */}
            {wf.difficulty && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Difficulty</span>
                <DifficultyBadge difficulty={wf.difficulty} />
              </div>
            )}
            {/* Time estimates */}
            {wf.estimatedTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Per-use time</span>
                <span className="text-sm text-[#171717]">{wf.estimatedTime}</span>
              </div>
            )}
            {wf.setupTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Setup time</span>
                <span className="text-sm text-[#171717]">{wf.setupTime}</span>
              </div>
            )}
            {/* Integrations */}
            {mcpEntries.length > 0 && (
              <>
                <div className="mt-1 mb-1 border-t border-black/[0.04]" />
                <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Integrations</p>
                {mcpEntries.map(([name, config]) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${config.required ? "bg-[#C2410C]" : "bg-[#D1D5DB]"}`} />
                    <span className="text-sm text-[#374151]">{config.plainName || name}</span>
                    <span className="ml-auto text-xs text-[#9CA3AF]">{config.required ? "required" : "optional"}</span>
                  </div>
                ))}
              </>
            )}
            {/* Source code */}
            <div className="mt-1 border-t border-black/[0.04] pt-2">
              <a href={wf.repository} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#171717] transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                View source code
              </a>
            </div>
          </div>
        </div>

        {/* Token Estimate */}
        {wf.tokenEstimate && (
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <TokenEstimate estimate={wf.tokenEstimate} steps={wf.steps} />
          </div>
        )}

        {/* Provider Details */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Creator
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-sm font-bold text-white">
              {wf.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <Link
                href={`/u/${wf.author.name}`}
                className="text-sm font-medium text-[#171717] hover:text-[#C2410C] transition-colors"
              >
                {wf.author.name}
              </Link>
              <a
                href={`https://github.com/${wf.author.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                @{wf.author.github}
              </a>
            </div>
          </div>
          <Link
            href={`/u/${wf.author.name}`}
            className="block text-center text-xs text-[#C2410C] hover:underline"
          >
            View all by this creator
          </Link>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {wf.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-lg bg-[#F5F5F5] px-2.5 py-1 text-xs text-[#6B7280] transition-colors hover:bg-[#C2410C]/10 hover:text-[#C2410C]"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* Old tab functions removed — content is now inline in the main page component */


/* ─── Main Page ─── */

export default function WorkflowDetailPage({ params }: PageProps) {
  const { name } = use(params);
  const wf = findWorkflow(name);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (!wf) notFound();

  const otherWorkflows = SAMPLE_WORKFLOWS.filter(
    (w) => w.author.name === wf.author.name && w.name !== wf.name
  );

  return (
    <div className="bg-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-black/[0.08] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-5 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Link href="/" className="hover:text-[#C2410C] transition-colors">Skills</Link>
            <span>/</span>
            <Link href={`/search?q=${encodeURIComponent(wf.category)}`} className="hover:text-[#C2410C] transition-colors capitalize">{wf.category}</Link>
            <span>/</span>
            <span className="text-[#6B7280]">{wf.displayName}</span>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#C2410C]/10 text-2xl">
              <span className="font-mono font-bold text-[#C2410C]">{wf.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#171717] sm:text-3xl">{wf.displayName}</h1>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[wf.category] ?? "bg-gray-100 text-gray-700"}`}>{wf.category}</span>
                <code className="rounded-md bg-[#F5F5F5] px-2 py-0.5 text-xs font-mono text-[#6B7280]">v{wf.version}</code>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                by{" "}
                <Link href={`/u/${wf.author.name}`} className="text-[#C2410C] hover:underline">{wf.author.name}</Link>
                <span className="mx-2 text-[#D1D5DB]">&middot;</span>
                {wf.installs.toLocaleString()} installs
              </p>
            </div>
          </div>

          {wf.tagline && (
            <p className="text-lg font-medium text-[#374151]">{wf.tagline}</p>
          )}
        </div>
      </div>

      {/* Single scrollable page — sections appear only if data exists */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 pb-24 lg:pb-0">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 min-w-0 lg:max-w-[calc(100%-21rem)]">

            {/* 1. Highlights — always shown (auto-generated from metadata) */}
            <Highlights wf={wf} />

            {/* 2. Description — always shown */}
            <section className="mb-8">
              <p className="text-base leading-relaxed text-[#6B7280]">{wf.description}</p>
            </section>

            {/* 3. Process steps — ONLY if steps exist */}
            {wf.steps && wf.steps.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">How It Works</h2>
                <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
                  <ProcessTimeline steps={wf.steps} />
                </div>
              </section>
            )}

            {/* 4. What You Get — ONLY if outputDescription exists */}
            {wf.outputDescription && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">What You Get</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parseDeliverables(wf.outputDescription).map((item, i) => {
                    const iconColors = ["bg-blue-50 text-blue-600", "bg-green-50 text-green-600", "bg-purple-50 text-purple-600", "bg-orange-50 text-orange-600", "bg-cyan-50 text-cyan-600", "bg-pink-50 text-pink-600"];
                    const colorClass = iconColors[i % iconColors.length];
                    return (
                      <div key={i} className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm flex items-start gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <p className="text-sm text-[#374151] leading-relaxed">{item.trim()}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 5. Strengths & Limitations — ONLY if either exists */}
            {((wf.differentiators && wf.differentiators.length > 0) || (wf.limitations && wf.limitations.length > 0)) && (
              <section className="mb-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {wf.differentiators && wf.differentiators.length > 0 && (
                    <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#171717]">
                        <svg className="h-4 w-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        Strengths
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {wf.differentiators.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#6B7280]">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {wf.limitations && wf.limitations.length > 0 && (
                    <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#171717]">
                        <svg className="h-4 w-4 text-[#D97706]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                        Limitations
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {wf.limitations.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#6B7280]">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6. What You'll Need — ONLY if inputs or prerequisites exist */}
            {((wf.inputs && wf.inputs.length > 0) || (wf.prerequisites && wf.prerequisites.length > 0)) && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">What You&apos;ll Need</h2>
                <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                  <InputsSection inputs={wf.inputs ?? []} prerequisites={wf.prerequisites} />
                </div>
              </section>
            )}

            {/* 7. Available Skills — ONLY if more than 1 skill */}
            {wf.skills.length > 1 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">
                  Available Skills ({wf.skills.length})
                </h2>
                <SkillList skills={wf.skills} workflowName={wf.name} />
              </section>
            )}

            {/* 8. Setup — ONLY if setup steps exist */}
            {wf.setupSteps && wf.setupSteps.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">Setup Guide</h2>
                <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                  <SetupGuide steps={wf.setupSteps} />
                </div>
              </section>
            )}

            {/* 9. Detailed explanation — collapsible, ONLY if detailedProcess exists */}
            {wf.detailedProcess && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-[#171717]">Detailed Breakdown</h2>
                <div className="rounded-xl border border-black/[0.08] bg-white p-6 shadow-sm">
                  <div className={`relative ${!detailsExpanded ? "max-h-40 overflow-hidden" : ""}`}>
                    <SimpleMarkdown content={wf.detailedProcess} />
                    {!detailsExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                    )}
                  </div>
                  <button
                    onClick={() => setDetailsExpanded(!detailsExpanded)}
                    className="mt-3 text-sm font-medium text-[#C2410C] hover:underline"
                  >
                    {detailsExpanded ? "Show less" : "Read full breakdown"}
                  </button>
                </div>
              </section>
            )}

            {/* 10. More from this creator — ONLY if other workflows exist */}
            {otherWorkflows.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#171717]">More From This Creator</h2>
                  <Link href={`/u/${wf.author.name}`} className="text-sm text-[#C2410C] hover:underline">View all</Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {otherWorkflows.map((other) => (
                    <Link key={other.name} href={`/w/${other.name}`} className="flex items-start gap-3 rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm transition-all hover:border-[#C2410C]/30 hover:shadow-md">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C2410C]/10 text-base">
                        <span className="font-mono font-bold text-[#C2410C]">{other.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[#171717]">{other.displayName}</h4>
                        {other.tagline && <p className="mt-0.5 text-xs text-[#6B7280] line-clamp-2">{other.tagline}</p>}
                        <span className="mt-1.5 block text-xs text-[#9CA3AF]">{other.installs.toLocaleString()} installs</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
          <Sidebar wf={wf} />
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/95 backdrop-blur-sm p-4 lg:hidden z-40">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={() => { navigator.clipboard.writeText(`claudeflows install ${wf.name}`); }}
            className="flex-1 rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white"
          >
            Copy install command
          </button>
          <a
            href={`mailto:hello@claudeflows.com?subject=Setup%20Help%20-%20${encodeURIComponent(wf.name)}`}
            className="flex-1 rounded-xl border border-neutral-300 bg-white py-3 text-sm font-medium text-neutral-700 text-center"
          >
            Get help
          </a>
        </div>
      </div>
    </div>
  );
}
