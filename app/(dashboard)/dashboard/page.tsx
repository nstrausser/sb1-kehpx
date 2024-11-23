import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the content component with no SSR
const DashboardContent = dynamic(
  () => import("@/components/dashboard/DashboardContent"),
  {
    loading: () => (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
      </div>
    ),
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Dashboard - PPF Inventory Manager",
  description: "Track and manage paint protection film inventory and installations",
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}