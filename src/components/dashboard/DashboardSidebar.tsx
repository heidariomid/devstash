import {
  Sidebar,
  SidebarContent,
} from "@/src/components/ui/sidebar";

// Placeholder dashboard sidebar. Filters and collections arrive in a later
// phase — for now it only establishes the shadcn sidebar shell.
export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </SidebarContent>
    </Sidebar>
  );
}
