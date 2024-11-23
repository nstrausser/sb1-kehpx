"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AnalyticsContent() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance metrics and business insights.
          </p>
        </div>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Revenue</h3>
          {/* Add revenue chart here */}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Film Usage</h3>
          {/* Add film usage chart here */}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Installations</h3>
          {/* Add installations chart here */}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Efficiency</h3>
          {/* Add efficiency chart here */}
        </Card>
      </div>
    </div>
  );
}