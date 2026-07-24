import { FolderPlus, Plus, Search } from "lucide-react";

import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { SidebarTrigger } from "@/src/components/ui/sidebar";

// Display-only top bar for the dashboard. Search and action buttons are
// not wired up yet — interactivity arrives in a later phase.
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <SidebarTrigger />

      <Separator orientation="vertical" className="h-6!" />

      <div className="relative mx-auto w-full max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          className="pl-9"
          aria-label="Search items"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:flex">
          ⌘ K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <FolderPlus className="size-4" />
          New Collection
        </Button>
        <Button size="sm">
          <Plus className="size-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}
