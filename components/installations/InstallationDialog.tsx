"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Scan, Plus, Trash2 } from "lucide-react";
import type { Installation, Cut } from "@/types";

type InstallationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installation?: Installation | null;
  onSave: (installation: Installation) => void;
};

export default function InstallationDialog({
  open,
  onOpenChange,
  installation,
  onSave,
}: InstallationDialogProps) {
  const [formData, setFormData] = useState({
    customerName: installation?.customerName || "",
    vehicleInfo: installation?.vehicleInfo || "",
    date: installation?.date || new Date().toISOString().split("T")[0],
    installer: installation?.installer || { id: "", name: "" },
    cuts: installation?.cuts || [],
    notes: installation?.notes || "",
  });

  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockRollId = `R${Math.random().toString().slice(2, 8)}`;
      const newCut: Cut = {
        id: Math.random().toString(36).substr(2, 9),
        installationId: installation?.id || "",
        panelName: "Hood",
        squareFeet: 15.5,
        rollId: mockRollId,
        filmType: "XPEL Ultimate Plus",
        status: "completed",
        createdAt: new Date().toISOString(),
      };
      setFormData((prev) => ({
        ...prev,
        cuts: [...prev.cuts, newCut],
      }));
      setScanning(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalArea = formData.cuts.reduce((sum, cut) => sum + cut.squareFeet, 0);

    onSave({
      id: installation?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      status: installation?.status || "in-progress",
      totalArea,
      createdAt: installation?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {installation ? "Edit Installation" : "New Installation"}
          </DialogTitle>
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
                value={formData.installer.id}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    installer: {
                      id: value,
                      name: value === "1" ? "Matt Anderson" : "Sarah Johnson",
                    },
                  })
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
              <Button
                type="button"
                variant="outline"
                onClick={simulateScan}
                disabled={scanning}
              >
                <Scan className="mr-2 h-4 w-4" />
                {scanning ? "Scanning..." : "Scan Roll"}
              </Button>
            </div>

            <div className="space-y-2">
              {formData.cuts.map((cut, index) => (
                <div
                  key={cut.id}
                  className="flex items-center space-x-2 p-2 border rounded-md"
                >
                  <div className="flex-1">
                    <div className="font-medium">{cut.panelName}</div>
                    <div className="text-sm text-muted-foreground">
                      {cut.rollId} - {cut.filmType}
                    </div>
                  </div>
                  <div>
                    <Badge variant="secondary">
                      {cut.squareFeet.toFixed(1)} ft²
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        cuts: prev.cuts.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
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
            <Button type="submit">
              {installation ? "Update" : "Create"} Installation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}