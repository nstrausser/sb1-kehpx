import { create } from 'zustand';
import type { Installation, Installer, PPFRoll, Appointment } from '@/types';

type ModalType = 
  | 'new-installation'
  | 'edit-installation'
  | 'new-appointment'
  | 'edit-appointment'
  | 'new-inventory'
  | 'edit-inventory'
  | 'new-installer'
  | 'edit-installer';

interface ModalData {
  installation?: Installation;
  installer?: Installer;
  inventory?: PPFRoll;
  appointment?: Appointment;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));