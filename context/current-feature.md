# Current Feature

<!-- Feature Name -->

Seed Database with Sample Data

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Create/overwrite the seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos
- Seed one demo user, the 7 system item types, and 5 collections with their items
- Use the data defined in `context/features/seed-spec.md`

### Demo User

- **Email:** demo@devstash.io
- **Name:** Demo User
- **Password:** 12345678 (hash with bcryptjs, 12 rounds)
- **isPro:** false
- **emailVerified:** current date

### System Item Types

All have `isSystem: true`. Icons are Lucide React component names.

| Name    | Icon       | Color   |
| ------- | ---------- | ------- |
| snippet | Code       | #3b82f6 |
| prompt  | Sparkles   | #8b5cf6 |
| command | Terminal   | #f97316 |
| note    | StickyNote | #fde047 |
| file    | File       | #6b7280 |
| image   | Image      | #ec4899 |
| link    | Link       | #10b981 |

### Collections & Items

- **React Patterns** — _Reusable React patterns and hooks_
  - 3 snippets (TypeScript): custom hooks (useDebounce, useLocalStorage), component patterns (context providers, compound components), utility functions
- **AI Workflows** — _AI prompts and workflow automations_
  - 3 prompts: code review, documentation generation, refactoring assistance
- **DevOps** — _Infrastructure and deployment resources_
  - 1 snippet (Docker, CI/CD config), 1 command (deployment scripts), 2 links (real documentation URLs)
- **Terminal Commands** — _Useful shell commands for everyday development_
  - 4 commands: git operations, docker commands, process management, package manager utilities
- **Design Resources** — _UI/UX resources and references_
  - 4 links (real URLs): CSS/Tailwind references, component libraries, design systems, icon libraries

## Notes

<!-- Any extra notes -->

- Spec: context/features/seed-spec.md
- Data models: context/project-overview.md
- Database standards: context/coding-standards.md
- An existing seed script is already in place (commit `06f823f`) — overwrite it to match the spec
- Use Node 22 LTS (Cellar path) for Prisma CLI commands; Node 23 hard-fails
- Use real URLs for all link items

## History

<!-- Keep this updated. Earliest to latest -->

- Init
- Add initial Next.js setup, global styles, mock data, and project overview
- feat: scaffold dashboard UI phase 1 with shadcn
- feat: implement collapsible dashboard sidebar phase 2 with shadcn
- Dashboard UI Phase 2 completed
- feat: implement dashboard main area phase 3 with shadcn
- Dashboard UI Phase 3 completed
- feat: set up Prisma 7 ORM with Neon PostgreSQL
- feat: add database seed script with dummy data
- fix: pin prisma scripts to node 22 to avoid studio stream errors
- Prisma + Neon PostgreSQL Setup completed
- feat: seed database with sample data per seed-spec
- Seed Database with Sample Data completed
