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
import { Scan } from "lucide-react";
import { toast } from "sonner";
import { useModal } from "@/lib/hooks/use-modal-store";

export const AddInventoryModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [formData, setFormData] = useState({
    sku: "",
    rollId: "",
    name: "",
    lengthFeet: "",
    widthInches: "",
    price: "",
    category: "",
    manufacturer: "",
  });

  const [scanning, setScanning] = useState(false);

  const isModalOpen = isOpen && type === "addInventory";

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockSku = `XPL-CL-${Math.random().toString().slice(2, 4)}`;
      const mockRollId = `R${Math.random().toString().slice(2, 8)}`;
      setFormData({
        ...formData,
        sku: mockSku,
        rollId: mockRollId,
        name: "XPEL Ultimate Plus",
        lengthFeet: "100",
        widthInches: "60",
        price: "899.99",
        manufacturer: "XPEL",
      });
      setScanning(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add your submission logic here
      toast.success("Inventory item added successfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Roll</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sku">SKU</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={simulateScan}
                disabled={scanning}
              >
                <Scan className="mr-2 h-4 w-4" />
                {scanning ? "Scanning..." : "Scan"}
              </Button>
            </div>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollId">Roll ID</Label>
            <Input
              id="rollId"
              value={formData.rollId}
              onChange={(e) => setFormData({ ...formData, rollId: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lengthFeet">Length (feet)</Label>
              <Input
                id="lengthFeet"
                type="number"
                min="0"
                value={formData.lengthFeet}
                onChange={(e) => setFormData({ ...formData, lengthFeet: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="widthInches">Width (inches)</Label>
              <Input
                id="widthInches"
                type="number"
                min="0"
                value={formData.widthInches}
                onChange={(e) => setFormData({ ...formData, widthInches: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Select
              value={formData.manufacturer}
              onValueChange={(value) => setFormData({ ...formData, manufacturer: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XPEL">XPEL</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="SunTek">SunTek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Clear Protection Film">Clear Protection Film</SelectItem>
                <SelectItem value="Matte Protection Film">Matte Protection Film</SelectItem>
                <SelectItem value="Colored Protection Film">Colored Protection Film</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add Roll</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};