import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PPFRoll } from '@/types';

interface InventoryState {
  inventory: PPFRoll[];
  addRoll: (roll: PPFRoll) => void;
  updateRoll: (id: string, updates: Partial<PPFRoll>) => void;
  deleteRoll: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      inventory: [],
      addRoll: (roll) =>
        set((state) => ({
          inventory: [roll, ...state.inventory],
        })),
      updateRoll: (id, updates) =>
        set((state) => ({
          inventory: state.inventory.map((roll) =>
            roll.id === id ? { ...roll, ...updates } : roll
          ),
        })),
      deleteRoll: (id) =>
        set((state) => ({
          inventory: state.inventory.filter((roll) => roll.id !== id),
        })),
    }),
    {
      name: 'inventory-store',
    }
  )
);