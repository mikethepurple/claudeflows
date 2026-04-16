"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

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
      : "text-[rgba(255,255,255,0.36)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.60)]";

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

const UNLOCK_KEY = "cf_install_unlocked";

export default function InstallButton({ workflowName }: InstallButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [platform, setPlatform] = useState<Platform>("mac");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showTerminalHint, setShowTerminalHint] = useState(false);

  // Email gate state
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const installCommand = `claudeflows install ${workflowName}`;
  const steps = buildSteps(workflowName);

  useEffect(() => {
    setPlatform(detectPlatform());
    try {
      if (localStorage.getItem(UNLOCK_KEY) === "true") {
        setUnlocked(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleSubscribe = useCallback(async () => {
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source_skill: workflowName }),
      });
      if (res.ok) {
        setUnlocked(true);
        try {
          localStorage.setItem(UNLOCK_KEY, "true");
        } catch {
          // ignore
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [email, workflowName]);

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
      {!unlocked ? (
        /* Email gate */
        <div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
              className="flex-1 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2.5 text-sm text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.36)] outline-none focus:border-[rgba(99,102,241,0.50)] focus:ring-1 focus:ring-[rgba(99,102,241,0.12)]"
            />
            <button
              onClick={handleSubscribe}
              disabled={submitting}
              className="shrink-0 rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4F46E5] disabled:opacity-50 transition-colors"
            >
              {submitting ? "..." : "Get command"}
            </button>
          </div>
          {error && (
            <p className="mt-1.5 text-center text-xs text-red-500">{error}</p>
          )}
          <p className="mt-2 text-center text-[10px] text-[rgba(255,255,255,0.36)]">
            We&apos;ll send setup tips. Unsubscribe anytime.
          </p>
        </div>
      ) : (
        <>
          {/* Primary: copy install command */}
          <button
            onClick={handleCopyInstall}
            className={`group relative flex items-center justify-between gap-3 rounded-xl px-5 py-4 font-mono text-sm transition-all ${
              copied
                ? "bg-[#16A34A] text-white"
                : "bg-[rgba(0,0,0,0.45)] text-[rgba(255,255,255,0.92)] hover:bg-[rgba(0,0,0,0.55)]"
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

          <p className="text-center text-xs text-[rgba(255,255,255,0.36)]">
            Paste into your terminal. Requires Node.js and{" "}
            <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="underline hover:text-[rgba(255,255,255,0.60)]">Claude Code</a>.
          </p>
        </>
      )}

      {/* Expandable guided setup for beginners */}
      <div className="border-t border-[rgba(255,255,255,0.06)] pt-3">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-1.5 text-xs text-[rgba(255,255,255,0.36)] hover:text-[rgba(255,255,255,0.92)] transition-colors"
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
              <span className="text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.36)] mr-1">System:</span>
              {(["mac", "linux", "windows"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                    platform === p
                      ? "bg-[rgba(99,102,241,0.15)] text-[#6366F1]"
                      : "text-[rgba(255,255,255,0.36)] hover:text-[rgba(255,255,255,0.60)]"
                  }`}
                >
                  {PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>

            {/* Windows WSL notice */}
            {platform === "windows" && (
              <div className="rounded-lg border border-[rgba(245,158,11,0.20)] bg-[rgba(245,158,11,0.08)] px-3 py-2.5">
                <p className="text-xs font-medium text-[#F59E0B] mb-1">Windows requires WSL</p>
                <p className="text-[11px] text-[rgba(245,158,11,0.80)] leading-relaxed">
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
              className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.36)] hover:text-[rgba(255,255,255,0.92)] transition-colors self-start"
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
              <div className="rounded-lg border border-[rgba(99,102,241,0.20)] bg-[rgba(99,102,241,0.08)] px-3 py-2.5">
                <p className="text-[11px] text-[rgba(99,102,241,0.80)] leading-relaxed">
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
                        : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => toggleCompleted(step.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isDone
                            ? "border-[#16A34A] bg-[#16A34A] text-white"
                            : "border-[rgba(255,255,255,0.20)] hover:border-[rgba(255,255,255,0.36)]"
                        }`}
                      >
                        {isDone && <CheckIcon className="h-3 w-3" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isDone ? "text-[#16A34A] line-through" : "text-[rgba(255,255,255,0.92)]"}`}>
                          {step.title}
                        </p>
                        {!isDone && (
                          <p className="mt-0.5 text-[11px] leading-relaxed text-[rgba(255,255,255,0.60)]">
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
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#6366F1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4F46E5] transition-colors"
                          >
                            <DownloadIcon className="h-3.5 w-3.5" />
                            {step.action.labels[platform]}
                          </a>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-md bg-[rgba(0,0,0,0.45)] px-2.5 py-2">
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
                            className="text-[11px] text-[rgba(255,255,255,0.36)] hover:text-[rgba(255,255,255,0.60)] transition-colors"
                          >
                            {step.check ? "I already have this" : "Done"}
                          </button>
                          {step.check && (
                            <span className="text-[10px] text-[rgba(255,255,255,0.20)]">
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
      <div className="text-center border-t border-[rgba(255,255,255,0.06)] pt-3">
        <p className="text-xs text-[rgba(255,255,255,0.36)] mb-2">Not technical?</p>
        <Link
          href={`/consulting?from=${encodeURIComponent(workflowName)}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(99,102,241,0.20)] bg-[rgba(99,102,241,0.08)] px-4 py-2 text-xs font-medium text-[#6366F1] hover:bg-[rgba(99,102,241,0.15)] transition-colors"
        >
          Get this set up for me
        </Link>
      </div>
    </div>
  );
}
