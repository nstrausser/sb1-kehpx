"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InstallerCard from "./InstallerCard";
import { useModal } from "@/lib/store/modal-store";
import { useInstallerStore } from "@/lib/store/installer-store";
import type { Installer } from "@/types";

export default function InstallersContent() {
  const { installers } = useInstallerStore();
  const { onOpen } = useModal();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredInstallers = installers.filter(
    (installer) =>
      (filterRole === "all" || installer.role === filterRole) &&
      installer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installers</h1>
          <p className="text-muted-foreground">
            Track and manage installer performance.
          </p>
        </div>
        <Button onClick={() => onOpen("addInstaller")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Installer
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Installer">Installer</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredInstallers.map((installer) => (
          <div
            key={installer.id}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => onOpen("editInstaller", { installer })}
          >
            <InstallerCard installer={installer} />
          </div>
        ))}
      </div>
    </div>
  );
}