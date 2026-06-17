# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server (Turbopack) at localhost:3000
pnpm build      # production build
pnpm start      # run production build
pnpm lint       # ESLint with Next.js core-web-vitals + TypeScript rules
```

No test suite is configured yet.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Stack

- **Next.js 16** with App Router and Turbopack
- **React 19**
- **Tailwind CSS v4** (imported via `@import "tailwindcss"` in `globals.css`, no config file needed)
- **TypeScript** — strict mode, path alias `@/*` maps to the repo root

## Package manager

Uses **pnpm** (not npm). Build scripts for `sharp` and `unrs-resolver` are approved in `pnpm-workspace.yaml`.
