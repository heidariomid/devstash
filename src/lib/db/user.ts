import { prisma } from "@/src/lib/prisma";

// Hardcoded to the demo user until auth is in place.
export const DEMO_USER_EMAIL = "demo@devstash.io";

export async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
}
