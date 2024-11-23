import { Suspense } from "react";
import { DashboardContent } from "@/components/dashboard/content";
import { DashboardSkeleton } from "@/components/dashboard/skeleton";

export const metadata = {
  title: "Dashboard - PPF Inventory Manager",
  description: "Overview of your PPF inventory and installations",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}