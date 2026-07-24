"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/src/components/ui/button";

// Never resubscribes — this store only distinguishes server from client.
const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // The active theme isn't known during SSR, so hold off on rendering the
  // resolved icon until after hydration to avoid a markup mismatch.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
    >
      {mounted && isDark ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  );
}
