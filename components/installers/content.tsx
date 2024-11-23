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
import { InstallerCard } from "./installer-card";
import { useModal } from "@/hooks/use-modal";
import { useInstallers } from "@/lib/store/selectors";

export function InstallersContent() {
  const installers = useInstallers();
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
        <Button onClick={() => onOpen("new-installer")}>
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
            onClick={() => onOpen("edit-installer", { installer })}
          >
            <InstallerCard installer={installer} />
          </div>
        ))}
      </div>
    </div>
  );
}