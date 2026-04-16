import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share a Skill — Claude Flows",
  description:
    "Learn how to create and share AI skills on Claude Flows.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] p-4 text-sm leading-relaxed">
      <code className="text-[rgba(255,255,255,0.92)] font-mono">{children}</code>
    </pre>
  );
}

function StepCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.20)] border border-[rgba(99,102,241,0.30)]">
          <span className="text-sm font-bold text-[#6366F1]">{number}</span>
        </div>
        <div className="mt-2 w-px flex-1 bg-[rgba(255,255,255,0.08)]" />
      </div>
      <div className="pb-10">
        <h3 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">{title}</h3>
        <div className="text-sm leading-relaxed text-[rgba(255,255,255,0.60)]">{children}</div>
      </div>
    </div>
  );
}

const EXAMPLE_WORKFLOW_JSON = `{
  "name": "my-workflow",
  "displayName": "My Awesome Workflow",
  "version": "1.0.0",
  "description": "A brief description of what this workflow does.",
  "author": {
    "name": "your-username",
    "github": "your-username"
  },
  "category": "business",
  "tags": ["automation", "productivity"],
  "skills": [
    {
      "name": "start",
      "description": "Initialize a new project",
      "prompt": "You are an agent that initializes..."
    },
    {
      "name": "run",
      "description": "Execute the main workflow",
      "prompt": "You are an agent that runs..."
    }
  ],
  "steps": [
    {
      "name": "Discovery",
      "description": "Research and gather information",
      "methodologyCount": 2
    },
    {
      "name": "Execution",
      "description": "Build the deliverables",
      "methodologyCount": 3
    }
  ],
  "mcp": {
    "brave-search": { "required": true },
    "fetch": { "required": false }
  },
  "env": {
    "API_KEY": {
      "required": true,
      "description": "Your API key for the service"
    }
  },
  "repository": "https://github.com/you/my-workflow"
}`;

export default function PublishPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center rounded-full border border-[rgba(99,102,241,0.20)] bg-[rgba(99,102,241,0.08)] px-3 py-1 text-xs font-medium text-[#6366F1]">
          Publishing Guide
        </div>
        <h1 className="text-3xl font-extrabold text-[rgba(255,255,255,0.92)] sm:text-4xl">
          Share a Workflow
        </h1>
        <p className="mt-3 text-lg text-[rgba(255,255,255,0.60)]">
          Share your AI skills with the Claude Flows community. Follow
          these steps to create, validate, and publish.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-12">
        <StepCard number="1" title="Create your workflow.json">
          <p className="mb-4">
            Every workflow starts with a <code className="rounded bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 text-[rgba(255,255,255,0.60)]">workflow.json</code> manifest file. This file
            describes your workflow&apos;s skills, steps, requirements, and
            metadata.
          </p>
          <p className="mb-2">
            Place it in the root of your project directory:
          </p>
          <CodeBlock>{`my-workflow/\n  workflow.json\n  prompts/\n    start.md\n    run.md\n  CLAUDE.md`}</CodeBlock>
        </StepCard>

        <StepCard number="2" title="Define your skills">
          <p className="mb-4">
            Skills are what users run to use your workflow. Each skill has a name,
            description, and a prompt file that contains the AI instructions.
          </p>
          <p>
            Skills are registered automatically when the
            workflow is installed. Users run them with{" "}
            <code className="rounded bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 text-[rgba(255,255,255,0.60)]">/workflow-name-skill-name</code>.
          </p>
        </StepCard>

        <StepCard number="3" title="Declare requirements">
          <p className="mb-4">
            List any services, account connections, or other dependencies
            your workflow needs. The installer will configure these
            automatically.
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>
              <strong className="text-[rgba(255,255,255,0.60)]">Integrations</strong> — services
              like web search, web access, filesystem
            </li>
            <li>
              <strong className="text-[rgba(255,255,255,0.60)]">API Keys</strong>{" "}
              — credentials and tokens
            </li>
            <li>
              <strong className="text-[rgba(255,255,255,0.60)]">Dependencies</strong> -- other
              workflows this one depends on
            </li>
          </ul>
        </StepCard>

        <StepCard number="4" title="Test locally">
          <p className="mb-4">
            Before publishing, test your workflow locally to make sure everything works:
          </p>
          <CodeBlock>{`# Validate your workflow.json\nclaudeflows validate\n\n# Test install locally\nclaudeflows install . --local\n\n# Run your skills\n/my-workflow-start`}</CodeBlock>
        </StepCard>

        <StepCard number="5" title="Publish">
          <p className="mb-4">
            When you&apos;re ready, publish your skill to the Claude Flows
            registry:
          </p>
          <CodeBlock>{`# Login (first time)\nclaudeflows login\n\n# Publish\nclaudeflows publish\n\n# That's it! Your skill is now live at:\n# https://claudeflows.com/w/my-workflow`}</CodeBlock>
        </StepCard>
      </div>

      {/* Example workflow.json */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-[rgba(255,255,255,0.92)]">
          Example workflow.json
        </h2>
        <p className="mb-4 text-sm text-[rgba(255,255,255,0.60)]">
          Here&apos;s a complete example of a workflow manifest with all supported
          fields:
        </p>
        <CodeBlock>{EXAMPLE_WORKFLOW_JSON}</CodeBlock>
      </section>

      {/* Schema reference */}
      <section className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">
        <h2 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,0.92)]">
          Schema Reference
        </h2>
        <p className="mb-4 text-sm text-[rgba(255,255,255,0.60)]">
          For the complete JSON Schema specification with all fields,
          validation rules, and advanced features:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.10)]">
                <th className="pb-2 text-left font-semibold text-[rgba(255,255,255,0.60)]">
                  Field
                </th>
                <th className="pb-2 text-left font-semibold text-[rgba(255,255,255,0.60)]">
                  Type
                </th>
                <th className="pb-2 text-left font-semibold text-[rgba(255,255,255,0.60)]">
                  Required
                </th>
                <th className="pb-2 text-left font-semibold text-[rgba(255,255,255,0.60)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[rgba(255,255,255,0.60)]">
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">name</td>
                <td className="py-2 text-xs">string</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">
                  URL-safe identifier (lowercase, hyphens)
                </td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  displayName
                </td>
                <td className="py-2 text-xs">string</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">Human-readable display name</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  version
                </td>
                <td className="py-2 text-xs">string</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">Semver version string</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  description
                </td>
                <td className="py-2 text-xs">string</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">
                  Short description (max 200 chars)
                </td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  author
                </td>
                <td className="py-2 text-xs">object</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">
                  Author name and GitHub username
                </td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  skills
                </td>
                <td className="py-2 text-xs">array</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">
                  Array of skill definitions
                </td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">
                  category
                </td>
                <td className="py-2 text-xs">string</td>
                <td className="py-2 text-xs">Yes</td>
                <td className="py-2 text-xs">One of the defined categories</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">steps</td>
                <td className="py-2 text-xs">array</td>
                <td className="py-2 text-xs">No</td>
                <td className="py-2 text-xs">
                  Pipeline steps for multi-stage workflows
                </td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">mcp</td>
                <td className="py-2 text-xs">object</td>
                <td className="py-2 text-xs">No</td>
                <td className="py-2 text-xs">MCP server requirements</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs text-[rgba(255,255,255,0.60)]">env</td>
                <td className="py-2 text-xs">object</td>
                <td className="py-2 text-xs">No</td>
                <td className="py-2 text-xs">
                  Environment variable requirements
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <a
            href="https://github.com/mikethepurple/claudeflows/blob/main/docs/schema.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:underline"
          >
            View full JSON Schema documentation
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
