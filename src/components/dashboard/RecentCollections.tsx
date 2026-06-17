import Link from "next/link";
import { Star } from "lucide-react";

import { collections } from "@/src/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

// No timestamps on collections yet, so array order stands in for recency.
const recentCollections = collections.slice(0, 6);

export function RecentCollections() {
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
        {recentCollections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <Card className="h-full gap-3 transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="truncate">{collection.name}</span>
                  {collection.isFavorite && (
                    <Star className="size-4 shrink-0 fill-amber-400 text-amber-400" />
                  )}
                </CardTitle>
                <CardDescription>
                  {collection.itemCount} items
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
