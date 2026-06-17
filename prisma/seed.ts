import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Demo user that owns all seeded data.
const USER = {
  id: "user_demo",
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
  isPro: false,
};

// System item types — icons are Lucide React component names.
const itemTypes = [
  { id: "type_snippet", name: "snippet", icon: "Code", color: "#3b82f6" },
  { id: "type_prompt", name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { id: "type_command", name: "command", icon: "Terminal", color: "#f97316" },
  { id: "type_note", name: "note", icon: "StickyNote", color: "#fde047" },
  { id: "type_file", name: "file", icon: "File", color: "#6b7280" },
  { id: "type_image", name: "image", icon: "Image", color: "#ec4899" },
  { id: "type_link", name: "link", icon: "Link", color: "#10b981" },
];

const collections = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
  },
  {
    id: "col_ai",
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
  },
  {
    id: "col_devops",
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    isFavorite: false,
  },
  {
    id: "col_terminal",
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    isFavorite: false,
  },
  {
    id: "col_design",
    name: "Design Resources",
    description: "UI/UX resources and references",
    isFavorite: false,
  },
];

type SeedItem = {
  id: string;
  title: string;
  description: string;
  content: string | null;
  contentType: string;
  language: string | null;
  url: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  typeId: string;
  collectionId: string | null;
  tags: string[];
  createdAt: Date;
};

const items: SeedItem[] = [
  // ── React Patterns: 3 TypeScript snippets ──────────────────────
  {
    id: "item_use_debounce",
    title: "useDebounce Hook",
    description: "Debounce any rapidly-changing value with a custom hook",
    content:
      "import { useEffect, useState } from \"react\";\n\nexport function useDebounce<T>(value: T, delay = 300): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}",
    contentType: "text",
    language: "typescript",
    url: null,
    isFavorite: true,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "hooks", "typescript"],
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "item_use_local_storage",
    title: "useLocalStorage Hook",
    description: "Persist state to localStorage with a typed setter",
    content:
      "import { useCallback, useState } from \"react\";\n\nexport function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    try {\n      const raw = window.localStorage.getItem(key);\n      return raw ? (JSON.parse(raw) as T) : initial;\n    } catch {\n      return initial;\n    }\n  });\n\n  const set = useCallback(\n    (next: T) => {\n      setValue(next);\n      window.localStorage.setItem(key, JSON.stringify(next));\n    },\n    [key],\n  );\n\n  return [value, set] as const;\n}",
    contentType: "text",
    language: "typescript",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "hooks", "typescript"],
    createdAt: new Date("2026-01-14"),
  },
  {
    id: "item_theme_context",
    title: "Theme Context Provider",
    description: "Compound context provider with a typed consumer hook",
    content:
      "import { createContext, useContext, useState, type ReactNode } from \"react\";\n\ntype Theme = \"light\" | \"dark\";\ntype ThemeContextValue = { theme: Theme; toggle: () => void };\n\nconst ThemeContext = createContext<ThemeContextValue | null>(null);\n\nexport function ThemeProvider({ children }: { children: ReactNode }) {\n  const [theme, setTheme] = useState<Theme>(\"dark\");\n  const toggle = () => setTheme((t) => (t === \"dark\" ? \"light\" : \"dark\"));\n  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;\n}\n\nexport function useTheme() {\n  const ctx = useContext(ThemeContext);\n  if (!ctx) throw new Error(\"useTheme must be used within ThemeProvider\");\n  return ctx;\n}",
    contentType: "text",
    language: "typescript",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "context", "typescript"],
    createdAt: new Date("2026-01-13"),
  },

  // ── AI Workflows: 3 prompts ────────────────────────────────────
  {
    id: "item_prompt_code_review",
    title: "Code Review Prompt",
    description: "Thorough, structured AI code review",
    content:
      "You are a senior engineer reviewing a pull request. Review the code below for:\n1. Correctness bugs and edge cases\n2. Security vulnerabilities\n3. Performance issues (N+1 queries, unnecessary re-renders)\n4. Readability and naming\n\nFor each finding, cite the line, explain the impact, and propose a concrete fix.",
    contentType: "text",
    language: null,
    url: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "code-review", "prompt"],
    createdAt: new Date("2026-01-12"),
  },
  {
    id: "item_prompt_docs",
    title: "Documentation Generation Prompt",
    description: "Generate reference docs from a code file",
    content:
      "Generate developer documentation for the following module. Include: a one-paragraph overview, a description of each exported function (parameters, return value, thrown errors), and one runnable usage example. Use Markdown with fenced code blocks.",
    contentType: "text",
    language: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "documentation", "prompt"],
    createdAt: new Date("2026-01-11"),
  },
  {
    id: "item_prompt_refactor",
    title: "Refactoring Assistance Prompt",
    description: "Refactor code without changing behavior",
    content:
      "Refactor the code below to improve readability and maintainability WITHOUT changing its observable behavior. Preserve the public API. Explain each change and why it is safe. Flag anything that would alter behavior so I can decide.",
    contentType: "text",
    language: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "refactoring", "prompt"],
    createdAt: new Date("2026-01-10"),
  },

  // ── DevOps: 1 snippet, 1 command, 2 links ──────────────────────
  {
    id: "item_dockerfile_node",
    title: "Multi-stage Node Dockerfile",
    description: "Slim production image with a build stage",
    content:
      "# syntax=docker/dockerfile:1\nFROM node:22-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/.next ./.next\nCOPY --from=build /app/node_modules ./node_modules\nCOPY --from=build /app/package.json ./package.json\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
    contentType: "text",
    language: "dockerfile",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_devops",
    tags: ["docker", "ci-cd", "devops"],
    createdAt: new Date("2026-01-09"),
  },
  {
    id: "item_deploy_vercel",
    title: "Deploy to Vercel (production)",
    description: "Build and deploy the current commit to production",
    content: "vercel deploy --prod --yes",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_devops",
    tags: ["deployment", "vercel", "devops"],
    createdAt: new Date("2026-01-08"),
  },
  {
    id: "item_docker_docs",
    title: "Docker Documentation",
    description: "Official Docker reference and guides",
    content: null,
    contentType: "text",
    language: null,
    url: "https://docs.docker.com/",
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_devops",
    tags: ["docker", "docs", "devops"],
    createdAt: new Date("2026-01-07"),
  },
  {
    id: "item_gh_actions_docs",
    title: "GitHub Actions Documentation",
    description: "Workflow syntax and CI/CD reference",
    content: null,
    contentType: "text",
    language: null,
    url: "https://docs.github.com/en/actions",
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_devops",
    tags: ["ci-cd", "github-actions", "devops"],
    createdAt: new Date("2026-01-06"),
  },

  // ── Terminal Commands: 4 commands ──────────────────────────────
  {
    id: "item_cmd_git_undo",
    title: "Undo Last Commit (keep changes)",
    description: "Soft reset to the previous commit, leaving changes staged",
    content: "git reset --soft HEAD~1",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_terminal",
    tags: ["git", "terminal"],
    createdAt: new Date("2026-01-05"),
  },
  {
    id: "item_cmd_docker_prune",
    title: "Prune Unused Docker Resources",
    description: "Reclaim disk by removing dangling images, containers, and networks",
    content: "docker system prune -a --volumes",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_terminal",
    tags: ["docker", "terminal"],
    createdAt: new Date("2026-01-04"),
  },
  {
    id: "item_cmd_kill_port",
    title: "Kill Process on Port",
    description: "Find and terminate whatever is listening on port 3000",
    content: "lsof -ti :3000 | xargs kill -9",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_terminal",
    tags: ["process", "terminal"],
    createdAt: new Date("2026-01-03"),
  },
  {
    id: "item_cmd_pnpm_outdated",
    title: "List Outdated Packages",
    description: "Show dependencies with newer versions available",
    content: "pnpm outdated --recursive",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_terminal",
    tags: ["pnpm", "package-manager", "terminal"],
    createdAt: new Date("2026-01-02"),
  },

  // ── Design Resources: 4 links ──────────────────────────────────
  {
    id: "item_link_tailwind",
    title: "Tailwind CSS Documentation",
    description: "Utility-first CSS framework reference",
    content: null,
    contentType: "text",
    language: null,
    url: "https://tailwindcss.com/docs",
    isFavorite: true,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_design",
    tags: ["css", "tailwind", "design"],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "item_link_shadcn",
    title: "shadcn/ui Components",
    description: "Accessible, composable React component library",
    content: null,
    contentType: "text",
    language: null,
    url: "https://ui.shadcn.com/",
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_design",
    tags: ["components", "react", "design"],
    createdAt: new Date("2025-12-31"),
  },
  {
    id: "item_link_radix",
    title: "Radix UI Primitives",
    description: "Unstyled, accessible component primitives",
    content: null,
    contentType: "text",
    language: null,
    url: "https://www.radix-ui.com/primitives",
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_design",
    tags: ["design-system", "react", "design"],
    createdAt: new Date("2025-12-30"),
  },
  {
    id: "item_link_lucide",
    title: "Lucide Icons",
    description: "Beautiful, consistent open-source icon set",
    content: null,
    contentType: "text",
    language: null,
    url: "https://lucide.dev/icons/",
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_design",
    tags: ["icons", "design"],
    createdAt: new Date("2025-12-29"),
  },
];

async function main() {
  console.log("Seeding database…");

  // Clear the demo user's items/tags so re-running is idempotent.
  await prisma.itemTag.deleteMany({ where: { item: { userId: USER.id } } });
  await prisma.item.deleteMany({ where: { userId: USER.id } });
  await prisma.tag.deleteMany({ where: { userId: USER.id } });

  // User — password hashed with bcryptjs (12 rounds), verified now.
  const hashedPassword = await bcrypt.hash(USER.password, 12);
  await prisma.user.upsert({
    where: { id: USER.id },
    update: {
      email: USER.email,
      name: USER.name,
      password: hashedPassword,
      isPro: USER.isPro,
      emailVerified: new Date(),
    },
    create: {
      id: USER.id,
      email: USER.email,
      name: USER.name,
      password: hashedPassword,
      isPro: USER.isPro,
      emailVerified: new Date(),
    },
  });

  // Item types (system types owned by the demo user)
  for (const t of itemTypes) {
    await prisma.itemType.upsert({
      where: { id: t.id },
      update: { name: t.name, icon: t.icon, color: t.color },
      create: { ...t, isSystem: true, userId: USER.id },
    });
  }

  // Collections
  for (const c of collections) {
    await prisma.collection.upsert({
      where: { id: c.id },
      update: { name: c.name, description: c.description, isFavorite: c.isFavorite },
      create: { ...c, userId: USER.id },
    });
  }

  // Tags — unique per (userId, name)
  const tagNames = [...new Set(items.flatMap((i) => i.tags))];
  const tagIdByName = new Map<string, string>();
  for (const name of tagNames) {
    const tag = await prisma.tag.create({ data: { name, userId: USER.id } });
    tagIdByName.set(name, tag.id);
  }

  // Items + their tag links
  for (const item of items) {
    const { tags, ...data } = item;
    await prisma.item.create({
      data: {
        ...data,
        userId: USER.id,
        tags: {
          create: tags.map((name) => ({ tagId: tagIdByName.get(name)! })),
        },
      },
    });
  }

  const counts = {
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
    items: await prisma.item.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
