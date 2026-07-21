import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

// Edge-compatible config: providers only, no adapter.
// Safe to import in the proxy (edge runtime). The full config
// in auth.ts spreads this and adds the Prisma adapter.
//
// The Credentials provider here is an edge-safe placeholder: it declares
// the provider (so sign-in UI and routes exist at the edge) but does no
// real validation. auth.ts overrides it with bcrypt + Prisma logic, which
// only run in the Node runtime.
export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: () => null,
    }),
  ],
} satisfies NextAuthConfig;
