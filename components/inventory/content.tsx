"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modal";
import { useInventory } from "@/lib/store/selectors";

export function InventoryContent() {
  const inventory = useInventory();
  const { onOpen } = useModal();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredInventory = inventory.filter(
    (item) =>
      (filterCategory === "all" || item.category === filterCategory) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.rollId.toLowerCase().includes(search.toLowerCase()))
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
        <Button onClick={() => onOpen("new-inventory")}>
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
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Clear Protection Film">Clear Protection Film</SelectItem>
            <SelectItem value="Matte Protection Film">Matte Protection Film</SelectItem>
            <SelectItem value="Colored Protection Film">Colored Protection Film</SelectItem>
          </SelectContent>
        </Select>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onOpen("edit-inventory", { inventory: item })}
              >
                <TableCell>{item.manufacturer}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}