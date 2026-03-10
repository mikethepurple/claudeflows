import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloudFlows — AI Workflow Marketplace",
  description:
    "Discover AI workflows that handle real tasks. One command to install, then just tell it what you need.",
  openGraph: {
    title: "CloudFlows — AI Workflow Marketplace",
    description:
      "Discover AI workflows that handle real tasks. One command to install, then just tell it what you need.",
    type: "website",
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8590C]">
            <span className="text-sm font-bold text-white">CF</span>
          </div>
          <span className="text-lg font-bold text-[#1A1A1A]">CloudFlows</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-2 rounded-lg border border-black/[0.08] bg-[#F5F3F0] px-3 py-1.5 text-sm text-[#6B7280] transition-colors hover:border-[#E8590C]/30 hover:text-[#1A1A1A]"
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
            className="rounded-lg border border-[#E8590C] px-4 py-2 text-sm font-medium text-[#E8590C] transition-colors hover:bg-[#E8590C] hover:text-white"
          >
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const browseCategories = [
    { name: "Business", href: "/?category=business" },
    { name: "Development", href: "/?category=development" },
    { name: "Research", href: "/?category=research" },
    { name: "Marketing", href: "/?category=marketing" },
    { name: "Data", href: "/?category=data" },
    { name: "Design", href: "/?category=design" },
    { name: "Operations", href: "/?category=operations" },
    { name: "Productivity", href: "/?category=productivity" },
  ];

  return (
    <footer className="border-t border-black/[0.08] bg-[#F5F3F0]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8590C]">
                <span className="text-xs font-bold text-white">CF</span>
              </div>
              <span className="text-base font-bold text-[#1A1A1A]">
                CloudFlows
              </span>
            </div>
            <p className="text-sm text-[#6B7280] max-w-xs">
              AI workflows that handle real tasks. Install in one command.
            </p>
          </div>

          {/* Browse by Category */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Browse
            </h4>
            <ul className="flex flex-col gap-2">
              {browseCategories.slice(0, 4).map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              &nbsp;
            </h4>
            <ul className="flex flex-col gap-2">
              {browseCategories.slice(4).map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              For Creators
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/publish"
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  Share a Workflow
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows/blob/main/docs/schema.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  Creator Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows/blob/main/docs/schema.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-black/[0.06] pt-6 text-center text-xs text-[#9CA3AF]">
          &copy; {new Date().getFullYear()} CloudFlows. All rights reserved.
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
      <body className="min-h-screen bg-[#FAF9F7] text-[#1A1A1A] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
