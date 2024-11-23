import { Suspense } from "react";
import { InventoryContent } from "@/components/inventory/content";
import { InventorySkeleton } from "@/components/inventory/skeleton";

export const metadata = {
  title: "Inventory - PPF Inventory Manager",
  description: "Manage your paint protection film inventory",
};

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventorySkeleton />}>
      <InventoryContent />
    </Suspense>
  );
}