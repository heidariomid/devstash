"use client";

import Link from "next/link";
import { ChevronsUpDown, LogOut, User as UserIcon } from "lucide-react";

import { signOutAction } from "@/src/actions/auth";
import { UserAvatar } from "@/src/components/auth/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

interface SidebarUserProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function SidebarUser({ name, email, image }: SidebarUserProps) {
  const displayName = name?.trim() || "Account";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar name={name} image={image} className="size-8 rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                {email && (
                  <span className="truncate text-xs text-muted-foreground">
                    {email}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* side="top" so the menu opens upward, away from the footer. */}
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <UserAvatar
                  name={name}
                  image={image}
                  className="size-8 rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  {email && (
                    <span className="truncate text-xs text-muted-foreground">
                      {email}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserIcon className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* A form keeps sign-out a POST, so it can't be triggered by a
                stray GET (e.g. a prefetch or an <img> pointing at the URL). */}
            <form action={signOutAction}>
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full">
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
