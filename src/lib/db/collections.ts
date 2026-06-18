import { prisma } from "@/src/lib/prisma";

export interface SidebarCollection {
  id: string;
  name: string;
  itemCount: number;
  isFavorite: boolean;
  dominantColor: string | null;
}

// Collections for the sidebar: favorites (shown with a star) and recents
// (shown with a colored circle of their most-used item type).
export async function getSidebarCollections(
  userId: string
): Promise<{ favorites: SidebarCollection[]; recents: SidebarCollection[] }> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { type: { select: { color: true } } } },
    },
  });

  const mapped: SidebarCollection[] = collections.map((col) => {
    const colorCounts = new Map<string, number>();
    for (const item of col.items) {
      const color = item.type.color ?? "#6b7280";
      colorCounts.set(color, (colorCounts.get(color) ?? 0) + 1);
    }

    let dominantColor: string | null = null;
    let maxCount = 0;
    for (const [color, count] of colorCounts) {
      if (count > maxCount) {
        maxCount = count;
        dominantColor = color;
      }
    }

    return {
      id: col.id,
      name: col.name,
      itemCount: col.items.length,
      isFavorite: col.isFavorite,
      dominantColor,
    };
  });

  return {
    favorites: mapped.filter((c) => c.isFavorite),
    recents: mapped,
  };
}

export interface CollectionWithTypeSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantColor: string | null;
  typeIcons: { icon: string; color: string; name: string }[];
}

export async function getRecentCollections(
  userId: string,
  limit = 6
): Promise<CollectionWithTypeSummary[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      items: {
        include: {
          type: {
            select: { id: true, name: true, icon: true, color: true },
          },
        },
      },
    },
  });

  return collections.map((col) => {
    // Count items per type
    const typeCounts = new Map<
      string,
      { count: number; icon: string; color: string; name: string }
    >();
    for (const item of col.items) {
      const t = item.type;
      const existing = typeCounts.get(t.id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(t.id, {
          count: 1,
          icon: t.icon ?? "File",
          color: t.color ?? "#6b7280",
          name: t.name,
        });
      }
    }

    // Dominant type = most-used; used for card border color
    let dominantColor: string | null = null;
    let maxCount = 0;
    for (const entry of typeCounts.values()) {
      if (entry.count > maxCount) {
        maxCount = entry.count;
        dominantColor = entry.color;
      }
    }

    const typeIcons = Array.from(typeCounts.values()).map(
      ({ icon, color, name }) => ({ icon, color, name })
    );

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      dominantColor,
      typeIcons,
    };
  });
}
