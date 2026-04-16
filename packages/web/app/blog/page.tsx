import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold text-[rgba(255,255,255,0.92)]">
        Blog
      </h1>
      <p className="mb-12 text-base text-[rgba(255,255,255,0.60)]">
        How I actually use Claude Code &mdash; builds, lessons, and workflows.
      </p>

      <div className="space-y-6">
        <Link href="/blog/skills-i-install" className="block">
          <article className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all hover:border-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.06)]">
            <p className="mb-2 text-xs text-[#6366F1] font-medium">April 2026</p>
            <h2 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">
              10 Claude Code skills I install on every project
            </h2>
            <p className="mt-2 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
              The exact setup I use across prediction markets, AI prototypes, and venture
              validation pipelines. Every skill explained with the problem it solves.
            </p>
          </article>
        </Link>

        <article className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all hover:border-[rgba(255,255,255,0.16)]">
          <p className="mb-2 text-xs text-[rgba(255,255,255,0.36)]">Coming soon</p>
          <h2 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">
            I ran 48 agents to validate a startup idea &mdash; here&apos;s what happened
          </h2>
          <p className="mt-2 text-sm text-[rgba(255,255,255,0.60)] leading-relaxed">
            Inside the venture studio pipeline: how parallel Claude Code agents research
            markets, score opportunities, and produce a synthesis you can actually act on.
          </p>
        </article>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-[rgba(255,255,255,0.36)]">
          More posts coming. Follow on{" "}
          <a href="https://twitter.com/maboroshi_tech" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">
            Twitter
          </a>{" "}
          for updates.
        </p>
      </div>
    </div>
  );
}
