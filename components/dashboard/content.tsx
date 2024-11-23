"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal";

export function DashboardContent() {
  const { onOpen } = useModal();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your PPF inventory.
          </p>
        </div>
        <Button onClick={() => onOpen("new-installation")}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {/* Add stat cards here */}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Installations</h2>
        {/* Add recent installations table here */}
      </Card>
    </div>
  );
}