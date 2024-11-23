import { useModal } from "@/lib/store/modal-store";
import { useInstallerStore } from "@/lib/store/installer-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InstallerForm } from "./installer-form";
import { toast } from "sonner";
import type { Installer } from "@/types";

export function EditInstallerModal() {
  const { isOpen, type, data, onClose } = useModal();
  const updateInstaller = useInstallerStore((state) => state.updateInstaller);
  const installer = data.installer as Installer;

  const isModalOpen = isOpen && type === "editInstaller";

  const handleSubmit = (formData: any) => {
    const updates = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
    };

    updateInstaller(installer.id, updates);
    toast.success("Installer updated successfully");
    onClose();
  };

  if (!installer) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Installer</DialogTitle>
        </DialogHeader>

        <InstallerForm installer={installer} onSubmit={handleSubmit} />

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Update Installer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}