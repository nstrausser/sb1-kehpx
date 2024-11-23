import { Suspense } from "react";
import { InstallationsContent } from "@/components/installations/content";
import { InstallationsSkeleton } from "@/components/installations/skeleton";

export const metadata = {
  title: "Installations - PPF Inventory Manager",
  description: "Track and manage PPF installations",
};

export default function InstallationsPage() {
  return (
    <Suspense fallback={<InstallationsSkeleton />}>
      <InstallationsContent />
    </Suspense>
  );
}