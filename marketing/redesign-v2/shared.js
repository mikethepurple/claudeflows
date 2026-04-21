// Shared masthead + footer for CuratedFlows pages.

(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";

  const navItems = [
    { label: "Skills", href: "flows.html", match: ["flows.html"] },
    { label: "Consulting", href: "consulting.html", match: ["consulting.html"] },
    { label: "Blog", href: "blog.html", match: ["blog.html"] },
  ];

  const mast = `
    <header class="masthead">
      <div class="masthead-inner">
        <div class="masthead-left">
          <span class="dot"></span>
          <span>Vol. 01 &middot; Iss. 04</span>
          <span style="color:var(--rule)">/</span>
          <span>Apr 2026</span>
        </div>
        <a href="index.html" class="wordmark" aria-label="curatedflows home">
          CuratedFlows
        </a>
        <div class="masthead-right">
          <nav class="nav-links">
            ${navItems.map(i => `<a href="${i.href}" class="${i.match.includes(path) ? "active" : ""}">${i.label}</a>`).join("")}
          </nav>
          <a href="flows.html" class="btn-pill accent">Browse Skills</a>
        </div>
      </div>
    </header>
  `;

  const foot = `
    <footer class="colophon">
      <div class="colophon-grid">
        <div>
          <div class="wordmark" style="margin-bottom:18px;">CuratedFlows</div>
          <p class="colophon-brand">
            Claude Code skills built by someone who ships with Claude Code every day.
          </p>
          <div class="mono" style="margin-top:22px; color: var(--ink-3);">
            Built by Misha Erikov &middot; &copy; 2026 curatedflows
          </div>
        </div>
        <div>
          <h5>Skills</h5>
          <a href="flows.html">Browse All</a>
          <a href="flows.html?tier=free">Free Skills</a>
        </div>
        <div>
          <h5>Services</h5>
          <a href="consulting.html">Consulting</a>
          <a href="blog.html">Blog</a>
        </div>
        <div>
          <h5>Connect</h5>
          <a href="#">GitHub</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  `;

  const head = document.getElementById("cf-masthead");
  if (head) head.outerHTML = mast;
  const footEl = document.getElementById("cf-footer");
  if (footEl) footEl.outerHTML = foot;
})();
