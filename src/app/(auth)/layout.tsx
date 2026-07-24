import Link from "next/link";

import { ThemeToggle } from "@/src/components/theme/ThemeToggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 py-10">
      {/* The auth pages have no top bar, so the toggle lives in the corner. */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
          D
        </span>
        <span>DevStash</span>
      </Link>
      {children}
    </div>
  );
}
