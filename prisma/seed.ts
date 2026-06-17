import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Demo user that owns all seeded data.
const USER = {
  id: "user_demo",
  email: "demo@devstash.dev",
  name: "Demo User",
  isPro: true,
};

const itemTypes = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#60a5fa" },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#c084fc" },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f59e0b" },
  { id: "type_note", name: "Notes", icon: "FileText", color: "#34d399" },
  { id: "type_file", name: "Files", icon: "File", color: "#94a3b8" },
  { id: "type_image", name: "Images", icon: "Image", color: "#f472b6" },
  { id: "type_url", name: "Links", icon: "Link", color: "#22d3ee" },
];

const collections = [
  { id: "col_react", name: "React Patterns", description: "Common React patterns and hooks", isFavorite: true },
  { id: "col_python", name: "Python Snippets", description: "Useful Python code snippets", isFavorite: false },
  { id: "col_context", name: "Context Files", description: "AI context files for projects", isFavorite: true },
  { id: "col_interview", name: "Interview Prep", description: "Technical interview preparation", isFavorite: false },
  { id: "col_git", name: "Git Commands", description: "Frequently used git commands", isFavorite: true },
  { id: "col_prompts", name: "AI Prompts", description: "Curated AI prompts for coding", isFavorite: false },
];

const items = [
  {
    id: "item_useauth",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    content:
      "export function useAuth() {\n  const { data: session } = useSession();\n  return { user: session?.user, isAuthenticated: !!session };\n}",
    contentType: "text",
    language: "typescript",
    url: null as string | null,
    isFavorite: true,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react" as string | null,
    tags: ["react", "auth", "hooks"],
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "item_api_error",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    content:
      "async function fetchWithRetry(url, options, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      return await fetch(url, options);\n    } catch (e) {\n      if (i === retries - 1) throw e;\n      await new Promise((r) => setTimeout(r, 2 ** i * 1000));\n    }\n  }\n}",
    contentType: "text",
    language: "javascript",
    url: null as string | null,
    isFavorite: false,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react" as string | null,
    tags: ["api", "error-handling", "fetch"],
    createdAt: new Date("2026-01-12"),
  },
  {
    id: "item_git_undo",
    title: "Undo Last Commit",
    description: "Soft reset to keep changes staged",
    content: "git reset --soft HEAD~1",
    contentType: "text",
    language: "bash",
    url: null as string | null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_git" as string | null,
    tags: ["git", "reset"],
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "item_code_review_prompt",
    title: "Code Review Prompt",
    description: "Prompt for thorough AI code reviews",
    content:
      "Review the following code for bugs, security issues, and readability. Suggest concrete improvements with examples.",
    contentType: "text",
    language: null as string | null,
    url: null as string | null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_prompts" as string | null,
    tags: ["ai", "code-review"],
    createdAt: new Date("2026-01-09"),
  },
  {
    id: "item_debounce",
    title: "Debounce Function",
    description: "Lightweight debounce utility in Python",
    content:
      "from threading import Timer\n\ndef debounce(wait):\n    def decorator(fn):\n        def debounced(*args, **kwargs):\n            debounced._timer and debounced._timer.cancel()\n            debounced._timer = Timer(wait, fn, args, kwargs)\n            debounced._timer.start()\n        debounced._timer = None\n        return debounced\n    return decorator",
    contentType: "text",
    language: "python",
    url: null as string | null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_python" as string | null,
    tags: ["python", "utility"],
    createdAt: new Date("2026-01-07"),
  },
  {
    id: "item_nextjs_docs",
    title: "Next.js App Router Docs",
    description: "Official routing documentation",
    content: null as string | null,
    contentType: "text",
    language: null as string | null,
    url: "https://nextjs.org/docs/app",
    isFavorite: false,
    isPinned: false,
    typeId: "type_url",
    collectionId: null as string | null,
    tags: ["nextjs", "docs"],
    createdAt: new Date("2026-01-05"),
  },
];

async function main() {
  console.log("Seeding database…");

  // Clear the demo user's items/tags so re-running is idempotent.
  await prisma.itemTag.deleteMany({ where: { item: { userId: USER.id } } });
  await prisma.item.deleteMany({ where: { userId: USER.id } });
  await prisma.tag.deleteMany({ where: { userId: USER.id } });

  // User
  await prisma.user.upsert({
    where: { id: USER.id },
    update: { email: USER.email, name: USER.name, isPro: USER.isPro },
    create: USER,
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
