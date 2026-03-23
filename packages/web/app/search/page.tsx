"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WorkflowCard from "@/components/workflow-card";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return SAMPLE_WORKFLOWS;

    const lowerQuery = query.toLowerCase().trim();
    return SAMPLE_WORKFLOWS.filter((wf) => {
      const searchable = [
        wf.name,
        wf.displayName,
        wf.description,
        wf.category,
        wf.author.name,
        ...wf.tags,
        ...wf.skills.map((s) => s.name),
        ...wf.skills.map((s) => s.description),
      ]
        .join(" ")
        .toLowerCase();

      return lowerQuery.split(/\s+/).every((word) => searchable.includes(word));
    });
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Search header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[#171717]">
          Search Skills
        </h1>
        <p className="mt-2 text-[#6B7280]">
          Find the right AI skill for your task
        </p>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category, tag, or description..."
            className="w-full rounded-xl border border-black/[0.08] bg-white py-4 pl-12 pr-4 text-base text-[#171717] placeholder-[#9CA3AF] shadow-sm outline-none transition-colors focus:border-[#C2410C]/50 focus:ring-1 focus:ring-[#C2410C]/25"
            autoFocus
          />
        </div>
      </form>

      {/* Results */}
      {results.length > 0 ? (
        <div>
          <div className="mb-5 flex items-end justify-between">
            <span className="text-sm text-[#6B7280]">
              {results.length} result{results.length !== 1 ? "s" : ""}
              {query.trim() ? (
                <>
                  {" "}
                  for{" "}
                  <span className="text-[#171717]">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </>
              ) : null}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((wf) => (
              <WorkflowCard key={wf.name} workflow={wf} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F5F5]">
            <svg
              className="h-8 w-8 text-[#9CA3AF]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#171717]">
            No workflows found
          </h3>
          <p className="max-w-sm text-sm text-[#6B7280]">
            No workflows matched your search for &ldquo;{query}&rdquo;. Try a
            different query or{" "}
            <a href="/" className="text-[#C2410C] hover:underline">
              browse all workflows
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-[#171717]">
              Search Skills
            </h1>
            <p className="mt-2 text-[#6B7280]">
              Find the right AI skill for your task
            </p>
          </div>
          <div className="h-14 w-full rounded-xl border border-black/[0.08] bg-white animate-pulse shadow-sm" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
