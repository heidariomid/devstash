import Link from "next/link";
import { Star } from "lucide-react";

import { getRecentCollections } from "@/src/lib/db/collections";
import { getItemTypeIcon } from "@/src/lib/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

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

export async function RecentCollections() {
  let collections: Awaited<ReturnType<typeof getRecentCollections>> = [];
  try {
    const userId = await getDemoUserId();
    if (userId) collections = await getRecentCollections(userId);
  } catch {
    // DB unreachable — render empty
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Link
          href="/collections"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <Card
              className="h-full gap-3 transition-colors hover:border-primary/50"
              style={
                collection.dominantColor
                  ? {
                      borderLeftColor: collection.dominantColor,
                      borderLeftWidth: "3px",
                    }
                  : undefined
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span className="truncate">{collection.name}</span>
                  {collection.isFavorite && (
                    <Star className="size-4 shrink-0 fill-amber-400 text-amber-400" />
                  )}
                </CardTitle>
                <CardDescription className="flex items-center justify-between gap-2">
                  <span>{collection.itemCount} items</span>
                  {collection.typeIcons.length > 0 && (
                    <span className="flex items-center gap-1">
                      {collection.typeIcons.map((t) => {
                        const Icon = getItemTypeIcon(t.icon);
                        return (
                          <Icon
                            key={t.name}
                            className="size-3.5"
                            style={{ color: t.color }}
                          />
                        );
                      })}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              {collection.description && (
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
