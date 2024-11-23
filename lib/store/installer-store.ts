import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Installer } from '@/types';

interface InstallerState {
  installers: Installer[];
  addInstaller: (installer: Installer) => void;
  updateInstaller: (id: string, updates: Partial<Installer>) => void;
  deleteInstaller: (id: string) => void;
}

export const useInstallerStore = create<InstallerState>()(
  persist(
    (set) => ({
      installers: [],
      addInstaller: (installer) =>
        set((state) => ({
          installers: [installer, ...state.installers],
        })),
      updateInstaller: (id, updates) =>
        set((state) => ({
          installers: state.installers.map((inst) =>
            inst.id === id ? { ...inst, ...updates } : inst
          ),
        })),
      deleteInstaller: (id) =>
        set((state) => ({
          installers: state.installers.filter((inst) => inst.id !== id),
        })),
    }),
    {
      name: 'installer-store',
    }
  )
);