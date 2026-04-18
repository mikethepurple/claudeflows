"use client";

import { useState } from "react";
import WorkflowCard from "@/components/workflow-card";
import CategoryPills from "@/components/category-pills";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";

function RequestSkill() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source_skill: `request:${description.trim().slice(0, 200)}`,
        }),
      });
      setSubmitted(true);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-20 mb-8">
      <div className="section-divider mb-12" />
      <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-semibold text-[rgba(255,255,255,0.92)]">
          Don&apos;t see what you need?
        </h2>
        <p className="mb-6 text-sm text-[rgba(255,255,255,0.60)]">
          Describe the automation you wish existed. Popular requests get built first.
          Complex ones become consulting projects.
        </p>

        {submitted ? (
          <div className="flex items-center gap-2 text-sm text-[#10B981]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Got it. We&apos;ll follow up when it ships.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I wish I had an automation that..."
              rows={3}
              required
              className="w-full rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.36)] outline-none focus:border-[rgba(99,102,241,0.50)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] resize-none"
            />
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.36)] outline-none focus:border-[rgba(99,102,241,0.50)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] disabled:opacity-50"
              >
                {loading ? "..." : "Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredWorkflows = SAMPLE_WORKFLOWS.filter((w) => {
    if (selectedCategory === "all") return true;
    return w.category === selectedCategory;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold text-[rgba(255,255,255,0.92)]">
        CuratedFlows
      </h1>
      <p className="mb-8 text-base text-[rgba(255,255,255,0.60)]">
        Battle-tested AI automations with smart installers. Every flow is production-proven before it hits the shelf. One-time pricing.
      </p>

      <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkflows.map((wf) => (
          <WorkflowCard key={wf.name} workflow={wf} />
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <p className="mt-12 text-center text-sm text-[rgba(255,255,255,0.36)]">
          No flows in this category yet.
        </p>
      )}

      <RequestSkill />
    </div>
  );
}
