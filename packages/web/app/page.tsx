"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import WorkflowCard from "@/components/workflow-card";
import CategoryPills, { mapCategoryToJobFunction } from "@/components/category-pills";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";

type SortOption = "popular" | "new" | "rating";

function CompactHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-800/[0.04] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="mb-3 text-sm font-medium text-neutral-400 uppercase tracking-wider">
            AI Skills Marketplace
          </p>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Get real work done with{" "}
            <span className="text-orange-800">
              ready-made AI skills
            </span>
          </h1>

          <p className="mb-6 text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Competitive analysis in 30 minutes. A validated business plan by Friday.
            Research that used to take days, done while you get coffee.
          </p>

          {/* How it works in one line */}
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
              <span className="font-mono text-xs text-neutral-500">1</span>
              Pick a skill
            </span>
            <svg className="h-3 w-3 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
              <span className="font-mono text-xs text-neutral-500">2</span>
              Tell it your task
            </span>
            <svg className="h-3 w-3 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
              <span className="font-mono text-xs text-neutral-500">3</span>
              Get deliverables
            </span>
          </div>

          {/* Two CTAs side by side */}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/search"
              className="inline-flex rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Browse Skills
            </Link>
            <Link
              href="/consulting"
              className="inline-flex rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
            >
              Get this set up for me
            </Link>
          </div>

          <p className="mt-3 text-sm text-neutral-400">
            or{" "}
            <Link
              href="/publish"
              className="font-medium text-orange-800 hover:text-orange-900 transition-colors"
            >
              List your own skill &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function SortTabs({
  active,
  onChange,
}: {
  active: SortOption;
  onChange: (s: SortOption) => void;
}) {
  const options: { value: SortOption; label: string }[] = [
    { value: "popular", label: "Popular" },
    { value: "new", label: "New" },
    { value: "rating", label: "Top Rated" },
  ];

  return (
    <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
            active === opt.value
              ? "bg-neutral-900 text-white shadow-sm"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function UseCasesSection() {
  const useCases = [
    {
      tag: "Research",
      headline: "Competitive analysis in 30 minutes",
      without: "3 days of Googling",
      withSkill: "30 min, 20+ companies profiled",
      link: "/w/scout",
    },
    {
      tag: "Strategy",
      headline: "Validated business plan by Friday",
      without: "Weeks of spreadsheets and guesswork",
      withSkill: "6-step process, adversarial testing",
      link: "/w/venture-studio",
    },
    {
      tag: "Engineering",
      headline: "Code review on autopilot",
      without: "Context switching, missed patterns",
      withSkill: "Deep review covering security, performance, patterns",
      link: "/search",
    },
    {
      tag: "Operations",
      headline: "Project state saved automatically",
      without: "Losing context between sessions",
      withSkill: "Progress tracked, resumable anytime",
      link: "/w/save",
    },
  ];

  return (
    <section className="border-y border-neutral-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">What can I use this for?</h2>
          <p className="mt-2 text-neutral-500">
            Real outcomes, not feature lists
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((uc) => (
            <Link
              key={uc.link}
              href={uc.link}
              className="group rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-neutral-300 hover:bg-white hover:shadow-sm"
            >
              <span className="mb-2 inline-block rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                {uc.tag}
              </span>
              <p className="mb-3 text-sm font-semibold text-neutral-900 group-hover:text-orange-800 transition-colors">
                {uc.headline}
              </p>
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex items-start gap-2 text-neutral-400">
                  <span className="mt-0.5 shrink-0 text-xs">Without:</span>
                  <span>{uc.without}</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-600">
                  <span className="mt-0.5 shrink-0 text-xs font-medium text-orange-800">With:</span>
                  <span>{uc.withSkill}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultingCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="rounded-2xl bg-neutral-900 p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Not sure where to start?</h2>
        <p className="text-neutral-400 mb-6 max-w-lg mx-auto">
          We&apos;ll set up the right AI skills for your team, train your people, and make sure it actually works. First consultation is free.
        </p>
        <Link href="/consulting" className="inline-flex rounded-xl bg-orange-700 px-6 py-3 text-sm font-medium text-white hover:bg-orange-800 transition-colors">
          Book a free consultation
        </Link>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Pick a skill",
      description:
        "Browse by what you need done — research, analysis, content, code review. Each skill is tested and documented.",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Tell it your task",
      description:
        "Just describe what you need in plain English. No coding, no configuration, no prompt engineering.",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Get deliverables",
      description:
        "Reports, analysis, validated plans — real output you can use immediately. Delivered in minutes, not days.",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-y border-neutral-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">How it works</h2>
          <p className="mt-2 text-neutral-500">
            From &ldquo;I need this done&rdquo; to done
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                {step.icon}
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                Step {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { label: "Skills", value: "14" },
    { label: "Installs", value: "529" },
    { label: "Creators", value: "3" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg font-bold text-neutral-900">{stat.value}</div>
            <div className="text-xs text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let workflows = [...SAMPLE_WORKFLOWS];

    if (category !== "all") {
      workflows = workflows.filter(
        (wf) => mapCategoryToJobFunction(wf.category) === category
      );
    }

    switch (sort) {
      case "popular":
        workflows.sort((a, b) => b.installs - a.installs);
        break;
      case "new":
        workflows.reverse();
        break;
      case "rating":
        workflows.sort((a, b) => b.rating - a.rating);
        break;
    }

    return workflows;
  }, [category, sort]);

  return (
    <>
      <CompactHero />

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <CategoryPills selected={category} onSelect={setCategory} />

        <div className="mt-6 mb-4 flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
          </span>
          <SortTabs active={sort} onChange={setSort} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((wf) => (
            <WorkflowCard key={wf.name} workflow={wf} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-neutral-500">
            No skills in this category yet.
          </div>
        )}
      </section>

      <UseCasesSection />
      <ConsultingCTA />
      <HowItWorksSection />
      <TrustBar />
    </>
  );
}
