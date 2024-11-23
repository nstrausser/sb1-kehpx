"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { useInstallers } from "@/lib/store/selectors";
import { toast } from "sonner";

const installationSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  vehicleInfo: z.string().min(1, "Vehicle information is required"),
  date: z.string(),
  installerId: z.string().min(1, "Installer is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof installationSchema>;

export function NewInstallationModal() {
  const { isOpen, type, onClose } = useModal();
  const installers = useInstallers();
  const [isLoading, setIsLoading] = useState(false);

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

  const isModalOpen = isOpen && type === "new-installation";

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // Add your submission logic here
      toast.success("Installation created successfully");
      onClose();
      reset();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Installation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                onValueChange={(value) =>
                  register("installerId").onChange({ target: { value } })
                }
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
                <p className="text-sm text-destructive">
                  {errors.installerId.message}
                </p>
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

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Installation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}