"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { useModal } from "@/lib/hooks/use-modal-store";
import type { Appointment } from "@/types";

export const EditAppointmentModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const appointment = data.appointment as Appointment;

  const [formData, setFormData] = useState({
    customerName: appointment?.customerName || "",
    customerPhone: appointment?.customerPhone || "",
    customerEmail: appointment?.customerEmail || "",
    vehicleInfo: appointment?.vehicleInfo || "",
    date: appointment?.date || new Date().toISOString().split("T")[0],
    time: appointment?.time || "09:00",
    estimatedDuration: appointment?.estimatedDuration.toString() || "480",
    installerId: appointment?.installerId || "",
    serviceType: appointment?.serviceType || "",
    estimatedSquareFeet: appointment?.estimatedSquareFeet.toString() || "",
    quotedPrice: appointment?.quotedPrice.toString() || "",
    deposit: appointment?.deposit?.toString() || "",
    notes: appointment?.notes || "",
    status: appointment?.status || "scheduled",
  });

  const isModalOpen = isOpen && type === "editAppointment";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add your submission logic here
      toast.success("Appointment updated successfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (!appointment) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleInfo">Vehicle Information</Label>
              <Input
                id="vehicleInfo"
                placeholder="Year Make Model"
                value={formData.vehicleInfo}
                onChange={(e) => setFormData({ ...formData, vehicleInfo: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Duration (minutes)</Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="0"
                step="30"
                value={formData.estimatedDuration}
                onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="installer">Installer</Label>
              <Select
                value={formData.installerId}
                onValueChange={(value) => setFormData({ ...formData, installerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select installer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Matt Anderson</SelectItem>
                  <SelectItem value="2">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedSquareFeet">Estimated Sq. Ft.</Label>
              <Input
                id="estimatedSquareFeet"
                type="number"
                min="0"
                step="0.1"
                value={formData.estimatedSquareFeet}
                onChange={(e) => setFormData({ ...formData, estimatedSquareFeet: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quotedPrice">Quoted Price</Label>
              <Input
                id="quotedPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.quotedPrice}
                onChange={(e) => setFormData({ ...formData, quotedPrice: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit Amount</Label>
              <Input
                id="deposit"
                type="number"
                min="0"
                step="0.01"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about the appointment..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">Update Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};