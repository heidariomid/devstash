import { FolderHeart, Folders, FileStack, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getDashboardStats } from "@/src/lib/db/items";
import { Card, CardContent } from "@/src/components/ui/card";

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

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

export async function StatsCards() {
  const userId = await getDemoUserId();
  const stats = userId
    ? await getDashboardStats(userId)
    : { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 };

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
