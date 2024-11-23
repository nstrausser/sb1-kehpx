import { useModal } from "@/lib/store/modal-store";
import { useInventoryStore } from "@/lib/store/inventory-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InventoryForm } from "./inventory-form";
import { toast } from "sonner";
import type { PPFRoll } from "@/types";

export function EditInventoryModal() {
  const { isOpen, type, data, onClose } = useModal();
  const updateRoll = useInventoryStore((state) => state.updateRoll);
  const inventory = data.inventory as PPFRoll;

  const isModalOpen = isOpen && type === "editInventory";

  const handleSubmit = (formData: any) => {
    updateRoll(inventory.id, formData);
    toast.success("Roll updated successfully");
    onClose();
  };

  if (!inventory) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Roll</DialogTitle>
        </DialogHeader>

        <InventoryForm inventory={inventory} onSubmit={handleSubmit} />

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Update Roll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}