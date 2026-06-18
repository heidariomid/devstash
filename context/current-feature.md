# Current Feature

<!-- Feature Name -->
Dashboard Items — Live Data from Neon DB

## Status

<!-- Not Started|In Progress|Completed -->
Completed

## Goals

<!-- Goals & requirements -->
Replace dummy item data in the dashboard main area with actual data from the Neon database via Prisma.

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server component (pinned + recent items)
- Item card icon/border derived from item type
- Display item type tags and all existing card content
- If there are no pinned items, hide that section entirely
- Update collection stats display

## Notes

<!-- Any extra notes -->
Reference: `context/features/dashboard-items-spec.md`
Reference screenshot if needed: `context/screenshots/dashboard-ui-main.png`
Do not use `src/lib/mock-data.ts` for item data — DB only.

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
