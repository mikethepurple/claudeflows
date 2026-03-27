# API Documentation Generator

A Claude Flows skill that reads your API source code and produces clean, developer-friendly documentation with working examples.

## Usage

```
/generate-docs ./src/routes
/generate-docs ./api, base URL: https://api.myapp.com/v1, auth: Bearer token in Authorization header
/generate-docs ./pages/api, base URL: https://myapp.com/api
```

## Structure

- `workflow.json` — skill metadata
- `skills/generate-docs.md` — the documentation generation prompt

## Requirements

- No MCP servers required. The skill reads your local codebase directly.

## What It Produces

A single markdown file (or split by section on request) containing:

- **Quickstart Guide** — zero to first API call in 5 minutes, with curl examples
- **Authentication** — how to get and use credentials
- **Endpoint Reference** — every endpoint with method, path, parameters, request/response examples (curl + JavaScript + Python), and error responses
- **Error Handling Guide** — common errors, what they mean, how to fix them
- **Rate Limits & Best Practices** — pagination, caching, retries
- **Changelog** — template for tracking changes

Output is formatted for docs platforms (Docusaurus, GitBook, ReadMe) or any markdown renderer.

## Supported Frameworks

Works with any backend framework — Express, Fastify, Next.js, Flask, Django, Rails, Go, etc. The skill reads actual route definitions and infers the API structure from code.

## Customization

- Provide your API base URL to get copy-pasteable examples
- Provide your auth method to get accurate authentication docs
- Ask for split output to get separate files per section
- Point at a specific subdirectory if you only want docs for part of the API
