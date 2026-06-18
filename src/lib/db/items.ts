import { prisma } from "@/src/lib/prisma";

export interface ItemWithType {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  type: {
    name: string;
    icon: string | null;
    color: string | null;
  };
  tags: { name: string }[];
}

export async function getPinnedItems(userId: string): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: {
      type: { select: { name: true, icon: true, color: true } },
      tags: { include: { tag: { select: { name: true } } } },
    },
  }).then((items) =>
    items.map((item) => ({
      ...item,
      tags: item.tags.map((t) => ({ name: t.tag.name })),
    }))
  );
}

export async function getRecentItems(
  userId: string,
  limit = 10
): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      type: { select: { name: true, icon: true, color: true } },
      tags: { include: { tag: { select: { name: true } } } },
    },
  }).then((items) =>
    items.map((item) => ({
      ...item,
      tags: item.tags.map((t) => ({ name: t.tag.name })),
    }))
  );
}

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count({ where: { userId } }),
      prisma.collection.count({ where: { userId } }),
      prisma.item.count({ where: { userId, isFavorite: true } }),
      prisma.collection.count({ where: { userId, isFavorite: true } }),
    ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}

export interface ItemTypeSummary {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
}

// System item types with a per-type item count for the sidebar.
export async function getSystemItemTypes(
  userId: string
): Promise<ItemTypeSummary[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      icon: true,
      color: true,
      _count: { select: { items: { where: { userId } } } },
    },
  });

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon ?? "File",
    color: t.color ?? "#6b7280",
    itemCount: t._count.items,
  }));
}
