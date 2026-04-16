import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "10 Claude Code Skills I Install on Every Project — ClaudeFlows",
  description:
    "The exact setup I use across prediction markets, AI prototypes, and venture validation pipelines. Every skill explained with the problem it solves.",
  openGraph: {
    title: "10 Claude Code Skills I Install on Every Project",
    description: "The exact setup I use across prediction markets, AI prototypes, and venture validation pipelines.",
    images: [
      {
        url: "/api/og?title=10+Claude+Code+Skills+I+Install+on+Every+Project&subtitle=The+exact+setup+behind+a+prediction+market+platform%2C+an+AI+prototype%2C+and+a+48-agent+research+pipeline&category=development",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const SKILLS = [
  {
    name: "Verify before claiming",
    what: "A CLAUDE.md rule that forces Claude to actually check before saying something doesn't exist.",
    why: "Claude confidently told me a Supabase table didn't exist. It did. I'd already created it in a previous session. One wrong assumption cascaded into 30 minutes of debugging a non-problem.",
    rule: `Verify before asserting absence. Before saying "X doesn't exist" — actually check. Read the file, query the database, list the directory.`,
  },
  {
    name: "Auto-save session state",
    what: "At the end of every session, Claude commits all changes and writes a summary to LAST_SESSION.md.",
    why: "I lost an entire evening's architecture decisions when a session crashed. Next session, Claude had no idea what we'd decided. LAST_SESSION.md means the next session starts with full context.",
    rule: `After completing a feature or major decision, commit all changes and write a summary to LAST_SESSION.md with what was built, decisions made, and open threads.`,
  },
  {
    name: "File organization enforcement",
    what: "A rule that stops Claude from dumping .md files in the project root.",
    why: "After 20 sessions on one project, I had 47 markdown files in root. Plans, research, notes, reports — all flat in one directory. Took an hour to sort. Now Claude uses subfolders automatically.",
    rule: `Keep project roots clean. Don't dump .md files in root. Use subfolders: plans/, research/, docs/. Name for searchability, not convenience.`,
  },
  {
    name: "Decision tracking",
    what: "When I make a decision — reject an approach, pick a direction, set a constraint — Claude saves it immediately as a decision file.",
    why: "I rejected a database schema three sessions ago. Next week, Claude proposed the exact same schema. It had no memory of why we rejected it. Decision files fix this permanently.",
    rule: `Save decisions immediately. When the user makes a clear decision, create a decision file with what was decided, what was rejected, and why.`,
  },
  {
    name: "Security self-review",
    what: "Before any deploy, Claude runs a security check automatically.",
    why: "I deployed a Supabase project with a SECURITY DEFINER function that was world-callable. A fresh-context security agent caught it in 2 minutes. I now run this before every staging deploy.",
    rule: `Before any staging/production deploy, run a security review. If the session involved 5+ iterations on the same files, spawn a separate review agent with fresh context.`,
  },
  {
    name: "No deploy without consent",
    what: "Claude never deploys to production without me explicitly saying 'deploy.'",
    why: "Claude helpfully ran vercel --prod during a debugging session. On a Saturday. With broken auth middleware. Staging first, always, and only with verbal confirmation.",
    rule: `Never deploy to production without explicit user consent. Staging/preview first, always.`,
  },
  {
    name: "Try before delegating",
    what: "Before telling me I need to do something manually, Claude checks if it can do it itself.",
    why: 'Claude kept saying "you\'ll need to go to the Supabase dashboard to do this." Half the time, the Supabase CLI could do it. Now it tries first, delegates only when genuinely blocked.',
    rule: `Try before delegating. Before telling the user "you need to manually do X", check whether you can do it yourself with Bash, CLI tools, or MCP servers.`,
  },
  {
    name: "Wisdom extraction",
    what: "When a mistake is corrected, Claude captures the lesson as a reusable rule with a trigger condition.",
    why: "I fixed the same Supabase migration numbering bug three times across different projects. Now there's a wisdom file that triggers whenever Claude pushes migrations. Never happened again.",
    rule: `When a mistake is corrected, ask: is this specific to this project, or a general pattern? If general, create a wisdom entry with trigger condition, rule, and the incident that taught it.`,
  },
  {
    name: "Context loading on session start",
    what: "First thing every session: Claude reads the project's context bundle and STATE.md before responding.",
    why: "Without this, the first 10 minutes of every session is Claude rediscovering the project. With it, Claude starts with full context — architecture, decisions, current state, open threads.",
    rule: `On first action in a session, read the project's context file and STATE.md before responding. This ensures you start with both durable architecture knowledge and current state.`,
  },
  {
    name: "Append-only state files",
    what: "STATE.md is never overwritten — only specific sections are updated.",
    why: "A background agent deleted half of STATE.md by rewriting the whole file. It destroyed deployment records and pending action lists that other agents were reading. Append-only prevents this.",
    rule: `STATE.md is append-only. Use Edit to add/update specific sections — never Write/replace. Shared inter-agent state; deleting content breaks coordination.`,
  },
];

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-12">
        <p className="mb-3 text-sm text-[#6366F1] font-medium">
          April 2026
        </p>
        <h1 className="mb-4 text-3xl font-bold text-[rgba(255,255,255,0.92)] sm:text-4xl leading-tight">
          10 Claude Code skills I install on every project
        </h1>
        <p className="text-lg text-[rgba(255,255,255,0.60)] leading-relaxed">
          The exact setup I use across a prediction market platform, an AI vision prototype,
          and a 48-agent venture validation pipeline. Every skill explained with the
          problem it solves and the incident that made me add it.
        </p>
      </header>

      <div className="space-y-10">
        {SKILLS.map((skill, i) => (
          <section key={i}>
            <h2 className="mb-3 text-xl font-semibold text-[rgba(255,255,255,0.92)]">
              {i + 1}. {skill.name}
            </h2>
            <p className="mb-2 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
              <span className="font-medium text-[rgba(255,255,255,0.80)]">What it does:</span>{" "}
              {skill.what}
            </p>
            <p className="mb-3 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
              <span className="font-medium text-[rgba(255,255,255,0.80)]">Why I added it:</span>{" "}
              {skill.why}
            </p>
            <div className="rounded-lg bg-[rgba(0,0,0,0.4)] border border-[rgba(99,102,241,0.12)] px-4 py-3">
              <p className="text-[11px] font-medium text-[#6366F1] mb-1.5">Add this to your CLAUDE.md</p>
              <p className="font-mono text-[12px] text-[rgba(255,255,255,0.70)] leading-relaxed">
                {skill.rule}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-[rgba(99,102,241,0.20)] bg-[rgba(99,102,241,0.05)] p-6 text-center">
        <p className="mb-2 text-base font-semibold text-[rgba(255,255,255,0.92)]">
          Want all 10 pre-configured?
        </p>
        <p className="mb-4 text-sm text-[rgba(255,255,255,0.60)]">
          The Blueprint skill installs all of these plus memory persistence,
          auto-checkpoints, and wisdom extraction in one command.
        </p>
        <Link
          href="/w/blueprint"
          className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F46E5]"
        >
          Get the Blueprint
        </Link>
      </div>

      <footer className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
        <p className="text-sm text-[rgba(255,255,255,0.36)]">
          Written by Misha Erikov. These rules come from building 10+ projects with Claude Code
          over the last 3 months — including a full prediction market platform, an AI vision
          prototype deployed in 4 hours, and a 48-agent parallel research pipeline.
        </p>
        <div className="mt-4">
          <Link href="/blog" className="text-sm text-[#6366F1] hover:underline">
            &larr; Back to blog
          </Link>
        </div>
      </footer>
    </article>
  );
}
