"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scan, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useModal } from "@/lib/hooks/use-modal-store";
import type { Installation } from "@/types";

export const EditInstallationModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const installation = data.installation as Installation;

  const [formData, setFormData] = useState({
    customerName: installation?.customerName || "",
    vehicleInfo: installation?.vehicleInfo || "",
    date: installation?.date || new Date().toISOString().split("T")[0],
    installer: installation?.installer.id || "",
    notes: installation?.notes || "",
  });

  const [scannedRolls, setScannedRolls] = useState<{ id: string; sqft: number }[]>(
    installation?.cuts.map(cut => ({ id: cut.rollId, sqft: cut.squareFeet })) || []
  );
  const [scanning, setScanning] = useState(false);

  const isModalOpen = isOpen && type === "editInstallation";

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockRollId = `R${Math.random().toString().slice(2, 8)}`;
      setScannedRolls([...scannedRolls, { id: mockRollId, sqft: 0 }]);
      setScanning(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add your submission logic here
      toast.success("Installation updated successfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (!installation) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Installation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleInfo">Vehicle Information</Label>
              <Input
                id="vehicleInfo"
                placeholder="Year Make Model"
                value={formData.vehicleInfo}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleInfo: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Installation Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installer">Installer</Label>
              <Select
                value={formData.installer}
                onValueChange={(value) =>
                  setFormData({ ...formData, installer: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select installer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Matt Anderson</SelectItem>
                  <SelectItem value="2">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>PPF Rolls Used</Label>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={simulateScan}
                  disabled={scanning}
                >
                  <Scan className="mr-2 h-4 w-4" />
                  {scanning ? "Scanning..." : "Scan Roll"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setScannedRolls([...scannedRolls, { id: "", sqft: 0 }])
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Manually
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[200px] w-full rounded-md border">
              <div className="p-4 space-y-4">
                {scannedRolls.map((roll, index) => (
                  <div key={roll.id || index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Roll ID"
                      value={roll.id}
                      onChange={(e) => {
                        const newRolls = [...scannedRolls];
                        newRolls[index].id = e.target.value;
                        setScannedRolls(newRolls);
                      }}
                    />
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Sq. Ft."
                      value={roll.sqft || ""}
                      onChange={(e) => {
                        const newRolls = [...scannedRolls];
                        newRolls[index].sqft = Number(e.target.value);
                        setScannedRolls(newRolls);
                      }}
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newRolls = scannedRolls.filter((_, i) => i !== index);
                        setScannedRolls(newRolls);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {scannedRolls.length > 0 && (
              <div className="flex justify-end">
                <Badge variant="secondary">
                  Total Area:{" "}
                  {scannedRolls
                    .reduce((acc, roll) => acc + (roll.sqft || 0), 0)
                    .toFixed(1)}{" "}
                  sq ft
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes about the installation..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">Update Installation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};