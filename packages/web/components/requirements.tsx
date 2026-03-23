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
        required ? "bg-[#C2410C]" : "bg-[#D1D5DB]"
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
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Connections
          </h4>
          <ul className="flex flex-col gap-1.5">
            {mcpEntries.map(([name, config]) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-[#F5F5F5] px-3 py-2"
              >
                <StatusDot required={config.required} />
                <code className="text-sm text-[#374151] font-mono">{name}</code>
                <span className="ml-auto text-xs text-[#9CA3AF]">
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
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Account Connections
          </h4>
          <ul className="flex flex-col gap-1.5">
            {envEntries.map(([name, config]) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-[#F5F5F5] px-3 py-2"
              >
                <StatusDot required={config.required} />
                <code className="text-sm text-[#374151] font-mono">{name}</code>
                <span className="ml-auto text-xs text-[#9CA3AF]">
                  {config.required ? "required" : "optional"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Runtime Requirements */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Runtime
        </h4>
        <ul className="flex flex-col gap-1.5">
          <li className="flex items-center gap-2 rounded-lg bg-[#F5F5F5] px-3 py-2">
            <StatusDot required={true} />
            <code className="text-sm text-[#374151] font-mono">
              Claude Code
            </code>
            <span className="ml-auto text-xs text-[#9CA3AF]">required</span>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-[#F5F5F5] px-3 py-2">
            <StatusDot required={true} />
            <code className="text-sm text-[#374151] font-mono">
              @claudeflows/cli
            </code>
            <span className="ml-auto text-xs text-[#9CA3AF]">required</span>
          </li>
        </ul>
      </div>

      {/* Dependency Workflows */}
      {dependencies && dependencies.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Dependency Workflows
          </h4>
          <ul className="flex flex-col gap-1.5">
            {dependencies.map((dep) => (
              <li
                key={dep}
                className="flex items-center gap-2 rounded-lg bg-[#F5F5F5] px-3 py-2"
              >
                <StatusDot required={true} />
                <code className="text-sm text-[#374151] font-mono">{dep}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
