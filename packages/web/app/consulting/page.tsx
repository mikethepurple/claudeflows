"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BUDGET_OPTIONS = [
  "Just exploring",
  "Under $500",
  "$500 - $2,000",
  "$2,000 - $5,000",
  "$5,000+",
];

const VALUE_PROPS = [
  {
    title: "Setup",
    description:
      "We install and configure the right AI skills for your specific needs",
  },
  {
    title: "Training",
    description:
      "Your team learns to use Claude effectively, not just basic prompts",
  },
  {
    title: "Support",
    description:
      "Ongoing help as your needs grow. We\u2019re a message away",
  },
];

function ConsultingForm() {
  const searchParams = useSearchParams();
  const sourceSkill = searchParams.get("from") ?? undefined;

  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [needs, setNeeds] = useState("");
  const [budget, setBudget] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/consulting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role: role || undefined,
          needs: needs || undefined,
          budget: budget || undefined,
          source_skill: sourceSkill,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmittedEmail(email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-black/[0.08] bg-[#F5F5F5] px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C2410C]/30 focus:ring-1 focus:ring-[#C2410C]/20 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-800/[0.04] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              Get AI Working For Your Team
            </h1>
            <p className="text-base leading-relaxed text-neutral-500">
              We set up the right AI skills for your workflow, train your people,
              and make sure it actually works. First consultation is free.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {submitted ? (
          /* Confirmation state */
          <div className="mx-auto max-w-lg rounded-xl border border-black/[0.08] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-neutral-900">
              We&apos;ll be in touch within 24 hours
            </h2>
            <p className="text-sm text-neutral-500">
              Check your email at{" "}
              <span className="font-medium text-neutral-700">
                {submittedEmail}
              </span>{" "}
              for a confirmation.
            </p>
          </div>
        ) : (
          /* Form + value props */
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form — left column */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Your role
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Marketing Manager at Acme Corp"
                    className={inputClass}
                  />
                </div>

                {/* Needs */}
                <div>
                  <label
                    htmlFor="needs"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    What do you need?
                  </label>
                  <textarea
                    id="needs"
                    rows={4}
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                    placeholder="Describe what you'd like AI to help with..."
                    className={inputClass + " resize-none"}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Budget range
                  </label>
                  <select
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select...</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#C2410C] px-6 py-3 text-sm font-medium text-white hover:bg-[#9A3412] disabled:opacity-50 transition-colors"
                >
                  {loading ? "Sending..." : "Book free consultation"}
                </button>
              </form>
            </div>

            {/* Value props — right column */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {VALUE_PROPS.map((prop) => (
                <div
                  key={prop.title}
                  className="rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-1.5 text-sm font-bold text-neutral-900">
                    {prop.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-16 text-center text-[#9CA3AF]">Loading...</div>}>
      <ConsultingForm />
    </Suspense>
  );
}
