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
import type { PPFRoll } from "@/types";

const inventorySchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  rollId: z.string().min(1, "Roll ID is required"),
  name: z.string().min(1, "Name is required"),
  lengthFeet: z.number().min(0, "Length must be positive"),
  widthInches: z.number().min(0, "Width must be positive"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
});

type FormData = z.infer<typeof inventorySchema>;

interface InventoryFormProps {
  inventory?: PPFRoll;
  onSubmit: (data: FormData) => void;
}

export function InventoryForm({ inventory, onSubmit }: InventoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      sku: "",
      rollId: "",
      name: "",
      lengthFeet: 0,
      widthInches: 0,
      price: 0,
      category: "",
      manufacturer: "",
    },
  });

  useEffect(() => {
    if (inventory) {
      reset(inventory);
    }
  }, [inventory, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            {...register("sku")}
            error={errors.sku?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rollId">Roll ID</Label>
          <Input
            id="rollId"
            {...register("rollId")}
            error={errors.rollId?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lengthFeet">Length (feet)</Label>
          <Input
            id="lengthFeet"
            type="number"
            min="0"
            step="0.1"
            {...register("lengthFeet", { valueAsNumber: true })}
            error={errors.lengthFeet?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="widthInches">Width (inches)</Label>
          <Input
            id="widthInches"
            type="number"
            min="0"
            step="0.1"
            {...register("widthInches", { valueAsNumber: true })}
            error={errors.widthInches?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Select
            onValueChange={(value) => register("manufacturer").onChange({ target: { value } })}
            defaultValue={inventory?.manufacturer}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XPEL">XPEL</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
              <SelectItem value="SunTek">SunTek</SelectItem>
            </SelectContent>
          </Select>
          {errors.manufacturer && (
            <p className="text-sm text-destructive">{errors.manufacturer.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => register("category").onChange({ target: { value } })}
            defaultValue={inventory?.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Clear Protection Film">Clear Protection Film</SelectItem>
              <SelectItem value="Matte Protection Film">Matte Protection Film</SelectItem>
              <SelectItem value="Colored Protection Film">Colored Protection Film</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
      </div>
    </form>
  );
}