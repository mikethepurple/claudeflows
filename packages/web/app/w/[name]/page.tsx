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
import TabNavigation from "@/components/tab-navigation";
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

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "setup", label: "Setup" },
  { id: "reviews", label: "Reviews" },
];

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
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
  ];

  if (hasSteps) {
    badges.push({
      label: `${wf.steps!.length}-Step Pipeline`,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
    });
  }

  if (hasAutoSetup) {
    badges.push({
      label: "Guided Setup",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    });
  }

  badges.push({
    label: `${wf.skills.length} Command${wf.skills.length !== 1 ? "s" : ""}`,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  });

  if (mcpCount > 0) {
    badges.push({
      label: `${mcpCount} Integration${mcpCount !== 1 ? "s" : ""}`,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5F3F0] px-3 py-1.5 text-xs font-medium text-[#374151]"
          >
            <span className="text-[#E8590C]">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
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

        {/* Pricing */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Pricing
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              Free
            </span>
            <span className="text-sm text-[#6B7280]">Open Source</span>
          </div>
          {wf.license && (
            <p className="text-xs text-[#9CA3AF]">
              Licensed under {wf.license}
            </p>
          )}
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

        {/* Token Estimate */}
        {wf.tokenEstimate && (
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <TokenEstimate estimate={wf.tokenEstimate} steps={wf.steps} />
          </div>
        )}

        {/* Compatibility / Platform */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Compatibility
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm text-[#374151]">Claude Code</span>
              <span className="ml-auto text-xs text-[#9CA3AF]">required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm text-[#374151]">macOS, Linux, Windows</span>
            </div>
            {mcpEntries.length > 0 && (
              <>
                <div className="mt-1 mb-1 border-t border-black/[0.04]" />
                <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Integrations
                </p>
                {mcpEntries.map(([name, config]) => (
                  <div key={name} className="flex flex-col gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${config.required ? "bg-[#E8590C]" : "bg-[#D1D5DB]"}`} />
                      <span className="text-sm font-medium text-[#374151]">
                        {config.plainName || name}
                      </span>
                      <span className="ml-auto text-xs text-[#9CA3AF]">
                        {config.required ? "required" : "optional"}
                      </span>
                    </div>
                    {config.plainDescription && (
                      <p className="ml-3.5 text-xs text-[#9CA3AF] leading-relaxed">
                        {config.plainDescription}
                      </p>
                    )}
                    {config.setupUrl && (
                      <a
                        href={config.setupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3.5 inline-flex items-center gap-1 text-xs text-[#E8590C] hover:underline"
                      >
                        Setup guide
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Details
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Rating</span>
              <StarRating rating={wf.rating} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Installs</span>
              <span className="text-sm font-medium text-[#1A1A1A]">
                {wf.installs.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Version</span>
              <code className="text-sm font-mono text-[#6B7280]">v{wf.version}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Category</span>
              <span className="text-sm text-[#6B7280] capitalize">{wf.category}</span>
            </div>
            {wf.difficulty && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Difficulty</span>
                <DifficultyBadge difficulty={wf.difficulty} />
              </div>
            )}
            {wf.estimatedTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Per-use time</span>
                <span className="text-sm text-[#1A1A1A]">{wf.estimatedTime}</span>
              </div>
            )}
            {wf.setupTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Setup time</span>
                <span className="text-sm text-[#1A1A1A]">{wf.setupTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Support & Resources */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Support &amp; Resources
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href={wf.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
            <a
              href={`${wf.repository}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Report an Issue
            </a>
            <a
              href={`${wf.repository}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Documentation
            </a>
          </div>
        </div>

        {/* Provider Details */}
        <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Provider
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8590C] to-[#16A34A] text-sm font-bold text-white">
              {wf.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <Link
                href={`/u/${wf.author.name}`}
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#E8590C] transition-colors"
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
            className="block text-center text-xs text-[#E8590C] hover:underline"
          >
            View all workflows by this provider
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
                className="rounded-lg bg-[#F5F3F0] px-2.5 py-1 text-xs text-[#6B7280] transition-colors hover:bg-[#E8590C]/10 hover:text-[#E8590C]"
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

/* ─── Tab: Overview ─── */

function OverviewTab({ wf }: { wf: Workflow }) {
  const otherWorkflows = SAMPLE_WORKFLOWS.filter(
    (w) => w.author.name === wf.author.name && w.name !== wf.name
  );

  return (
    <>
      {/* Highlights */}
      <Highlights wf={wf} />

      {/* Description */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-[#1A1A1A]">
          Description
        </h2>
        <p className="text-base leading-relaxed text-[#6B7280]">
          {wf.description}
        </p>
      </section>

      {/* How This Actually Works */}
      {wf.detailedProcess && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            How This Actually Works
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-6 shadow-sm">
            <SimpleMarkdown content={wf.detailedProcess} />
          </div>
        </section>
      )}

      {/* What You Get */}
      {wf.outputDescription && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            What You Get
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8590C]/10">
                <svg className="h-4 w-4 text-[#E8590C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                {wf.outputDescription}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Where It Shines / Where It Doesn't */}
      {((wf.differentiators && wf.differentiators.length > 0) ||
        (wf.limitations && wf.limitations.length > 0)) && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Where It Shines / Where It Doesn&apos;t
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Strengths */}
            {wf.differentiators && wf.differentiators.length > 0 && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                  <svg className="h-4 w-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Strengths
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {wf.differentiators.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#6B7280]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Limitations */}
            {wf.limitations && wf.limitations.length > 0 && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                  <svg className="h-4 w-4 text-[#D97706]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  Limitations
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {wf.limitations.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#6B7280]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* What You'll Get (benefits) */}
      {wf.benefits && wf.benefits.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            What You&apos;ll Get
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <BenefitsList benefits={wf.benefits} />
          </div>
        </section>
      )}

      {/* What You'll Need */}
      {((wf.inputs && wf.inputs.length > 0) ||
        (wf.prerequisites && wf.prerequisites.length > 0)) && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            What You&apos;ll Need
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <InputsSection
              inputs={wf.inputs ?? []}
              prerequisites={wf.prerequisites}
            />
          </div>
        </section>
      )}

      {/* Good to Know */}
      {(wf.difficulty || wf.estimatedTime || wf.setupTime) && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Good to Know
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {wf.difficulty && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
                <span className="mb-1 block text-xs text-[#9CA3AF]">
                  Difficulty
                </span>
                <DifficultyBadge difficulty={wf.difficulty} />
              </div>
            )}
            {wf.estimatedTime && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
                <span className="mb-1 block text-xs text-[#9CA3AF]">
                  Per-use time
                </span>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {wf.estimatedTime}
                </span>
              </div>
            )}
            {wf.setupTime && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
                <span className="mb-1 block text-xs text-[#9CA3AF]">
                  First-time setup
                </span>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {wf.setupTime}
                </span>
              </div>
            )}
            <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
              <span className="mb-1 block text-xs text-[#9CA3AF]">
                Commands
              </span>
              <span className="text-sm font-medium text-[#1A1A1A]">
                {wf.skills.length} available
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Commands Quick Preview */}
      {wf.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Commands
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white shadow-sm divide-y divide-black/[0.04]">
            {wf.skills.map((skill) => (
              <div key={skill.name} className="flex items-start gap-3 px-5 py-3.5">
                <code className="mt-0.5 shrink-0 rounded-md bg-[#F5F3F0] px-2 py-0.5 text-xs font-mono font-semibold text-[#E8590C]">
                  /{skill.name}
                </code>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More From This Provider */}
      {otherWorkflows.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              More From This Provider
            </h2>
            <Link
              href={`/u/${wf.author.name}`}
              className="text-sm text-[#E8590C] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherWorkflows.map((other) => (
              <Link
                key={other.name}
                href={`/w/${other.name}`}
                className="flex items-start gap-3 rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm transition-all hover:border-[#E8590C]/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8590C]/10 text-base">
                  <span className="font-mono font-bold text-[#E8590C]">
                    {other.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-[#1A1A1A]">
                    {other.displayName}
                  </h4>
                  {other.tagline && (
                    <p className="mt-0.5 text-xs text-[#6B7280] line-clamp-2">
                      {other.tagline}
                    </p>
                  )}
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span>{other.installs.toLocaleString()} installs</span>
                    <span className="text-yellow-500">
                      &#9733; {other.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ─── Tab: How It Works ─── */

function HowItWorksTab({ wf }: { wf: Workflow }) {
  return (
    <>
      {/* Process Timeline */}
      {wf.steps && wf.steps.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Process Flow
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-sm">
            <ProcessTimeline steps={wf.steps} />
          </div>
        </section>
      )}

      {/* README */}
      {wf.readme && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Details
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-6 shadow-sm">
            <SimpleMarkdown content={wf.readme} />
          </div>
        </section>
      )}

      {(!wf.steps || wf.steps.length === 0) && !wf.readme && (
        <div className="py-12 text-center text-[#9CA3AF]">
          No detailed process information available for this workflow.
        </div>
      )}
    </>
  );
}

/* ─── Tab: Setup ─── */

function SetupTab({ wf }: { wf: Workflow }) {
  return (
    <>
      {/* Time Estimates */}
      {(wf.setupTime || wf.estimatedTime) && (
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {wf.setupTime && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a.75.75 0 010-1.28l5.1-3.06a.75.75 0 011.08.67v6.06a.75.75 0 01-1.08.67z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs text-[#9CA3AF]">First-time setup</span>
                    <span className="text-sm font-semibold text-[#1A1A1A]">{wf.setupTime}</span>
                  </div>
                </div>
              </div>
            )}
            {wf.estimatedTime && (
              <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs text-[#9CA3AF]">Per-use time</span>
                    <span className="text-sm font-semibold text-[#1A1A1A]">{wf.estimatedTime}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Prerequisite Cards */}
      {wf.prerequisiteDetails && wf.prerequisiteDetails.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Prerequisites
          </h2>
          <div className="flex flex-col gap-3">
            {wf.prerequisiteDetails.map((prereq, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8590C]/10 text-sm font-bold text-[#E8590C]">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#1A1A1A]">
                      {prereq.label}
                    </h3>
                    <p className="mt-1 text-sm text-[#6B7280] leading-relaxed">
                      {prereq.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {prereq.url && (
                        <a
                          href={prereq.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8590C] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#D04E0A] transition-colors"
                        >
                          Get started
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
                      {prereq.timeEstimate && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {prereq.timeEstimate}
                        </span>
                      )}
                      {prereq.cost && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {prereq.cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Setup Guide (existing setup steps) */}
      {wf.setupSteps && wf.setupSteps.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Setup Guide
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <SetupGuide steps={wf.setupSteps} />
          </div>
        </section>
      ) : (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Requirements
          </h2>
          <div className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm">
            <Requirements mcp={wf.mcp} env={wf.env} />
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
          Available Commands ({wf.skills.length})
        </h2>
        <SkillList skills={wf.skills} workflowName={wf.name} />
      </section>
    </>
  );
}

/* ─── Tab: Reviews ─── */

function ReviewsTab({ wf }: { wf: Workflow }) {
  const starLabels = [5, 4, 3, 2, 1];

  return (
    <section className="mb-8">
      {/* Rating summary */}
      <div className="rounded-xl border border-black/[0.08] bg-white p-6 shadow-sm mb-6">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
          Rating Summary
        </h2>
        <div className="flex items-start gap-8">
          {/* Large rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-[#1A1A1A]">
              {wf.rating.toFixed(1)}
            </div>
            <div className="mt-1">
              <StarRating rating={wf.rating} />
            </div>
            <p className="mt-1 text-xs text-[#9CA3AF]">0 reviews</p>
          </div>
          {/* Star distribution bars */}
          <div className="flex-1">
            {starLabels.map((stars) => (
              <div key={stars} className="flex items-center gap-2 mb-1.5">
                <span className="w-8 text-right text-xs text-[#6B7280]">
                  {stars} &#9733;
                </span>
                <div className="flex-1 h-2 rounded-full bg-[#F5F3F0] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: "0%" }}
                  />
                </div>
                <span className="w-6 text-xs text-[#9CA3AF]">0</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort controls placeholder */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9CA3AF]">Sort by:</span>
          <select
            className="rounded-lg border border-black/[0.08] bg-white px-2.5 py-1 text-xs text-[#6B7280] outline-none"
            defaultValue="recent"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="favorable">Most Favorable</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      <div className="rounded-xl border border-black/[0.08] bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3F0]">
          <svg
            className="h-7 w-7 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-base font-semibold text-[#1A1A1A]">
          No reviews yet
        </h3>
        <p className="mb-4 text-sm text-[#6B7280]">
          Be the first to share your experience with this workflow.
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#E8590C] px-4 py-2 text-sm font-medium text-white hover:bg-[#D04E0A] transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Write a Review
        </button>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */

export default function WorkflowDetailPage({ params }: PageProps) {
  const { name } = use(params);
  const wf = findWorkflow(name);
  const [activeTab, setActiveTab] = useState("overview");

  if (!wf) notFound();

  return (
    <div className="bg-[#FAF9F7]">
      {/* Header section */}
      <div className="border-b border-black/[0.08] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Link href="/" className="hover:text-[#E8590C] transition-colors">
              Workflows
            </Link>
            <span>/</span>
            <Link
              href={`/search?q=${encodeURIComponent(wf.category)}`}
              className="hover:text-[#E8590C] transition-colors capitalize"
            >
              {wf.category}
            </Link>
            <span>/</span>
            <span className="text-[#6B7280]">{wf.displayName}</span>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8590C]/10 text-2xl">
              <span className="font-mono font-bold text-[#E8590C]">
                {wf.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#1A1A1A] sm:text-3xl">
                  {wf.displayName}
                </h1>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    CATEGORY_COLORS[wf.category] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {wf.category}
                </span>
                <code className="rounded-md bg-[#F5F3F0] px-2 py-0.5 text-xs font-mono text-[#6B7280]">
                  v{wf.version}
                </code>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                by{" "}
                <Link
                  href={`/u/${wf.author.name}`}
                  className="text-[#E8590C] hover:underline"
                >
                  {wf.author.name}
                </Link>
                <span className="mx-2 text-[#D1D5DB]">&middot;</span>
                {wf.installs.toLocaleString()} installs
                <span className="mx-2 text-[#D1D5DB]">&middot;</span>
                <StarRating rating={wf.rating} />
              </p>
            </div>
          </div>

          {wf.tagline && (
            <p className="text-lg font-medium text-[#374151]">{wf.tagline}</p>
          )}
        </div>

        {/* Tab navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Tab content + sidebar */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 min-w-0 lg:max-w-[calc(100%-21rem)]">
            {activeTab === "overview" && <OverviewTab wf={wf} />}
            {activeTab === "how-it-works" && <HowItWorksTab wf={wf} />}
            {activeTab === "setup" && <SetupTab wf={wf} />}
            {activeTab === "reviews" && <ReviewsTab wf={wf} />}
          </div>
          <Sidebar wf={wf} />
        </div>
      </div>
    </div>
  );
}
