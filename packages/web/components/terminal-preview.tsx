"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TERMINAL_LINES = [
  { text: "$ npx @claudeflows/cli install venture-studio", delay: 50, isCommand: true },
  {
    text: "\u2713 Downloading venture-studio v1.0.0...",
    delay: 30,
    isCommand: false,
  },
  {
    text: "\u2713 MCP: brave-search configured",
    delay: 30,
    isCommand: false,
  },
  { text: "\u2713 MCP: fetch configured", delay: 30, isCommand: false },
  {
    text: "\u2713 Skills: /start /run /graduate /studio",
    delay: 30,
    isCommand: false,
  },
  {
    text: "\u2713 Ready! Run /studio to see your portfolio.",
    delay: 30,
    isCommand: false,
  },
];

export default function TerminalPreview() {
  const [displayedLines, setDisplayedLines] = useState<
    { text: string; isCommand: boolean }[]
  >([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (currentLineIndex >= TERMINAL_LINES.length) {
      // Animation complete -- pause then restart
      timeoutRef.current = setTimeout(resetAnimation, 3000);
      return;
    }

    const currentLine = TERMINAL_LINES[currentLineIndex];
    const fullText = currentLine.text;

    if (currentCharIndex < fullText.length) {
      // Type next character
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          if (updated.length <= currentLineIndex) {
            updated.push({
              text: fullText.charAt(0),
              isCommand: currentLine.isCommand,
            });
          } else {
            updated[currentLineIndex] = {
              text: fullText.substring(0, currentCharIndex + 1),
              isCommand: currentLine.isCommand,
            };
          }
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, currentLine.delay);
    } else {
      // Line complete -- move to next line after a pause
      timeoutRef.current = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 400);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLineIndex, currentCharIndex, isTyping, resetAnimation]);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d14] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#12121a] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-gray-500 font-mono">terminal</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm leading-relaxed min-h-[200px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex items-start">
            <span
              className={
                line.isCommand
                  ? "text-white"
                  : line.text.startsWith("\u2713")
                  ? "text-[#00d4aa]"
                  : "text-gray-400"
              }
            >
              {line.text}
            </span>
            {/* Blinking cursor on the currently typing line */}
            {i === currentLineIndex && currentCharIndex < (TERMINAL_LINES[currentLineIndex]?.text.length ?? 0) && (
              <span className="animate-pulse text-[#6c63ff] ml-0.5">|</span>
            )}
          </div>
        ))}
        {/* Cursor on empty new line when done with current and waiting for next */}
        {displayedLines.length > 0 &&
          currentLineIndex < TERMINAL_LINES.length &&
          currentCharIndex === 0 &&
          displayedLines.length === currentLineIndex && (
            <span className="animate-pulse text-[#6c63ff]">|</span>
          )}
      </div>
    </div>
  );
}
