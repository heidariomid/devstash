// Single source of truth for mock data used to render the dashboard UI
// until the database is implemented. Mirrors the Prisma draft in
// context/project-overview.md. For display only — no helper methods.

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string;
  isSystem: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  contentType: "text" | "file";
  language: string | null;
  url: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  typeId: string;
  collectionId: string | null;
  tags: string[];
  createdAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: null,
  isPro: true
};

export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#60a5fa", isSystem: true },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#c084fc", isSystem: true },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f59e0b", isSystem: true },
  { id: "type_note", name: "Notes", icon: "FileText", color: "#34d399", isSystem: true },
  { id: "type_file", name: "Files", icon: "File", color: "#94a3b8", isSystem: true },
  { id: "type_image", name: "Images", icon: "Image", color: "#f472b6", isSystem: true },
  { id: "type_url", name: "Links", icon: "Link", color: "#22d3ee", isSystem: true }
];

export const collections: Collection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15
  },
  {
    id: "col_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18
  }
];

export const items: Item[] = [
  {
    id: "item_useauth",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    content:
      "export function useAuth() {\n  const { data: session } = useSession();\n  return { user: session?.user, isAuthenticated: !!session };\n}",
    contentType: "text",
    language: "typescript",
    url: null,
    isFavorite: true,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "auth", "hooks"],
    createdAt: "2026-01-15"
  },
  {
    id: "item_api_error",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    content:
      "async function fetchWithRetry(url, options, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      return await fetch(url, options);\n    } catch (e) {\n      if (i === retries - 1) throw e;\n      await new Promise((r) => setTimeout(r, 2 ** i * 1000));\n    }\n  }\n}",
    contentType: "text",
    language: "javascript",
    url: null,
    isFavorite: false,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["api", "error-handling", "fetch"],
    createdAt: "2026-01-12"
  },
  {
    id: "item_git_undo",
    title: "Undo Last Commit",
    description: "Soft reset to keep changes staged",
    content: "git reset --soft HEAD~1",
    contentType: "text",
    language: "bash",
    url: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_git",
    tags: ["git", "reset"],
    createdAt: "2026-01-10"
  },
  {
    id: "item_code_review_prompt",
    title: "Code Review Prompt",
    description: "Prompt for thorough AI code reviews",
    content:
      "Review the following code for bugs, security issues, and readability. Suggest concrete improvements with examples.",
    contentType: "text",
    language: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_prompts",
    tags: ["ai", "code-review"],
    createdAt: "2026-01-09"
  },
  {
    id: "item_debounce",
    title: "Debounce Function",
    description: "Lightweight debounce utility in Python",
    content:
      "from threading import Timer\n\ndef debounce(wait):\n    def decorator(fn):\n        def debounced(*args, **kwargs):\n            debounced._timer and debounced._timer.cancel()\n            debounced._timer = Timer(wait, fn, args, kwargs)\n            debounced._timer.start()\n        debounced._timer = None\n        return debounced\n    return decorator",
    contentType: "text",
    language: "python",
    url: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_python",
    tags: ["python", "utility"],
    createdAt: "2026-01-07"
  },
  {
    id: "item_nextjs_docs",
    title: "Next.js App Router Docs",
    description: "Official routing documentation",
    content: null,
    contentType: "text",
    language: null,
    url: "https://nextjs.org/docs/app",
    isFavorite: false,
    isPinned: false,
    typeId: "type_url",
    collectionId: null,
    tags: ["nextjs", "docs"],
    createdAt: "2026-01-05"
  }
];
