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

  // Vendored shadcn primitives carry their own `transition-all` /
  // `transition-[color,...]` classes for hover and focus. Those would also
  // animate on a theme swap, so every button, badge and row fades on its own
  // clock. Flag the document while switching and let globals.css suppress
  // them, then clear the flag once the new palette has been painted.
  function handleToggle() {
    const root = document.documentElement;
    root.dataset.themeSwitching = "";

    setTheme(isDark ? "light" : "dark");

    // Two frames: one for the class change, one for the repaint under it.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => delete root.dataset.themeSwitching)
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={handleToggle}
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
