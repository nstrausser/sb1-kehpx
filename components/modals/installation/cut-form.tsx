import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Cut } from "@/types";

interface CutFormProps {
  cut: Partial<Cut>;
  onChange: (updates: Partial<Cut>) => void;
  onRemove?: () => void;
  showScanButton?: boolean;
}

export function CutForm({ cut, onChange, onRemove, showScanButton = true }: CutFormProps) {
  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      onChange({
        rollId: `R${Math.random().toString().slice(2, 8)}`,
      });
      setScanning(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Panel Name</Label>
          <Input
            value={cut.panelName || ""}
            onChange={(e) => onChange({ panelName: e.target.value })}
            placeholder="e.g., Hood, Front Bumper"
          />
        </div>
        <div className="space-y-2">
          <Label>Area (sq ft)</Label>
          <Input
            type="number"
            min="0"
            step="0.1"
            value={cut.squareFeet || ""}
            onChange={(e) => onChange({ squareFeet: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Roll ID</Label>
          <div className="flex space-x-2">
            <Input
              value={cut.rollId || ""}
              onChange={(e) => onChange({ rollId: e.target.value })}
              placeholder="Roll ID"
            />
            {showScanButton && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={simulateScan}
                disabled={scanning}
              >
                <Scan className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={cut.status || "completed"}
            onValueChange={(value: Cut["status"]) => onChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="recut">Needs Recut</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(cut.status === "recut" || cut.status === "failed") && (
        <div className="space-y-2">
          <Label>Reason</Label>
          <Input
            value={cut.recutReason || ""}
            onChange={(e) => onChange({ recutReason: e.target.value })}
            placeholder="Reason for recut/failure"
          />
        </div>
      )}

      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={onRemove}
        >
          Remove Cut
        </Button>
      )}
    </div>
  );
}