"use client";

import Link from "next/link";

const PACKAGES = [
  {
    name: "Sprint",
    price: "$500",
    bestFor: "Best for founders who need one specific workflow built and shipped this week.",
    cta: "Get started",
    ctaHref: "https://book.vimcal.com/p/misha/30minus",
    popular: false,
    features: [
      "2-hour Claude Code setup session",
      "1 custom automation flow built for your workflow",
      "CLAUDE.md + memory system configured",
      "30-day async support",
      "Works or we rebuild it",
    ],
    delivery: "Same day",
  },
  {
    name: "Full Setup",
    price: "$2,000",
    bestFor: "Best for teams ready to run Claude Code across their whole operation — start to finish.",
    cta: "Get started",
    ctaHref: "https://book.vimcal.com/p/misha/30minus",
    popular: true,
    features: [
      "Complete Claude Code workspace setup",
      "3-5 custom automation flows built for your needs",
      "MCP servers configured",
      "Memory system + session persistence",
      "Team onboarding documentation",
      "60-day async support",
    ],
    delivery: "3-5 days",
  },
  {
    name: "Architecture",
    price: "$5,000+",
    bestFor: "Best for CTOs and leads who need a strategic Claude Code roadmap before implementation.",
    cta: "Book a call",
    ctaHref: "https://book.vimcal.com/p/misha/30minus",
    popular: false,
    features: [
      "Multi-agent system design + build",
      "Custom methodology development",
      "Full integration with your stack",
      "Architecture documentation",
      "Production deployment support",
      "90-day async support",
    ],
    delivery: "1-2 weeks",
  },
];

const ADDONS = [
  { name: "Extra flow built", price: "+$200", desc: "Per flow" },
  { name: "Async Slack support", price: "+$300/mo", desc: "30 days direct access" },
  { name: "Rush delivery (48hr)", price: "+$150-300", desc: "Sprint or Full Setup" },
  { name: "Architecture review call", price: "$350", desc: "Standalone 60-min session" },
  { name: "Documentation package", price: "+$250", desc: "Written handoff docs for team" },
];

const PROCESS = [
  { num: "1", title: "Book a call", desc: "Pick a package, schedule a free 30-minute intro call. We'll scope your needs." },
  { num: "2", title: "We build", desc: "I set up your Claude Code workspace with custom skills, memory, and workflows." },
  { num: "3", title: "You ship", desc: "Your team has a working AI workflow. Documentation included. Support continues async." },
];

const DIY_COMPARISON = [
  { label: "Time to first workflow", diy: "20-40 hours", cf: "Same day" },
  { label: "Cost of your time", diy: "$1,500-3,000 at $75/hr", cf: "$500 flat" },
  { label: "Ongoing support", diy: "Your problem", cf: "Included 30-60 days" },
  { label: "Reusable flow library", diy: "Start from scratch", cf: "Built in" },
  { label: "Documentation", diy: "You write it", cf: "Delivered with handoff" },
];

const FAQ = [
  {
    q: "What's included in the free intro call?",
    a: "30 minutes to understand your workflow, identify where Claude Code can help most, and scope a package. No pressure, no pitch deck."
  },
  {
    q: "Do I need to know how to code?",
    a: "No. That's the whole point. I set everything up, test it, and hand you a working system with documentation."
  },
  {
    q: "What if it doesn't work?",
    a: "Sprint and Full Setup come with a guarantee: if the delivered workflow doesn't solve the problem we scoped, I rebuild it at no extra cost."
  },
  {
    q: "Can I start with a Sprint and upgrade later?",
    a: "Yes — this is the most common path. Sprint proves the value, then Full Setup scales it across your operation."
  },
  {
    q: "How does async support work?",
    a: "Direct message access (Slack, email, or your preference). I respond within 24 hours on business days. For urgent issues, same-day."
  },
  {
    q: "Do you work with teams or just individuals?",
    a: "Both. Sprint is usually 1:1. Full Setup and Architecture include team onboarding and documentation."
  },
];

function PackageCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
        pkg.popular
          ? "border-[rgba(99,102,241,0.35)] bg-[rgba(99,102,241,0.08)] scale-[1.02]"
          : "border-[rgba(255,255,255,0.10)] bg-transparent"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6366F1] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">{pkg.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-[rgba(255,255,255,0.92)]">{pkg.price}</span>
        <span className="text-sm text-[rgba(255,255,255,0.36)]">/ one-time</span>
      </div>
      <p className="mt-3 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">{pkg.bestFor}</p>
      <p className="mt-1 text-xs text-[rgba(255,255,255,0.36)]">Delivery: {pkg.delivery}</p>

      <div className="my-5 h-px bg-[rgba(255,255,255,0.08)]" />

      <ul className="flex-1 space-y-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[rgba(255,255,255,0.60)]">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#6366F1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={pkg.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 block w-full rounded-lg py-3 text-center text-sm font-medium transition-all ${
          pkg.popular
            ? "bg-[#6366F1] text-white hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
            : "border border-[rgba(255,255,255,0.16)] text-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.28)]"
        }`}
      >
        {pkg.cta}
      </a>

      <p className="mt-3 text-center text-[11px] text-[rgba(255,255,255,0.36)]">
        No subscription &middot; 30-day guarantee
      </p>
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 text-center">
        <h1 className="text-3xl font-bold text-[rgba(255,255,255,0.92)] sm:text-5xl">
          Claude Code consulting, productized.
        </h1>
        <p className="mt-3 text-lg text-[rgba(255,255,255,0.60)]">
          Starting at $500
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base text-[rgba(255,255,255,0.60)] leading-relaxed">
          Setup in 2 hours, not 2 weeks. I build your AI automation workspace with custom
          flows, memory, and integrations &mdash; so your team ships from day one.
        </p>
        <a
          href="https://book.vimcal.com/p/misha/30minus"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
        >
          Book a free 30-min call
        </a>
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h3 className="mb-4 text-lg font-semibold text-[rgba(255,255,255,0.92)]">Add-ons</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[rgba(255,255,255,0.92)]">{a.name}</p>
                <p className="text-xs text-[rgba(255,255,255,0.36)]">{a.desc}</p>
              </div>
              <span className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">{a.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Retainer */}
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-12 sm:px-6">
        <div className="section-divider mb-12" />
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">Ongoing Partnership</h3>
              <p className="mt-1 text-sm text-[rgba(255,255,255,0.60)]">
                Best for operators who want ongoing build capacity without a full-time hire.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[rgba(255,255,255,0.92)]">$500-1,000</span>
              <span className="text-sm text-[rgba(255,255,255,0.36)]"> /month</span>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-[rgba(255,255,255,0.60)]">
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              New flows deployed monthly
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Async support + priority response
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              System maintenance + updates
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Quarterly architecture review ($1K tier)
            </li>
          </ul>
          <a
            href="https://book.vimcal.com/p/misha/30minus"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-lg border border-[rgba(255,255,255,0.16)] px-5 py-2.5 text-sm font-medium text-[rgba(255,255,255,0.80)] transition-all hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.28)]"
          >
            Apply for a retainer
          </a>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[rgba(255,255,255,0.92)]">
          Recent builds
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Prediction Market Platform",
              desc: "Full-stack React + Supabase + TRON blockchain. Markets, portfolios, leaderboards, AI predictions. Live in production.",
              tech: "Next.js, Supabase, TRON, 984 tests",
              time: "Built over 3 weeks",
            },
            {
              title: "AI Vision Prototype",
              desc: "Photo submission app with expert AI analysis. Users upload images, get detailed professional responses. Zero to live deployment.",
              tech: "Next.js, Supabase, Cloudflare Tunnel",
              time: "Zero to live in 4 hours",
            },
            {
              title: "Competitive Intelligence Pipeline",
              desc: "31 parallel research agents analyzed a market, produced synthesis reports, and identified strategic gaps. Used to redesign this very site.",
              tech: "31 agents, 3 waves, gap evaluation",
              time: "Research complete in 20 minutes",
            },
          ].map((cs) => (
            <div
              key={cs.title}
              className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5"
            >
              <h3 className="mb-2 text-base font-semibold text-[rgba(255,255,255,0.92)]">{cs.title}</h3>
              <p className="mb-3 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">{cs.desc}</p>
              <p className="text-xs text-[rgba(255,255,255,0.36)]">{cs.tech}</p>
              <p className="mt-1 text-xs font-medium text-[#6366F1]">{cs.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[rgba(255,255,255,0.92)]">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {PROCESS.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(99,102,241,0.15)] text-sm font-semibold text-[#6366F1]">
                {s.num}
              </div>
              <h3 className="mb-1 text-base font-semibold text-[rgba(255,255,255,0.92)]">{s.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Us vs DIY */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 text-center text-xl font-semibold text-[rgba(255,255,255,0.92)]">
          Build it yourself vs. Curated Flows
        </h2>
        <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.10)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
                <th className="px-4 py-3 text-left font-medium text-[rgba(255,255,255,0.60)]"></th>
                <th className="px-4 py-3 text-left font-medium text-[rgba(255,255,255,0.36)]">DIY</th>
                <th className="px-4 py-3 text-left font-medium text-[#6366F1]">Curated Flows</th>
              </tr>
            </thead>
            <tbody>
              {DIY_COMPARISON.map((row, i) => (
                <tr key={row.label} className={i < DIY_COMPARISON.length - 1 ? "border-b border-[rgba(255,255,255,0.06)]" : ""}>
                  <td className="px-4 py-3 text-[rgba(255,255,255,0.92)] font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-[rgba(255,255,255,0.36)]">{row.diy}</td>
                  <td className="px-4 py-3 text-[#10B981] font-medium">{row.cf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-xl font-semibold text-[rgba(255,255,255,0.92)]">
          Questions
        </h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5"
            >
              <h3 className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">{item.q}</h3>
              <p className="mt-2 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="mb-4 text-base text-[rgba(255,255,255,0.60)]">
            Fixed price. No hourly billing. No scope creep.
          </p>
          <a
            href="https://book.vimcal.com/p/misha/30minus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
          >
            Book a free 30-min call
          </a>
        </div>
      </section>
    </>
  );
}
