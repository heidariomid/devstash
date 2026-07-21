import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";
import authConfig from "@/src/auth.config";

// Full config (Node runtime). Spreads the edge-safe authConfig and
// overrides the Credentials placeholder from auth.config.ts with the
// real bcrypt + Prisma validation, which cannot run at the edge.
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      // user is only present on sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  ...authConfig,
  providers: authConfig.providers.map((provider) => {
    // Override the Credentials placeholder with real validation.
    // GitHub is a provider function; the Credentials placeholder is an
    // already-initialized object with type "credentials".
    if (typeof provider !== "function" && provider.type === "credentials") {
      return Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const email = credentials?.email;
          const password = credentials?.password;

          if (typeof email !== "string" || typeof password !== "string") {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          // No user, or user has no password (OAuth-only account).
          if (!user || !user.password) {
            return null;
          }

          const passwordMatches = await bcrypt.compare(password, user.password);
          if (!passwordMatches) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        },
      });
    }
    return provider;
  }),
});
