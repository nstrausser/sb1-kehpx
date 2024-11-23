import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInstallerStore } from "@/lib/store/installer-store";
import type { Installation } from "@/types";

const installationSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  vehicleInfo: z.string().min(1, "Vehicle information is required"),
  date: z.string(),
  installerId: z.string().min(1, "Installer is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof installationSchema>;

interface InstallationFormProps {
  installation?: Installation;
  onSubmit: (data: FormData) => void;
}

export function InstallationForm({ installation, onSubmit }: InstallationFormProps) {
  const installers = useInstallerStore((state) => state.installers);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(installationSchema),
    defaultValues: {
      customerName: "",
      vehicleInfo: "",
      date: new Date().toISOString().split("T")[0],
      installerId: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (installation) {
      reset({
        customerName: installation.customerName,
        vehicleInfo: installation.vehicleInfo,
        date: installation.date,
        installerId: installation.installer.id,
        notes: installation.notes,
      });
    }
  }, [installation, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            {...register("customerName")}
            error={errors.customerName?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleInfo">Vehicle Information</Label>
          <Input
            id="vehicleInfo"
            {...register("vehicleInfo")}
            error={errors.vehicleInfo?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Installation Date</Label>
          <Input
            id="date"
            type="date"
            {...register("date")}
            error={errors.date?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="installer">Installer</Label>
          <Select
            value={installation?.installer.id}
            onValueChange={(value) => register("installerId").onChange({ target: { value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select installer" />
            </SelectTrigger>
            <SelectContent>
              {installers.map((installer) => (
                <SelectItem key={installer.id} value={installer.id}>
                  {installer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.installerId && (
            <p className="text-sm text-destructive">{errors.installerId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder="Additional notes about the installation..."
        />
      </div>
    </form>
  );
}