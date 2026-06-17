import { createElement } from "react";
import Link from "next/link";
import { Pin, Star } from "lucide-react";

import { getItemTypeIcon } from "@/src/lib/icons";
import { itemTypes, type Item } from "@/src/lib/mock-data";
import { Badge } from "@/src/components/ui/badge";

const itemTypeById = Object.fromEntries(
  itemTypes.map((type) => [type.id, type]),
);

export function ItemRow({ item }: { item: Item }) {
  const type = itemTypeById[item.typeId];

  return (
    <Link
      href={`/items/${item.id}`}
      className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
    >
      <span
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"
        style={{ color: type?.color }}
      >
        {createElement(getItemTypeIcon(type?.icon ?? "File"), {
          className: "size-4",
        })}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{item.title}</span>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
          )}
        </div>
        {item.description && (
          <p className="truncate text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <span className="shrink-0 text-xs text-muted-foreground">
        {item.createdAt}
      </span>
    </Link>
  );
}
