import { Clock } from "lucide-react";

import { getRecentItems } from "@/src/lib/db/items";
import { getDemoUserId } from "@/src/lib/db/user";
import { ItemRow } from "@/src/components/dashboard/ItemRow";

export async function RecentItems() {
  let recentItems: Awaited<ReturnType<typeof getRecentItems>> = [];
  try {
    const userId = await getDemoUserId();
    if (userId) recentItems = await getRecentItems(userId);
  } catch {
    // DB unreachable — render empty
  }

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
