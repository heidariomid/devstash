# Current Feature

<!-- Feature Name -->

Prisma + Neon PostgreSQL Setup

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Set up Prisma ORM (Prisma 7) with Neon PostgreSQL (serverless)
- Create initial schema based on the data models in project-overview.md (will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use migrations only — always `prisma migrate dev`, never push directly unless specified

## Notes

<!-- Any extra notes -->

- Use Prisma 7 — has breaking changes; read the upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup reference: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Dev work targets the development branch via DATABASE_URL; production is a separate branch
- Spec: context/features/database-spec.md
- Initial data models: context/project-overview.md
- Database standards: context/coding-standards.md

### Implementation notes (Prisma 7 specifics)

- **Node version**: Prisma 7 supports Node 20.19+, 22.12+, 24.0+ — NOT the 23.x line. The machine only had Node 23.11.0, so Node 22 LTS was installed (`brew install node@22`); run Prisma CLI commands with that on PATH (`/opt/homebrew/Cellar/node@22/<v>/bin`). Next.js `build`/`dev` run fine on Node 23 — only the Prisma CLI is gated.
- **Generator**: `provider = "prisma-client"` (new) with `output = "../src/generated/prisma"`. Generated client is gitignored and regenerated via the `postinstall` script.
- **Client import**: `import { PrismaClient } from "@/src/generated/prisma/client"` — not `@prisma/client`.
- **No `url` in `datasource`**: Prisma 7 removed it. Migrate/CLI connection URL lives only in `prisma.config.ts` (via `DIRECT_URL`); the runtime client connects via the Neon driver adapter.
- **Env not auto-loaded**: `prisma.config.ts` imports `dotenv/config`.
- **Connection strings**: `DATABASE_URL` = pooled (runtime adapter), `DIRECT_URL` = unpooled (Migrate). Both in `.env`; `.env.example` committed.
- **Driver adapter**: `@prisma/adapter-neon` (serverless) in `src/lib/prisma.ts` with a dev singleton.
- Scripts: `db:generate`, `db:migrate`, `db:migrate:deploy`, `db:status`, `db:studio`.

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
- Prisma + Neon PostgreSQL Setup completed
