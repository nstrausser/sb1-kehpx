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

export function NewInstallerModal() {
  const { isOpen, type, onClose } = useModal();
  const addInstaller = useInstallerStore((state) => state.addInstaller);

  const isModalOpen = isOpen && type === "addInstaller";

  const handleSubmit = (formData: any) => {
    const installer = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      joinedDate: new Date().toISOString(),
    };

    addInstaller(installer);
    toast.success("Installer added successfully");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Installer</DialogTitle>
        </DialogHeader>

        <InstallerForm onSubmit={handleSubmit} />

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Installer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}