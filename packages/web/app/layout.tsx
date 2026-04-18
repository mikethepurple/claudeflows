import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curated Flows — Battle-Tested AI Automations",
  description:
    "Hand-picked AI automation flows for founders, operators, and teams. Not skill files — full workflows with smart installers, tested in production. Consulting available.",
  openGraph: {
    title: "Curated Flows — Battle-Tested AI Automations",
    description:
      "Hand-picked AI automation flows for founders, operators, and teams. Not skill files — full workflows with smart installers, tested in production.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Curated+Flows&subtitle=Battle-tested+AI+automations.+Hand-picked.+Production-proven.",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Flows — Battle-Tested AI Automations",
    description:
      "Hand-picked AI automation flows for founders, operators, and teams. Not skill files — full workflows with smart installers, tested in production.",
    images: ["/api/og?title=Curated+Flows&subtitle=Battle-tested+AI+automations.+Hand-picked.+Production-proven."],
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[#13111C]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold text-[rgba(255,255,255,0.92)]">
            Curated Flows
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/skills"
            className="text-sm text-[rgba(255,255,255,0.60)] transition-colors hover:text-[rgba(255,255,255,0.92)]"
          >
            Flows
          </Link>
          <Link
            href="/consulting"
            className="text-sm text-[rgba(255,255,255,0.60)] transition-colors hover:text-[rgba(255,255,255,0.92)]"
          >
            Consulting
          </Link>
          <Link
            href="/blog"
            className="text-sm text-[rgba(255,255,255,0.60)] transition-colors hover:text-[rgba(255,255,255,0.92)]"
          >
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mikethepurple/claudeflows"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(255,255,255,0.36)] transition-colors hover:text-[rgba(255,255,255,0.60)]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <Link
            href="/skills"
            className="rounded-lg bg-[#6366F1] px-3.5 py-1.5 text-sm font-medium text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
          >
            Browse Flows
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">
              Curated Flows
            </span>
            <p className="mt-2 text-sm text-[rgba(255,255,255,0.36)] max-w-xs leading-relaxed">
              Battle-tested AI automations. Hand-picked. Production-proven.
            </p>
          </div>

          {/* Flows */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
              Flows
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/skills" className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/skills?tier=free" className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors">
                  Free Flows
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/consulting" className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.36)]">
              Connect
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/mikethepurple/claudeflows"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/maboroshi_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)] transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />
        <div className="text-center text-xs text-[rgba(255,255,255,0.20)]">
          Built by Misha Erikov &middot; &copy; {new Date().getFullYear()} Curated Flows
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
