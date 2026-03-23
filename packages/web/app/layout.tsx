import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Flows — Ready-Made AI Skills",
  description:
    "AI skills that handle real tasks. Research industries, validate ideas, review code. Pick one, tell it what you need, get results.",
  openGraph: {
    title: "Claude Flows — Ready-Made AI Skills",
    description:
      "AI skills that handle real tasks. Research industries, validate ideas, review code. Pick one, tell it what you need, get results.",
    type: "website",
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900">
            <span className="text-xs font-bold text-white">CF</span>
          </div>
          <span className="text-base font-semibold text-neutral-900">Claude Flows</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 hover:bg-neutral-100"
          >
            <svg
              className="h-3.5 w-3.5"
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
            Search
          </Link>
          <Link
            href="/publish"
            className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            List a skill
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const browseCategories = [
    { name: "Research", href: "/?category=research" },
    { name: "Business", href: "/?category=business" },
    { name: "Development", href: "/?category=development" },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900">
                <span className="text-[10px] font-bold text-white">CF</span>
              </div>
              <span className="text-sm font-semibold text-neutral-900">
                Claude Flows
              </span>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs">
              AI skills that handle real tasks. Pick one, tell it what you need, get results.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Browse
            </h4>
            <ul className="flex flex-col gap-2">
              {browseCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/search"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  All Skills
                </Link>
              </li>
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              For Creators
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/publish"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  List a Skill
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows/blob/main/docs/schema.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Publishing Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} Claude Flows
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-neutral-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
