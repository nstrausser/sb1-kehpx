"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download, Upload, Pencil } from "lucide-react";
import { toast } from "sonner";

const presetColors = [
  { name: "Blue", value: "212 100% 40%" },
  { name: "Purple", value: "270 80% 45%" },
  { name: "Violet", value: "290 85% 45%" },
  { name: "Pink", value: "322 80% 45%" },
  { name: "Cyan", value: "192 85% 40%" },
  { name: "Green", value: "142 70% 40%" },
  { name: "Yellow", value: "48 95% 45%" },
  { name: "Orange", value: "24 85% 45%" },
  { name: "Red", value: "0 85% 45%" },
];

export default function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState("212 100% 40%");

  const handleColorChange = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty("--primary", color);
    document.documentElement.style.setProperty(
      "--primary-foreground",
      theme === "dark" ? "0 0% 98%" : "0 0% 98%"
    );
    document.documentElement.style.setProperty("--ring", color);
    toast.success("Theme color updated");
  };

  const handleExportData = () => {
    toast.success("Data exported successfully");
  };

  const handleImportData = () => {
    toast.success("Data imported successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and data.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    className="w-8 h-8 rounded-md p-0 overflow-hidden relative"
                    style={{
                      backgroundColor: `hsl(${color.value})`,
                    }}
                    onClick={() => handleColorChange(color.value)}
                  >
                    <span className="sr-only">{color.name}</span>
                    {accentColor === color.value && (
                      <span className="absolute inset-0 bg-white/20" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export and import application data.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}