"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import WorkflowCard from "@/components/workflow-card";
import CategoryPills from "@/components/category-pills";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";

/* ─── CLI Install Block ─── */
function CliBlock() {
  const [copied, setCopied] = useState(false);
  const command = "npm install -g claudeflows";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = command;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [command]);

  return (
    <div className="mx-auto max-w-[480px] overflow-hidden rounded-[10px] border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-auto text-[11px] text-[rgba(255,255,255,0.20)] font-sans">
          Terminal
        </span>
      </div>
      <div className="flex items-center gap-1 px-4 py-3.5">
        <span className="select-none text-[rgba(255,255,255,0.30)] font-mono text-sm">
          $
        </span>
        <span className="flex-1 font-mono text-sm text-[rgba(255,255,255,0.92)]">
          {command}
        </span>
        <button
          onClick={handleCopy}
          className="shrink-0 rounded p-1 text-[rgba(255,255,255,0.36)] transition-colors hover:text-[rgba(255,255,255,0.80)]"
          aria-label="Copy command"
        >
          {copied ? (
            <svg className="h-4 w-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </button>
      </div>
      <div className="px-4 pb-3 text-[12px] text-[rgba(255,255,255,0.36)]">
        Paste in your terminal and press Enter.{" "}
        <a
          href="https://nodejs.org/en/download"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[rgba(255,255,255,0.60)]"
        >
          Don&apos;t have Node? Install it here &rarr;
        </a>
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[900px] px-4 pb-16 pt-16 sm:px-6 sm:pt-24 text-center">
        <p className="mb-4 text-base text-[rgba(255,255,255,0.60)]">
          Hand-picked AI automations. Tested in production. Ready to install.
        </p>

        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-[rgba(255,255,255,0.92)] sm:text-6xl">
          Not another{" "}
          <br className="hidden sm:block" />
          AI skills directory.{" "}
          <br className="hidden sm:block" />
          <span className="text-[#6366F1]">These actually work.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg text-[rgba(255,255,255,0.60)] leading-relaxed">
          Full automation flows with smart installers &mdash; not one-file skills
          that break on first run. Built and battle-tested by someone who ships AI every day.
        </p>

        <CliBlock />

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/skills"
            className="rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
          >
            Browse Flows
          </Link>
          <Link
            href="/consulting"
            className="rounded-lg border border-[rgba(255,255,255,0.16)] px-6 py-3 text-sm font-medium text-[rgba(255,255,255,0.80)] transition-all hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.28)]"
          >
            See consulting packages
          </Link>
        </div>

        <p className="mt-5 text-xs text-[rgba(255,255,255,0.36)]">
          One-time pricing &middot; Lifetime updates &middot; 30-day refund
        </p>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Install the CLI",
      desc: "One command adds CuratedFlows to your terminal. Takes 30 seconds.",
    },
    {
      num: "2",
      title: "Pick a flow",
      desc: "Browse curated automations for research, operations, marketing, and more.",
    },
    {
      num: "3",
      title: "Run it",
      desc: "The flow's smart installer sets everything up. Tell Claude what you need \u2014 it handles the rest.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="py-8"><div className="section-divider" /></div>
      <h2 className="mb-12 text-center text-2xl font-semibold text-[rgba(255,255,255,0.92)] sm:text-3xl">
        How it works
      </h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(99,102,241,0.15)] text-sm font-semibold text-[#6366F1]">
              {s.num}
            </div>
            <h3 className="mb-2 text-base font-semibold text-[rgba(255,255,255,0.92)]">
              {s.title}
            </h3>
            <p className="text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Blueprint Tips ─── */
function BlueprintTips() {
  const tips = [
    {
      problem: "Claude lies to your face",
      fix: "\"That file doesn't exist.\" It does — Claude just didn't look.",
      rule: "Verify before asserting absence. Before saying \"X doesn't exist\" — actually check.",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      problem: "You lose hours of work",
      fix: "Session crashes, context resets, progress gone.",
      rule: "After completing a feature or making a major decision, commit all changes and write a summary to LAST_SESSION.md. Don't ask — just do it.",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      problem: "Your project becomes a mess",
      fix: "After a few sessions, Claude dumps files everywhere and you can't find anything.",
      rule: "Keep project roots clean. Use subfolders: plans/, research/, docs/. Name for searchability, not convenience.",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative mt-8 overflow-hidden">
      {/* Full-bleed tinted background to break visual rhythm */}
      <div className="absolute inset-0 bg-[rgba(99,102,241,0.03)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.15)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.15)] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#6366F1]">
            Free — no install needed
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-[rgba(255,255,255,0.92)] sm:text-3xl">
            3 quick wins for your CLAUDE.md
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.60)]">
            Copy these into your project right now. Just better Claude Code sessions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#13111C] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(239,68,68,0.10)] text-[rgba(239,68,68,0.60)]">
                {tip.icon}
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-[rgba(255,255,255,0.92)]">
                {tip.problem}
              </h3>
              <p className="mb-4 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
                {tip.fix}
              </p>
              <div className="rounded-lg bg-[rgba(0,0,0,0.4)] border border-[rgba(99,102,241,0.12)] px-3 py-2.5">
                <p className="text-[11px] font-medium text-[#6366F1] mb-1.5">Add this to your CLAUDE.md</p>
                <p className="font-mono text-[11px] text-[rgba(255,255,255,0.70)] leading-relaxed">
                  {tip.rule}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/w/blueprint"
            className="inline-flex items-center gap-2 rounded-lg bg-[rgba(99,102,241,0.10)] border border-[rgba(99,102,241,0.20)] px-5 py-2.5 text-sm font-medium text-[#6366F1] transition-all hover:bg-[rgba(99,102,241,0.18)] hover:border-[rgba(99,102,241,0.35)]"
          >
            Get the full Blueprint — 12 rules that fix all of this
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Consulting CTA ─── */
function ConsultingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="py-8"><div className="section-divider" /></div>
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 text-center sm:p-12">
        <h2 className="mb-3 text-2xl font-semibold text-[rgba(255,255,255,0.92)] sm:text-3xl">
          Need something custom?
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-base text-[rgba(255,255,255,0.60)] leading-relaxed">
          A prediction market platform, an AI vision prototype, and a
          venture validation pipeline &mdash; all built with these same flows. Get one built for your team.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/consulting"
            className="rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
          >
            See packages &mdash; starting at $500
          </Link>
        </div>
        <p className="mt-4 text-xs text-[rgba(255,255,255,0.36)]">
          Sprint (2hr) &middot; Full Setup (3-5 days) &middot; Architecture (1-2 weeks)
        </p>
      </div>
    </section>
  );
}

/* ─── Email Capture ─── */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source_skill: "homepage" }),
      });
      setSubmitted(true);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="py-8"><div className="section-divider" /></div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-2 text-xl font-semibold text-[rgba(255,255,255,0.92)]">
          Start free. See what you&apos;re getting first.
        </h2>
        <p className="mb-6 text-sm text-[rgba(255,255,255,0.60)]">
          Get the /checkpoint flow &mdash; free, forever. No credit card.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-sm text-[#10B981]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Check your inbox &mdash; the flow is on its way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.36)] outline-none focus:border-[rgba(99,102,241,0.50)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-lg bg-[#6366F1] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] disabled:opacity-50"
            >
              {loading ? "..." : "Get the free flow"}
            </button>
          </form>
        )}

        <p className="mt-3 text-xs text-[rgba(255,255,255,0.36)]">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

/* ─── Featured Skills Grid ─── */
function FeaturedSkills() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredWorkflows = SAMPLE_WORKFLOWS.filter((w) => {
    if (selectedCategory === "all") return true;
    return w.category === selectedCategory;
  }).slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-[rgba(255,255,255,0.92)] sm:text-3xl">
          Production-proven flows
        </h2>
        <Link
          href="/skills"
          className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors"
        >
          View all flows &rarr;
        </Link>
      </div>

      <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkflows.map((wf) => (
          <WorkflowCard key={wf.name} workflow={wf} />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSkills />
      <HowItWorks />
      <BlueprintTips />
      <ConsultingCta />
      <EmailCapture />
    </>
  );
}
