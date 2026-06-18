import { Clock } from "lucide-react";

import { getRecentItems } from "@/src/lib/db/items";
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

export async function RecentItems() {
  const userId = await getDemoUserId();
  const recentItems = userId ? await getRecentItems(userId) : [];

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Recent Items</h2>
      </div>

      <div className="flex flex-col gap-3">
        {recentItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
