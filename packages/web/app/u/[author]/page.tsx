import Link from "next/link";
import { notFound } from "next/navigation";
import WorkflowCard from "@/components/workflow-card";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ author: string }>;
}

const AUTHOR_PROFILES: Record<
  string,
  { name: string; github: string; bio: string; avatar?: string }
> = {
  mikethepurple: {
    name: "mikethepurple",
    github: "mikethepurple",
    bio: "Building AI workflows for CloudFlows. Creator of AI Venture Studio and Scout.",
  },
  "devtools-collective": {
    name: "devtools-collective",
    github: "devtools-collective",
    bio: "Open-source developer tools and code review workflows.",
  },
  contentops: {
    name: "contentops",
    github: "contentops",
    bio: "Content operations automation. From research to publishing.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author } = await params;
  const profile = AUTHOR_PROFILES[author];
  if (!profile) return { title: "Creator Not Found — CloudFlows" };

  return {
    title: `${profile.name} — CloudFlows`,
    description: profile.bio,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { author } = await params;
  const profile = AUTHOR_PROFILES[author];

  if (!profile) notFound();

  const workflows = SAMPLE_WORKFLOWS.filter(
    (wf) => wf.author.name === author
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Profile header */}
      <div className="mb-10 flex items-start gap-5">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1] text-2xl font-bold text-white">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[rgba(255,255,255,0.92)]">{profile.name}</h1>
          <a
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            @{profile.github}
          </a>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[rgba(255,255,255,0.60)]">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-8 border-b border-[rgba(255,255,255,0.08)]" />

      {/* Workflows */}
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-lg font-semibold text-[rgba(255,255,255,0.92)]">
          Published Workflows
        </h2>
        <span className="text-xs text-[rgba(255,255,255,0.60)]">
          {workflows.length} workflow{workflows.length !== 1 ? "s" : ""}
        </span>
      </div>

      {workflows.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((wf) => (
            <WorkflowCard key={wf.name} workflow={wf} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="text-sm text-[rgba(255,255,255,0.60)]">
            This creator hasn&apos;t published any workflows yet.
          </p>
          <Link
            href="/"
            className="mt-3 text-sm text-[#6366F1] hover:underline"
          >
            Browse all workflows
          </Link>
        </div>
      )}
    </div>
  );
}
