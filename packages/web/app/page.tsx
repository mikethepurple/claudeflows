"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import WorkflowCard from "@/components/workflow-card";
import CategoryPills from "@/components/category-pills";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";

type SortOption = "popular" | "new" | "rating";

function CompactHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8590C]/[0.06] via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#E8590C]/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
            AI Workflows That Actually{" "}
            <span className="bg-gradient-to-r from-[#E8590C] to-[#16A34A] bg-clip-text text-transparent">
              Get Things Done
            </span>
          </h1>

          {/* Value prop pills */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8590C]/10 px-3.5 py-1.5 text-xs font-medium text-[#E8590C]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Skip hours of prompt engineering
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-700">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Production-tested by real teams
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-700">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
              One command to install
            </span>
          </div>

          {/* Search bar */}
          <Link
            href="/search"
            className="mx-auto flex max-w-md items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-[#9CA3AF] shadow-sm transition-all hover:border-[#E8590C]/30 hover:shadow-md"
          >
            <svg
              className="h-4 w-4 shrink-0"
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
            Search workflows...
          </Link>

          {/* Dual CTA */}
          <p className="mt-3 text-sm text-[#9CA3AF]">
            or{" "}
            <Link
              href="/publish"
              className="font-medium text-[#E8590C] hover:text-[#E8590C]/80 transition-colors"
            >
              Share your own workflow &rarr;
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
    <div className="flex gap-1 rounded-lg bg-[#F5F3F0] p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
            active === opt.value
              ? "bg-[#E8590C] text-white shadow-sm"
              : "text-[#6B7280] hover:text-[#1A1A1A]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FeaturedCreators() {
  // Deduplicate authors from sample workflows
  const creatorsMap = new Map<string, { name: string; github: string; bio: string; count: number }>();
  for (const wf of SAMPLE_WORKFLOWS) {
    const key = wf.author.github;
    const existing = creatorsMap.get(key);
    if (existing) {
      existing.count++;
    } else {
      creatorsMap.set(key, {
        name: wf.author.name,
        github: wf.author.github,
        bio: wf.author.bio || "Building AI workflows for the community.",
        count: 1,
      });
    }
  }
  const creators = Array.from(creatorsMap.values());

  const AVATAR_GRADIENTS = [
    "from-orange-400 to-red-500",
    "from-green-400 to-emerald-500",
    "from-pink-400 to-rose-500",
    "from-blue-400 to-indigo-500",
  ];

  return (
    <section className="bg-white border-y border-black/[0.06]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Featured Creators</h2>
          <p className="mt-2 text-[#6B7280]">
            The people building workflows you can trust
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {creators.map((creator, i) => (
            <div
              key={creator.github}
              className="flex flex-col items-center rounded-xl border border-black/[0.06] bg-[#FAF9F7] p-6 text-center transition-all hover:border-[#E8590C]/30 hover:shadow-sm"
            >
              <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} text-white text-lg font-bold`}
              >
                {creator.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1A]">
                {creator.name}
              </h3>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">@{creator.github}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">
                {creator.bio}
              </p>
              <p className="mt-3 text-xs font-medium text-[#E8590C]">
                {creator.count} workflow{creator.count !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Find",
      description:
        "Browse workflows by category or search for what you need. Each one is built for a specific task.",
      icon: (
        <svg
          className="h-6 w-6"
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
      number: "02",
      title: "Set up",
      description:
        "One command installs everything. A plain-English setup guide walks you through any connections needed.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Go",
      description:
        "Tell the AI what you need and it handles the work. You guide the direction, it does the heavy lifting.",
      icon: (
        <svg
          className="h-6 w-6"
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
    <section className="border-y border-black/[0.06] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">How It Works</h2>
          <p className="mt-2 text-[#6B7280]">
            From discovery to results in three steps
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8590C]/10 text-[#E8590C]">
                {step.icon}
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E8590C]">
                Step {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">
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
    { label: "Workflows", value: "4" },
    { label: "Installs", value: "529" },
    { label: "Creators", value: "3" },
    { label: "Categories", value: "4" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg font-bold text-[#1A1A1A]">{stat.value}</div>
            <div className="text-xs text-[#9CA3AF]">{stat.label}</div>
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
      workflows = workflows.filter((wf) => wf.category === category);
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
          <span className="text-sm text-[#6B7280]">
            {filtered.length} workflow{filtered.length !== 1 ? "s" : ""}
          </span>
          <SortTabs active={sort} onChange={setSort} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((wf) => (
            <WorkflowCard key={wf.name} workflow={wf} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[#6B7280]">
            No workflows in this category yet.
          </div>
        )}
      </section>

      <FeaturedCreators />
      <HowItWorksSection />
      <TrustBar />
    </>
  );
}
