# Current Feature

<!-- Feature Name -->
Stats & Sidebar — Live Data from Neon DB

## Status

<!-- Not Started|In Progress|Completed -->
Completed

## Goals

<!-- Goals & requirements -->
Show main-area stats, sidebar item types, and sidebar collections from the database instead of `src/lib/mock-data.ts`.

- Display main-area stats from database data, keeping the current design/layout
- Display system item types in the sidebar with their icons, linking to `/items/[typename]`
- Add a "View all collections" link under the collections list that goes to `/collections`
- Keep the star icons for favorite collections; for recents, each collection shows a colored circle based on the most-used item type in that collection
- Create `src/lib/db/items.ts` and add the database functions (use `src/lib/db/collections.ts` for reference)

## Notes

<!-- Any extra notes -->
Reference: `context/features/stats-sidebar-spec.md`
Reference: `src/lib/db/collections.ts`
Do not use `src/lib/mock-data.ts` — DB only.

## History

<!-- Keep this updated. Earliest to latest -->

- Init
- Add initial Next.js setup, global styles, mock data, and project overview
- feat: scaffold dashboard UI phase 1 with shadcn
- feat: implement collapsible dashboard sidebar phase 2 with shadcn
- feat: implement dashboard main area phase 3 with shadcn
- feat: set up Prisma 7 ORM with Neon PostgreSQL
- feat: add database seed script with dummy data
- fix: pin prisma scripts to node 22 to avoid studio stream errors
- feat: seed database with sample data per seed-spec
- feat: dashboard collections live data from Neon DB via Prisma
- feat: dashboard items live data from Neon DB via Prisma
- fix: graceful DB error handling and connection timeout for offline/no-VPN environments
- feat: sidebar item types & collections live data from Neon DB via Prisma
