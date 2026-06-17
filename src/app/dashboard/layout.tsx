import { DashboardSidebar } from "@/src/components/dashboard/DashboardSidebar";
import { TopBar } from "@/src/components/dashboard/TopBar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex h-screen flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
