import { Pin } from "lucide-react";

import { items } from "@/src/lib/mock-data";
import { ItemRow } from "@/src/components/dashboard/ItemRow";

const pinnedItems = items.filter((item) => item.isPinned);

export function PinnedItems() {
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
