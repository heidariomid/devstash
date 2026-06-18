import { FolderHeart, Folders, FileStack, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getDashboardStats } from "@/src/lib/db/items";
import { getDemoUserId } from "@/src/lib/db/user";
import { Card, CardContent } from "@/src/components/ui/card";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

export async function StatsCards() {
  let stats = { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 };
  try {
    const userId = await getDemoUserId();
    if (userId) stats = await getDashboardStats(userId);
  } catch {
    // DB unreachable — render with zeros
  }

  const cards: Stat[] = [
    { label: "Items", value: stats.totalItems, icon: FileStack },
    { label: "Collections", value: stats.totalCollections, icon: Folders },
    { label: "Favorite Items", value: stats.favoriteItems, icon: Star },
    { label: "Favorite Collections", value: stats.favoriteCollections, icon: FolderHeart },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((stat) => {
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
