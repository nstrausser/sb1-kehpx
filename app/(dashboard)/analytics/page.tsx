import { Suspense } from "react";
import { AnalyticsContent } from "@/components/analytics/content";
import { AnalyticsSkeleton } from "@/components/analytics/skeleton";

export const metadata = {
  title: "Analytics - PPF Inventory Manager",
  description: "View insights and analytics for your PPF business",
};

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent />
    </Suspense>
  );
}