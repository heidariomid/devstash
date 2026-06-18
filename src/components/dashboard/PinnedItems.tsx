import { Pin } from "lucide-react";

import { getPinnedItems } from "@/src/lib/db/items";
import { ItemRow } from "@/src/components/dashboard/ItemRow";

// Hardcoded to the demo user until auth is in place.
const DEMO_USER_EMAIL = "demo@devstash.io";

async function getDemoUserId(): Promise<string | null> {
  const { prisma } = await import("@/src/lib/prisma");
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
}

export async function PinnedItems() {
  let pinnedItems: Awaited<ReturnType<typeof getPinnedItems>> = [];
  try {
    const userId = await getDemoUserId();
    if (userId) pinnedItems = await getPinnedItems(userId);
  } catch {
    // DB unreachable — render empty
  }

  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Pinned</h2>
      </div>

      <div className="flex flex-col gap-3">
        {pinnedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
