import { Clock } from "lucide-react";

import { items } from "@/src/lib/mock-data";
import { ItemRow } from "@/src/components/dashboard/ItemRow";

// Sort by createdAt descending and take the 10 most recent.
const recentItems = [...items]
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  .slice(0, 10);

export function RecentItems() {
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
