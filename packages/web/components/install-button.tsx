"use client";

import { useState, useCallback, useEffect } from "react";

interface InstallButtonProps {
  workflowName: string;
}

type Platform = "mac" | "linux" | "windows";

interface Step {
  id: string;
  title: string;
  description: string;
  action:
    | { type: "download"; links: Record<Platform, string>; labels: Record<Platform, string> }
    | { type: "command"; commands: Record<Platform, string> };
  check: string | null;
}

function buildSteps(workflowName: string): Step[] {
  return [
    {
      id: "node",
      title: "Install Node.js",
      description: "Download the installer and follow the prompts — takes about 2 minutes.",
      action: {
        type: "download",
        links: {
          mac: "https://nodejs.org/en/download",
          linux: "https://nodejs.org/en/download",
          windows: "https://nodejs.org/en/download",
        },
        labels: {
          mac: "Download from nodejs.org",
          linux: "Download from nodejs.org",
          windows: "Download from nodejs.org",
        },
      },
      check: "Already have it? Run `node -v` in Terminal to check.",
    },
    {
      id: "claude",
      title: "Install Claude Code",
      description: "Paste this into Terminal. It installs the AI engine, then opens a sign-in page.",
      action: {
        type: "command",
        commands: {
          mac: "npm install -g @anthropic-ai/claude-code && claude",
          linux: "npm install -g @anthropic-ai/claude-code && claude",
          windows: "npm install -g @anthropic-ai/claude-code && claude",
        },
      },
      check: "Already have it? Run `claude --version` to check.",
    },
    {
      id: "workflow",
      title: `Install ${workflowName}`,
      description: "Paste this into Terminal. It downloads the workflow and walks you through setup.",
      action: {
        type: "command",
        commands: {
          mac: `claudeflows install ${workflowName}`,
          linux: `claudeflows install ${workflowName}`,
          windows: `claudeflows install ${workflowName}`,
        },
      },
      check: null,
    },
  ];
}

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "windows";
  if (ua.includes("Linux") && !ua.includes("Android")) return "linux";
  return "mac";
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "h-4 w-4"} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "h-4 w-4"} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function CopyButton({ text, variant = "dark" }: { text: string; variant?: "dark" | "light" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const styles =
    variant === "dark"
      ? copied
        ? "bg-[#16A34A]/20 text-[#16A34A]"
        : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
      : copied
      ? "bg-[#16A34A]/10 text-[#16A34A]"
      : "text-[#9CA3AF] hover:bg-black/[0.06] hover:text-[#374151]";

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 rounded-md p-1.5 transition-colors ${styles}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5" />
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
    </button>
  );
}

const PLATFORM_LABELS: Record<Platform, string> = {
  mac: "macOS",
  linux: "Linux",
  windows: "Windows",
};

const TERMINAL_HINTS: Record<Platform, string> = {
  mac: "Open Terminal: press Cmd + Space, type \"Terminal\", hit Enter.",
  linux: "Open your terminal emulator (Ctrl + Alt + T on most distros).",
  windows: "Open WSL: press Win, type \"Ubuntu\" or \"WSL\", hit Enter.",
};

export default function InstallButton({ workflowName }: InstallButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [platform, setPlatform] = useState<Platform>("mac");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showTerminalHint, setShowTerminalHint] = useState(false);

  const installCommand = `claudeflows install ${workflowName}`;
  const steps = buildSteps(workflowName);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleCopyInstall = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = installCommand;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [installCommand]);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Primary: copy install command */}
      <button
        onClick={handleCopyInstall}
        className={`group relative flex items-center justify-between gap-3 rounded-xl px-5 py-4 font-mono text-sm transition-all ${
          copied
            ? "bg-[#16A34A] text-white"
            : "bg-[#171717] text-[#E5E7EB] hover:bg-[#2A2A2A]"
        }`}
      >
        <span className="flex-1 text-left overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className={copied ? "text-white/60" : "text-[#16A34A]"}>$</span>{" "}
          {installCommand}
        </span>
        <span className={`shrink-0 flex items-center gap-1.5 text-xs font-sans transition-colors ${
          copied ? "text-white" : "text-white/40 group-hover:text-white/70"
        }`}>
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </span>
      </button>

      <p className="text-center text-xs text-[#9CA3AF]">
        Paste into your terminal. Requires Node.js and{" "}
        <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#6B7280]">Claude Code</a>.
      </p>

      {/* Expandable guided setup for beginners */}
      <div className="border-t border-black/[0.06] pt-3">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#171717] transition-colors"
        >
          <svg
            className={`h-3 w-3 transition-transform ${showGuide ? "rotate-90" : ""}`}
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          Need help? Step-by-step setup guide
        </button>

        {showGuide && (
          <div className="mt-3 flex flex-col gap-3">
            {/* Platform selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mr-1">System:</span>
              {(["mac", "linux", "windows"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                    platform === p
                      ? "bg-[#C2410C]/10 text-[#C2410C]"
                      : "text-[#9CA3AF] hover:text-[#6B7280]"
                  }`}
                >
                  {PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>

            {/* Windows WSL notice */}
            {platform === "windows" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
                <p className="text-xs font-medium text-amber-800 mb-1">Windows requires WSL</p>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Claude Code runs on Linux/macOS. On Windows, install{" "}
                  <a
                    href="https://learn.microsoft.com/en-us/windows/wsl/install"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    WSL (Windows Subsystem for Linux)
                  </a>{" "}
                  first, then follow the steps below inside WSL.
                </p>
              </div>
            )}

            {/* Terminal hint toggle */}
            <button
              onClick={() => setShowTerminalHint(!showTerminalHint)}
              className="flex items-center gap-1.5 text-[11px] text-[#6B7280] hover:text-[#171717] transition-colors self-start"
            >
              <svg
                className={`h-3 w-3 transition-transform ${showTerminalHint ? "rotate-90" : ""}`}
                fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              New to the terminal?
            </button>
            {showTerminalHint && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  {TERMINAL_HINTS[platform]}{" "}
                  Then paste the commands below (Cmd+V on Mac, Ctrl+Shift+V in most Linux terminals).
                </p>
              </div>
            )}

            {/* Steps */}
            <div className="flex flex-col gap-2.5">
              {steps.map((step) => {
                const isDone = completed.has(step.id);

                return (
                  <div
                    key={step.id}
                    className={`rounded-lg border p-3 transition-all ${
                      isDone
                        ? "border-[#16A34A]/20 bg-[#16A34A]/5"
                        : "border-black/[0.06] bg-white shadow-sm"
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => toggleCompleted(step.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isDone
                            ? "border-[#16A34A] bg-[#16A34A] text-white"
                            : "border-[#D1D5DB] hover:border-[#9CA3AF]"
                        }`}
                      >
                        {isDone && <CheckIcon className="h-3 w-3" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isDone ? "text-[#16A34A] line-through" : "text-[#171717]"}`}>
                          {step.title}
                        </p>
                        {!isDone && (
                          <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B7280]">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action area */}
                    {!isDone && (
                      <div className="mt-2.5 ml-7">
                        {step.action.type === "download" ? (
                          <a
                            href={step.action.links[platform]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C2410C] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#9A3412] transition-colors"
                          >
                            <DownloadIcon className="h-3.5 w-3.5" />
                            {step.action.labels[platform]}
                          </a>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-md bg-[#171717] px-2.5 py-2">
                            <code className="flex-1 overflow-x-auto whitespace-nowrap text-[11px] text-[#E5E7EB] scrollbar-none font-mono leading-relaxed">
                              {step.action.commands[platform]}
                            </code>
                            <CopyButton text={step.action.commands[platform]} variant="dark" />
                          </div>
                        )}

                        {/* Skip / check hint */}
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => toggleCompleted(step.id)}
                            className="text-[11px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                          >
                            {step.check ? "I already have this" : "Done"}
                          </button>
                          {step.check && (
                            <span className="text-[10px] text-[#D1D5DB]">
                              {step.check}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Completion message */}
            {completed.size === steps.length && (
              <div className="rounded-lg border border-[#16A34A]/20 bg-[#16A34A]/5 px-4 py-3 text-center">
                <p className="text-sm font-medium text-[#16A34A]">
                  You&apos;re all set! The workflow setup wizard will guide you from here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Consulting CTA */}
      <div className="text-center border-t border-black/[0.06] pt-3">
        <p className="text-xs text-[#9CA3AF] mb-2">Not technical?</p>
        <a
          href={`mailto:hello@claudeflows.com?subject=Setup%20Help%20-%20${encodeURIComponent(workflowName)}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-medium text-orange-800 hover:bg-orange-100 transition-colors"
        >
          Get this set up for me
        </a>
      </div>
    </div>
  );
}
