import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Installer } from "@/types";

const installerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Lead", "Installer", "Training"]),
});

type FormData = z.infer<typeof installerSchema>;

interface InstallerFormProps {
  installer?: Installer;
  onSubmit: (data: FormData) => void;
}

export function InstallerForm({ installer, onSubmit }: InstallerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(installerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "Installer",
    },
  });

  useEffect(() => {
    if (installer) {
      const [firstName, lastName] = installer.name.split(" ");
      reset({
        firstName,
        lastName,
        email: installer.email,
        role: installer.role,
      });
    }
  }, [installer, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          onValueChange={(value) => register("role").onChange({ target: { value } })}
          defaultValue={installer?.role}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Installer">Installer</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>
    </form>
  );
}