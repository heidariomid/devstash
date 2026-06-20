import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Edge-compatible config: providers only, no adapter.
// Safe to import in the proxy (edge runtime). The full config
// in auth.ts spreads this and adds the Prisma adapter.
export default {
  providers: [GitHub],
} satisfies NextAuthConfig;
