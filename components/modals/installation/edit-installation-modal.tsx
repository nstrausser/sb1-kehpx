import { useState, useEffect } from "react";
import { useModal } from "@/lib/store/modal-store";
import { useInstallationStore } from "@/lib/store/installation-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { InstallationForm } from "./installation-form";
import { CutForm } from "./cut-form";
import { toast } from "sonner";
import type { Cut, Installation } from "@/types";

export function EditInstallationModal() {
  const { isOpen, type, data, onClose } = useModal();
  const updateInstallation = useInstallationStore((state) => state.updateInstallation);
  const [cuts, setCuts] = useState<Cut[]>([]);
  const installation = data.installation as Installation;

  const isModalOpen = isOpen && type === "editInstallation";

  useEffect(() => {
    if (installation) {
      setCuts(installation.cuts);
    }
  }, [installation]);

  const handleSubmit = (formData: any) => {
    if (cuts.length === 0) {
      toast.error("At least one cut is required");
      return;
    }

    const totalArea = cuts.reduce((sum, cut) => sum + cut.squareFeet, 0);

    const updates = {
      ...formData,
      cuts,
      totalArea,
      updatedAt: new Date().toISOString(),
    };

    updateInstallation(installation.id, updates);
    toast.success("Installation updated successfully");
    onClose();
  };

  if (!installation) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Installation</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <InstallationForm installation={installation} onSubmit={handleSubmit} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Cuts</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCuts([...cuts, {} as Cut])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Cut
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {cuts.map((cut, index) => (
                  <CutForm
                    key={cut.id || index}
                    cut={cut}
                    onChange={(updates) => {
                      const newCuts = [...cuts];
                      newCuts[index] = { ...cut, ...updates };
                      setCuts(newCuts);
                    }}
                    onRemove={() => {
                      const newCuts = cuts.filter((_, i) => i !== index);
                      setCuts(newCuts);
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Update Installation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}