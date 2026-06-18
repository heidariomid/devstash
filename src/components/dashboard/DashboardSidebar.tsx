import Link from "next/link";
import { ChevronDown, Settings, Star } from "lucide-react";

import { getSidebarCollections } from "@/src/lib/db/collections";
import { getSystemItemTypes } from "@/src/lib/db/items";
import { getDemoUserId } from "@/src/lib/db/user";
import { getItemTypeIcon } from "@/src/lib/icons";
import { currentUser } from "@/src/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

// Slug used for the /items/[type] route, e.g. "Snippets" -> "snippets".
function typeSlug(name: string) {
  return name.toLowerCase();
}

export async function DashboardSidebar() {
  let itemTypes: Awaited<ReturnType<typeof getSystemItemTypes>> = [];
  let favorites: Awaited<ReturnType<typeof getSidebarCollections>>["favorites"] =
    [];
  let recents: Awaited<ReturnType<typeof getSidebarCollections>>["recents"] = [];

  try {
    const userId = await getDemoUserId();
    if (userId) {
      const [types, collections] = await Promise.all([
        getSystemItemTypes(userId),
        getSidebarCollections(userId),
      ]);
      itemTypes = types;
      favorites = collections.favorites;
      recents = collections.recents;
    }
  } catch {
    // DB unreachable — render with empty lists
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center border-b border-border px-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            D
          </span>
          <span>DevStash</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Item types */}
        <Collapsible defaultOpen className="group/types">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                Types
                <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/types:-rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itemTypes.map((type) => {
                    const Icon = getItemTypeIcon(type.icon);
                    return (
                      <SidebarMenuItem key={type.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/items/${typeSlug(type.name)}`}>
                            <Icon style={{ color: type.color }} />
                            <span>{type.name}</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>{type.itemCount}</SidebarMenuBadge>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Collections */}
        <Collapsible defaultOpen className="group/collections">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                Collections
                <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/collections:-rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              {favorites.length > 0 && (
                <SidebarGroupContent>
                  <SidebarGroupLabel className="px-2">
                    Favorites
                  </SidebarGroupLabel>
                  <SidebarMenu>
                    {favorites.map((collection) => (
                      <SidebarMenuItem key={collection.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/collections/${collection.id}`}>
                            <Star className="fill-amber-400 text-amber-400" />
                            <span>{collection.name}</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>
                          {collection.itemCount}
                        </SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}

              <SidebarGroupContent>
                <SidebarGroupLabel className="px-2">
                  All Collections
                </SidebarGroupLabel>
                <SidebarMenu>
                  {recents.map((collection) => (
                    <SidebarMenuItem key={collection.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/collections/${collection.id}`}>
                          <span
                            className="size-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor:
                                collection.dominantColor ?? "#6b7280",
                            }}
                          />
                          <span>{collection.name}</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        {collection.itemCount}
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/collections"
                      className="text-muted-foreground"
                    >
                      <span>View all collections</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="flex items-center gap-2 p-1">
          <Avatar className="size-8">
            {currentUser.avatarUrl && (
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            )}
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">
              {currentUser.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {currentUser.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            aria-label="Settings"
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
