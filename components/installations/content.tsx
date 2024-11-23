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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useInstallations } from "@/lib/store/selectors";

export function InstallationsContent() {
  const installations = useInstallations();
  const { onOpen } = useModal();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredInstallations = installations.filter(
    (installation) =>
      (filterStatus === "all" || installation.status === filterStatus) &&
      (installation.customerName.toLowerCase().includes(search.toLowerCase()) ||
        installation.vehicleInfo.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "secondary";
      case "needs-recut":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installations</h1>
          <p className="text-muted-foreground">
            Track and manage PPF installations
          </p>
        </div>
        <Button onClick={() => onOpen("new-installation")}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="needs-recut">Needs Recut</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Installer</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cuts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstallations.map((installation) => (
              <TableRow
                key={installation.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onOpen("edit-installation", { installation })}
              >
                <TableCell>
                  {new Date(installation.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{installation.customerName}</TableCell>
                <TableCell>{installation.vehicleInfo}</TableCell>
                <TableCell>{installation.installer.name}</TableCell>
                <TableCell>{installation.totalArea.toFixed(1)} ft²</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(installation.status)}>
                    {installation.status === "needs-recut"
                      ? "Needs Recut"
                      : installation.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {installation.cuts.length} cut
                    {installation.cuts.length !== 1 ? "s" : ""}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}