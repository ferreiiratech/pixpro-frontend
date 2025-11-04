import { Sidebar } from "./components/sidebar";
import { EmptyDashboard } from "./components/empty-dashboard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background">
        <EmptyDashboard />
      </main>
    </div>
  );
}
