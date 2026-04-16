import type { McpRequirement, EnvRequirement } from "@/lib/types";

interface RequirementsProps {
  mcp: Record<string, McpRequirement>;
  env?: Record<string, EnvRequirement>;
  dependencies?: string[];
}

function StatusDot({ required }: { required: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        required ? "bg-[#6366F1]" : "bg-[rgba(255,255,255,0.20)]"
      }`}
      title={required ? "Required" : "Optional"}
    />
  );
}

export default function Requirements({
  mcp,
  env,
  dependencies,
}: RequirementsProps) {
  const mcpEntries = Object.entries(mcp);
  const envEntries = env ? Object.entries(env) : [];

  return (
    <div className="flex flex-col gap-4">
      {/* MCP Servers */}
      {mcpEntries.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
            Integrations
          </h4>
          <ul className="flex flex-col gap-1.5">
            {mcpEntries.map(([name, config]) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2"
              >
                <StatusDot required={config.required} />
                <code className="text-sm text-[rgba(255,255,255,0.60)] font-mono">{name}</code>
                <span className="ml-auto text-xs text-[rgba(255,255,255,0.36)]">
                  {config.required ? "required" : "optional"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Environment Variables */}
      {envEntries.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
            API Keys
          </h4>
          <ul className="flex flex-col gap-1.5">
            {envEntries.map(([name, config]) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2"
              >
                <StatusDot required={config.required} />
                <code className="text-sm text-[rgba(255,255,255,0.60)] font-mono">{name}</code>
                <span className="ml-auto text-xs text-[rgba(255,255,255,0.36)]">
                  {config.required ? "required" : "optional"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Runtime Requirements */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
          Runtime
        </h4>
        <ul className="flex flex-col gap-1.5">
          <li className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2">
            <StatusDot required={true} />
            <code className="text-sm text-[rgba(255,255,255,0.60)] font-mono">
              Claude Code
            </code>
            <span className="ml-auto text-xs text-[rgba(255,255,255,0.36)]">required</span>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2">
            <StatusDot required={true} />
            <code className="text-sm text-[rgba(255,255,255,0.60)] font-mono">
              claudeflows
            </code>
            <span className="ml-auto text-xs text-[rgba(255,255,255,0.36)]">required</span>
          </li>
        </ul>
      </div>

      {/* Dependency Workflows */}
      {dependencies && dependencies.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
            Dependency Workflows
          </h4>
          <ul className="flex flex-col gap-1.5">
            {dependencies.map((dep) => (
              <li
                key={dep}
                className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2"
              >
                <StatusDot required={true} />
                <code className="text-sm text-[rgba(255,255,255,0.60)] font-mono">{dep}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
