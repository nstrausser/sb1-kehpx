"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Installation, Installer, PPFRoll, Appointment } from '@/types';

interface StoreState {
  // Inventory State
  inventory: PPFRoll[];
  addInventoryItem: (item: PPFRoll) => void;
  updateInventoryItem: (id: string, updates: Partial<PPFRoll>) => void;
  removeInventoryItem: (id: string) => void;

  // Installer State
  installers: Installer[];
  addInstaller: (installer: Installer) => void;
  updateInstaller: (id: string, updates: Partial<Installer>) => void;
  removeInstaller: (id: string) => void;

  // Installation State
  installations: Installation[];
  addInstallation: (installation: Installation) => void;
  updateInstallation: (id: string, updates: Partial<Installation>) => void;
  removeInstallation: (id: string) => void;

  // Appointment State
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Inventory
      inventory: [],
      addInventoryItem: (item) =>
        set((state) => ({ inventory: [...state.inventory, item] })),
      updateInventoryItem: (id, updates) =>
        set((state) => ({
          inventory: state.inventory.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      removeInventoryItem: (id) =>
        set((state) => ({
          inventory: state.inventory.filter((item) => item.id !== id),
        })),

      // Installers
      installers: [],
      addInstaller: (installer) =>
        set((state) => ({ installers: [...state.installers, installer] })),
      updateInstaller: (id, updates) =>
        set((state) => ({
          installers: state.installers.map((installer) =>
            installer.id === id ? { ...installer, ...updates } : installer
          ),
        })),
      removeInstaller: (id) =>
        set((state) => ({
          installers: state.installers.filter((installer) => installer.id !== id),
        })),

      // Installations
      installations: [],
      addInstallation: (installation) =>
        set((state) => ({
          installations: [...state.installations, installation],
        })),
      updateInstallation: (id, updates) =>
        set((state) => ({
          installations: state.installations.map((installation) =>
            installation.id === id
              ? { ...installation, ...updates }
              : installation
          ),
        })),
      removeInstallation: (id) =>
        set((state) => ({
          installations: state.installations.filter(
            (installation) => installation.id !== id
          ),
        })),

      // Appointments
      appointments: [],
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),
      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment
          ),
        })),
      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== id
          ),
        })),
    }),
    {
      name: 'ppf-inventory-store',
    }
  )
);