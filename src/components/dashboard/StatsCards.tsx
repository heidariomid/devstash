import { FolderHeart, Folders, FileStack, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { collections, items } from "@/src/lib/mock-data";
import { Card, CardContent } from "@/src/components/ui/card";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

const stats: Stat[] = [
  { label: "Items", value: items.length, icon: FileStack },
  { label: "Collections", value: collections.length, icon: Folders },
  {
    label: "Favorite Items",
    value: items.filter((item) => item.isFavorite).length,
    icon: Star,
  },
  {
    label: "Favorite Collections",
    value: collections.filter((collection) => collection.isFavorite).length,
    icon: FolderHeart,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
