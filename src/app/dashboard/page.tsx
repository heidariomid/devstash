import { PinnedItems } from "@/src/components/dashboard/PinnedItems";
import { RecentCollections } from "@/src/components/dashboard/RecentCollections";
import { RecentItems } from "@/src/components/dashboard/RecentItems";
import { StatsCards } from "@/src/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards />
      <RecentCollections />
      <PinnedItems />
      <RecentItems />
    </div>
  );
}
