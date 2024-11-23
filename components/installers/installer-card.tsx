"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Ruler, DollarSign } from "lucide-react";
import type { Installer } from "@/types";

interface InstallerCardProps {
  installer: Installer;
}

export function InstallerCard({ installer }: InstallerCardProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const getRoleBadgeVariant = (role: Installer["role"]) => {
    switch (role) {
      case "Lead":
        return "default";
      case "Installer":
        return "secondary";
      case "Training":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {getInitials(installer.name)}
          </div>
          <div>
            <h3 className="font-semibold">{installer.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant={getRoleBadgeVariant(installer.role)}>
                {installer.role}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Since {new Date(installer.joinedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-2 h-4 w-4" />
            Efficiency Rating
          </div>
          <Progress value={85} className="h-2" />
          <span className="text-sm font-medium">85%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Avg. Install Time
          </div>
          <span className="text-sm font-medium">7h 30m</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Ruler className="mr-2 h-4 w-4" />
            Film Usage
          </div>
          <span className="text-sm font-medium">1,250 ft²</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="mr-2 h-4 w-4" />
            Revenue Generated
          </div>
          <span className="text-sm font-medium">$45,600</span>
        </div>
      </div>
    </Card>
  );
}