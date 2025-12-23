"use client";

import { Sidebar } from "./components/sidebar";
import { EmptyDashboard } from "./components/empty-dashboard";
import { ProductTour } from "@/components/product-tour";
import { dashboardTourSteps } from "./tour-config";

export default function DashboardPage() {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-background">
          <EmptyDashboard />
        </main>
      </div>

      <ProductTour
        steps={dashboardTourSteps}
        onComplete={() => {
          console.log("Tour completado!");
        }}
        onSkip={() => {
          console.log("Tour pulado");
        }}
      />
    </>
  );
}
