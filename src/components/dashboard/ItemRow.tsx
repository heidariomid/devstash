import { createElement } from "react";
import Link from "next/link";
import { Pin, Star } from "lucide-react";

import { getItemTypeIcon } from "@/src/lib/icons";
import type { ItemWithType } from "@/src/lib/db/items";
import { Badge } from "@/src/components/ui/badge";

export function ItemRow({ item }: { item: ItemWithType }) {
  const icon = item.type.icon ?? "File";
  const color = item.type.color ?? undefined;

  return (
    <Link
      href={`/items/${item.id}`}
      className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
      style={color ? { borderLeftColor: color, borderLeftWidth: "3px" } : undefined}
    >
      <span
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"
        style={{ color }}
      >
        {createElement(getItemTypeIcon(icon), { className: "size-4" })}
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
          <Badge variant="outline" className="shrink-0 text-xs" style={{ color }}>
            {item.type.name}
          </Badge>
        </div>
        {item.description && (
          <p className="truncate text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag.name} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <span className="shrink-0 text-xs text-muted-foreground">
        {item.createdAt.toLocaleDateString()}
      </span>
    </Link>
  );
}
