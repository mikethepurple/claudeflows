"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import InstallButton from "@/components/install-button";
import DifficultyBadge from "@/components/difficulty-badge";
import TokenEstimate from "@/components/token-estimate";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";
import type { Workflow } from "@/lib/types";

interface PageProps {
  params: Promise<{ name: string }>;
}

function findWorkflow(name: string) {
  return SAMPLE_WORKFLOWS.find((wf) => wf.name === name);
}

/* ─── Category colors ─── */

const CATEGORY_COLORS: Record<string, string> = {
  business: "bg-blue-900/40 text-blue-300",
  development: "bg-green-900/40 text-green-300",
  data: "bg-cyan-900/40 text-cyan-300",
  research: "bg-yellow-900/40 text-yellow-300",
  marketing: "bg-pink-900/40 text-pink-300",
  design: "bg-purple-900/40 text-purple-300",
  operations: "bg-orange-900/40 text-orange-300",
  productivity: "bg-indigo-900/40 text-indigo-300",
  finance: "bg-emerald-900/40 text-emerald-300",
};

/* ─── File Tree Preview ─── */

interface FileNode {
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
}

function buildFileTree(wf: Workflow): FileNode[] {
  const tree: FileNode[] = [];

  // Skills as prompt files
  const prompts: FileNode[] = wf.skills.map((s) => ({
    name: `${s.name}.md`,
    type: "file" as const,
  }));
  if (prompts.length > 0) {
    tree.push({ name: "skills", type: "folder", children: prompts });
  }

  // Steps as methodology folders
  if (wf.steps && wf.steps.length > 0) {
    const stepFolders = wf.steps.map((step, i) => {
      const methods: FileNode[] = Array.from(
        { length: step.methodologyCount || 1 },
        (_, j) => ({ name: `method-${j + 1}.md`, type: "file" as const })
      );
      return {
        name: `${i + 1}-${step.name.toLowerCase().replace(/\s+/g, "-")}`,
        type: "folder" as const,
        children: methods,
      };
    });
    tree.push({ name: "methodologies", type: "folder", children: stepFolders });
  }

  // Standard files
  tree.push({ name: "workflow.json", type: "file" });
  tree.push({ name: "CLAUDE.md", type: "file" });

  return tree;
}

function FileTreePreview({ wf }: { wf: Workflow }) {
  const tree = buildFileTree(wf);

  function renderNode(node: FileNode, depth: number, isLast: boolean) {
    const indent = depth * 16;
    const isFolder = node.type === "folder";
    return (
      <div key={`${depth}-${node.name}`}>
        <div
          className="flex items-center gap-1.5 py-[3px] text-[11px] leading-tight"
          style={{ paddingLeft: `${indent}px` }}
        >
          {isFolder ? (
            <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 text-[rgba(255,255,255,0.36)] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          )}
          <span className={isFolder ? "text-[rgba(255,255,255,0.92)] font-medium" : "text-[rgba(255,255,255,0.60)]"}>
            {node.name}
          </span>
        </div>
        {isFolder && node.children && node.children.map((child, i) =>
          renderNode(child, depth + 1, i === node.children!.length - 1)
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[#1e1e2e] p-4 font-mono overflow-hidden">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[10px] text-[rgba(255,255,255,0.36)]">{wf.name}/</span>
      </div>
      {tree.map((node, i) => renderNode(node, 0, i === tree.length - 1))}
    </div>
  );
}

/* ─── Terminal Preview ─── */

function TerminalPreview({ wf }: { wf: Workflow }) {
  const lines: { type: "prompt" | "output" | "dim" | "success" | "info"; text: string }[] = [];

  lines.push({ type: "prompt", text: `$ claude` });
  lines.push({ type: "dim", text: `Claude Code v1.0.22` });
  lines.push({ type: "prompt", text: `> /${wf.skills[0]?.name || "start"}` });
  lines.push({ type: "info", text: `Running ${wf.displayName}...` });

  if (wf.steps && wf.steps.length > 0) {
    const shown = wf.steps.slice(0, 3);
    shown.forEach((step, i) => {
      lines.push({ type: "output", text: `Step ${i + 1}/${wf.steps!.length}: ${step.name}` });
      if (step.methodologyCount > 1) {
        lines.push({ type: "dim", text: `  Spawning ${step.methodologyCount} research agents...` });
      }
      lines.push({ type: "success", text: `  ✓ Complete` });
    });
    if (wf.steps.length > 3) {
      lines.push({ type: "dim", text: `  ... ${wf.steps.length - 3} more steps` });
    }
  } else {
    lines.push({ type: "output", text: `Analyzing inputs...` });
    lines.push({ type: "output", text: `Generating deliverables...` });
  }

  lines.push({ type: "success", text: `✓ Done — results saved to ./output/` });

  return (
    <div className="rounded-lg bg-[#1e1e2e] p-4 font-mono overflow-hidden">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[10px] text-[rgba(255,255,255,0.36)]">Terminal</span>
      </div>
      <div className="flex flex-col gap-[2px]">
        {lines.map((line, i) => (
          <div key={i} className={`text-[11px] leading-relaxed ${
            line.type === "prompt" ? "text-green-400" :
            line.type === "success" ? "text-emerald-400" :
            line.type === "info" ? "text-blue-400" :
            line.type === "dim" ? "text-[rgba(255,255,255,0.36)]" :
            "text-[rgba(255,255,255,0.60)]"
          }`}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */

function Sidebar({ wf }: { wf: Workflow }) {
  const mcpEntries = Object.entries(wf.mcp);

  return (
    <aside className="w-full shrink-0 lg:w-80">
      <div className="sticky top-24 flex flex-col gap-5">
        {/* Install CTA */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-5">
          <InstallButton workflowName={wf.name} />
        </div>

        {/* About This Skill */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
            About This Skill
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[rgba(255,255,255,0.60)]">Price</span>
              <span className="inline-flex items-center rounded-full bg-green-900/40 px-2.5 py-0.5 text-xs font-semibold text-green-300">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[rgba(255,255,255,0.60)]">Installs</span>
              <span className="text-sm font-medium text-[rgba(255,255,255,0.92)]">{wf.installs.toLocaleString()}</span>
            </div>
            {wf.difficulty && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[rgba(255,255,255,0.60)]">Difficulty</span>
                <DifficultyBadge difficulty={wf.difficulty} />
              </div>
            )}
            {wf.estimatedTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[rgba(255,255,255,0.60)]">Per-use time</span>
                <span className="text-sm text-[rgba(255,255,255,0.92)]">{wf.estimatedTime}</span>
              </div>
            )}
            {wf.setupTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[rgba(255,255,255,0.60)]">Setup time</span>
                <span className="text-sm text-[rgba(255,255,255,0.92)]">{wf.setupTime}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[rgba(255,255,255,0.60)]">Version</span>
              <code className="text-sm font-mono text-[rgba(255,255,255,0.60)]">v{wf.version}</code>
            </div>
            {/* Integrations */}
            {mcpEntries.length > 0 && (
              <>
                <div className="mt-1 mb-1 border-t border-[rgba(255,255,255,0.06)]" />
                <p className="text-xs font-medium text-[rgba(255,255,255,0.36)] uppercase tracking-wider">Integrations</p>
                {mcpEntries.map(([name, config]) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${config.required ? "bg-[#6366F1]" : "bg-[rgba(255,255,255,0.20)]"}`} />
                    <span className="text-sm text-[rgba(255,255,255,0.60)]">{config.plainName || name}</span>
                    <span className="ml-auto text-xs text-[rgba(255,255,255,0.36)]">{config.required ? "required" : "optional"}</span>
                  </div>
                ))}
              </>
            )}
            {/* Source code */}
            <div className="mt-1 border-t border-[rgba(255,255,255,0.06)] pt-2">
              <a href={wf.repository} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                View source code
              </a>
            </div>
          </div>
        </div>

        {/* Token Estimate — if exists */}
        {wf.tokenEstimate && (
          <div className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-5">
            <TokenEstimate estimate={wf.tokenEstimate} steps={wf.steps} />
          </div>
        )}

        {/* Creator */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">Creator</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6366F1] text-sm font-bold text-white">
              {wf.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <Link href={`/u/${wf.author.name}`} className="text-sm font-medium text-[rgba(255,255,255,0.92)] hover:text-[#6366F1] transition-colors">{wf.author.name}</Link>
              <a href={`https://github.com/${wf.author.github}`} target="_blank" rel="noopener noreferrer" className="block text-xs text-[rgba(255,255,255,0.36)] hover:text-[rgba(255,255,255,0.60)] transition-colors">@{wf.author.github}</a>
            </div>
          </div>
          <Link href={`/u/${wf.author.name}`} className="block text-center text-xs text-[#6366F1] hover:underline">View all by this creator</Link>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {wf.tags.map((tag) => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-lg bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-xs text-[rgba(255,255,255,0.60)] transition-colors hover:bg-[rgba(99,102,241,0.15)] hover:text-[#6366F1]">{tag}</Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Page ─── */

export default function WorkflowDetailPage({ params }: PageProps) {
  const { name } = use(params);
  const wf = findWorkflow(name);

  if (!wf) notFound();

  const otherWorkflows = SAMPLE_WORKFLOWS.filter(
    (w) => w.author.name === wf.author.name && w.name !== wf.name
  );

  // Parse "what you get" into short bullet points
  const deliverables = wf.outputDescription
    ? wf.outputDescription
        .split(/[,;.]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5 && s.length < 120)
        .slice(0, 6)
    : [];

  return (
    <div className="bg-[#13111C]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] bg-[#1A1828]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-5 flex items-center gap-2 text-sm text-[rgba(255,255,255,0.36)]">
            <Link href="/" className="hover:text-[#6366F1] transition-colors">Skills</Link>
            <span>/</span>
            <Link href={`/search?q=${encodeURIComponent(wf.category)}`} className="hover:text-[#6366F1] transition-colors capitalize">{wf.category}</Link>
            <span>/</span>
            <span className="text-[rgba(255,255,255,0.60)]">{wf.displayName}</span>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(99,102,241,0.15)] text-2xl">
              <span className="font-mono font-bold text-[#6366F1]">{wf.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[rgba(255,255,255,0.92)] sm:text-3xl">{wf.displayName}</h1>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[wf.category] ?? "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.60)]"}`}>{wf.category}</span>
              </div>
              <p className="mt-1 text-sm text-[rgba(255,255,255,0.60)]">
                by <Link href={`/u/${wf.author.name}`} className="text-[#6366F1] hover:underline">{wf.author.name}</Link>
                <span className="mx-2 text-[rgba(255,255,255,0.20)]">&middot;</span>
                {wf.installs.toLocaleString()} installs
              </p>
            </div>
          </div>

          {wf.tagline && (
            <p className="text-lg font-medium text-[rgba(255,255,255,0.60)]">{wf.tagline}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 pb-24 lg:pb-0">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 min-w-0 lg:max-w-[calc(100%-21rem)]">

            {/* About — short description, always shown */}
            <section className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">About</h2>
              <p className="text-base leading-relaxed text-[rgba(255,255,255,0.60)]">{wf.description}</p>
            </section>

            {/* Preview: File tree + Terminal */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-[rgba(255,255,255,0.92)]">Preview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <figure>
                  <FileTreePreview wf={wf} />
                  <figcaption className="mt-2 text-center text-xs text-[rgba(255,255,255,0.36)]">
                    Skill file structure
                  </figcaption>
                </figure>
                <figure>
                  <TerminalPreview wf={wf} />
                  <figcaption className="mt-2 text-center text-xs text-[rgba(255,255,255,0.36)]">
                    Running in Claude Code
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* What You Get — short bullets, ONLY if outputDescription exists */}
            {deliverables.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">What You Get</h2>
                <ul className="flex flex-col gap-2">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[rgba(255,255,255,0.60)]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements — ONLY if MCP or env vars exist */}
            {(Object.keys(wf.mcp).length > 0 || (wf.env && Object.keys(wf.env).length > 0)) && (
              <section className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">Requirements</h2>
                <div className="flex flex-col gap-2">
                  {Object.entries(wf.mcp).map(([name, config]) => (
                    <div key={name} className="flex items-center gap-2.5">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-md text-white text-[10px] ${config.required ? "bg-[#6366F1]" : "bg-[rgba(255,255,255,0.20)]"}`}>
                        {config.required ? "✓" : "?"}
                      </span>
                      <span className="text-sm text-[rgba(255,255,255,0.60)]">{config.plainName || name}</span>
                      <span className="text-xs text-[rgba(255,255,255,0.36)]">{config.required ? "required" : "optional"}</span>
                    </div>
                  ))}
                  {wf.env && Object.entries(wf.env).map(([name, config]) => (
                    <div key={name} className="flex items-center gap-2.5">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-md text-white text-[10px] ${config.required ? "bg-[#6366F1]" : "bg-[rgba(255,255,255,0.20)]"}`}>
                        {config.required ? "✓" : "?"}
                      </span>
                      <span className="text-sm font-mono text-[rgba(255,255,255,0.60)]">{name}</span>
                      <span className="text-xs text-[rgba(255,255,255,0.36)]">{config.required ? "required" : "optional"}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Commands — compact inline list, ONLY if multiple skills */}
            {wf.skills.length > 1 && (
              <section className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">Commands</h2>
                <div className="flex flex-wrap gap-2">
                  {wf.skills.map((skill) => (
                    <div key={skill.name} className="group relative">
                      <code className="rounded-lg bg-[rgba(0,0,0,0.45)] px-3 py-1.5 text-xs font-mono text-[rgba(255,255,255,0.92)] cursor-default">
                        /{skill.name}
                      </code>
                      <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover:block w-48 rounded-lg bg-[rgba(0,0,0,0.45)] px-3 py-2 text-xs text-[rgba(255,255,255,0.60)] shadow-lg">
                        {skill.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* More from this creator */}
            {otherWorkflows.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">More From This Creator</h2>
                  <Link href={`/u/${wf.author.name}`} className="text-sm text-[#6366F1] hover:underline">View all</Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {otherWorkflows.map((other) => (
                    <Link key={other.name} href={`/w/${other.name}`} className="flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 transition-all hover:border-[rgba(99,102,241,0.30)] hover:bg-[rgba(255,255,255,0.05)]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.15)]">
                        <span className="font-mono font-bold text-[#6366F1]">{other.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">{other.displayName}</h4>
                        {other.tagline && <p className="mt-0.5 text-xs text-[rgba(255,255,255,0.60)] line-clamp-2">{other.tagline}</p>}
                        <span className="mt-1 block text-xs text-[rgba(255,255,255,0.36)]">{other.installs.toLocaleString()} installs</span>
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
      <div className="fixed bottom-0 left-0 right-0 border-t border-[rgba(255,255,255,0.10)] bg-[#1A1828]/95 backdrop-blur-sm p-4 lg:hidden z-40">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={() => { navigator.clipboard.writeText(`claudeflows install ${wf.name}`); }}
            className="flex-1 rounded-xl bg-[#6366F1] py-3 text-sm font-medium text-white hover:bg-[#4F46E5] transition-colors"
          >
            Copy install command
          </button>
          <Link
            href={`/consulting?from=${encodeURIComponent(wf.name)}`}
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] py-3 text-sm font-medium text-[rgba(255,255,255,0.60)] text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors"
          >
            Get help
          </Link>
        </div>
      </div>
    </div>
  );
}
