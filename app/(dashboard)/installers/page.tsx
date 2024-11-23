import { Suspense } from "react";
import { InstallersContent } from "@/components/installers/content";
import { InstallersSkeleton } from "@/components/installers/skeleton";

export const metadata = {
  title: "Installers - PPF Inventory Manager",
  description: "Manage installers and track performance",
};

export default function InstallersPage() {
  return (
    <Suspense fallback={<InstallersSkeleton />}>
      <InstallersContent />
    </Suspense>
  );
}