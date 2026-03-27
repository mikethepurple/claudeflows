# SOP & Process Documentation Generator

This skill turns informal process descriptions into structured Standard Operating Procedures.

## Usage

Run the `create-sop` skill. Describe the process you want documented — a messy brain-dump is fine. The skill will ask for anything critical it can't infer (process name, who's involved, frequency) and then produce a complete SOP in clean markdown.

## Output

A single markdown document with: header metadata, purpose, scope, roles & responsibilities, prerequisites checklist, numbered step-by-step procedure with decision points, completion checklist, troubleshooting table, and revision history. Copy-paste ready for Notion, Confluence, or Google Docs.

## Design Principles

- Structure is the skill's job, content is the user's — it organizes tribal knowledge without inventing steps
- Gaps are flagged with `[FILL IN]` markers rather than silently skipped or fabricated
- Decision points are visually distinct so branching logic is scannable
- Screenshot placeholders mark where visuals would help, so the team can add them later
- Language is direct and second-person — SOPs are reference docs, not prose
