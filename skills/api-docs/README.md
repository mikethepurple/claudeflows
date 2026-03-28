# API Documentation Generator

API docs developers actually want to read

## What it does

Your API works but nobody can figure out how to use it because the docs are missing or auto-generated garbage. Point this skill at your codebase and get back clean, developer-friendly documentation with quickstart guides, working examples in multiple languages, and error handling guides.

## Install

```bash
claudeflows install api-docs
```

## Usage

```
claude
> /generate-docs
```

Point it at your API routes directory and optionally provide your base URL and auth method. Works with any backend framework -- Express, Next.js, Flask, Django, Rails, Go, and more.

## What you get

- Quickstart guide (zero to first API call in 5 minutes)
- Endpoint reference with curl, JavaScript, and Python examples
- Authentication setup documentation
- Error handling guide with common fixes
- Rate limits, pagination, and best practices section

## Requirements

- Claude Code

## Example

> /generate-docs
> ./src/routes, base URL: https://api.myapp.com/v1, auth: Bearer token

Reads your route definitions, generates a quickstart showing how to get a token and make the first call, documents every endpoint with request/response examples, and produces an error reference covering all your custom error codes -- formatted for Docusaurus, GitBook, or any markdown renderer.
