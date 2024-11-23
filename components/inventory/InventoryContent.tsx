"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BrandLogos } from "./BrandLogos";
import { useModal } from "@/lib/store/modal-store";
import { useInventoryStore } from "@/lib/store/inventory-store";
import type { PPFRoll } from "@/types";

export default function InventoryContent() {
  const { inventory } = useInventoryStore();
  const { onOpen } = useModal();
  const [search, setSearch] = useState("");

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.rollId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PPF Inventory</h1>
          <p className="text-muted-foreground">
            Manage your paint protection film inventory.
          </p>
        </div>
        <Button onClick={() => onOpen("addInventory")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Roll
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Manufacturer</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Roll ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-36">
                    {BrandLogos[item.manufacturer as keyof typeof BrandLogos] ? (
                      BrandLogos[item.manufacturer as keyof typeof BrandLogos]()
                    ) : (
                      <span>{item.manufacturer}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono">{item.sku}</TableCell>
                <TableCell className="font-mono">{item.rollId}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  {item.widthInches}"×{item.lengthFeet}'
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${item.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpen("editInventory", { inventory: item })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}