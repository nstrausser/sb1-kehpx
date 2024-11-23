import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Installation, Cut } from '@/types';

interface InstallationState {
  installations: Installation[];
  addInstallation: (installation: Installation) => void;
  updateInstallation: (id: string, updates: Partial<Installation>) => void;
  deleteInstallation: (id: string) => void;
  addCut: (installationId: string, cut: Cut) => void;
  updateCut: (installationId: string, cutId: string, updates: Partial<Cut>) => void;
  deleteCut: (installationId: string, cutId: string) => void;
}

export const useInstallationStore = create<InstallationState>()(
  persist(
    (set) => ({
      installations: [],
      addInstallation: (installation) =>
        set((state) => ({
          installations: [installation, ...state.installations],
        })),
      updateInstallation: (id, updates) =>
        set((state) => ({
          installations: state.installations.map((inst) =>
            inst.id === id ? { ...inst, ...updates } : inst
          ),
        })),
      deleteInstallation: (id) =>
        set((state) => ({
          installations: state.installations.filter((inst) => inst.id !== id),
        })),
      addCut: (installationId, cut) =>
        set((state) => ({
          installations: state.installations.map((inst) =>
            inst.id === installationId
              ? { ...inst, cuts: [...inst.cuts, cut] }
              : inst
          ),
        })),
      updateCut: (installationId, cutId, updates) =>
        set((state) => ({
          installations: state.installations.map((inst) =>
            inst.id === installationId
              ? {
                  ...inst,
                  cuts: inst.cuts.map((cut) =>
                    cut.id === cutId ? { ...cut, ...updates } : cut
                  ),
                }
              : inst
          ),
        })),
      deleteCut: (installationId, cutId) =>
        set((state) => ({
          installations: state.installations.map((inst) =>
            inst.id === installationId
              ? {
                  ...inst,
                  cuts: inst.cuts.filter((cut) => cut.id !== cutId),
                }
              : inst
          ),
        })),
    }),
    {
      name: 'installation-store',
    }
  )
);