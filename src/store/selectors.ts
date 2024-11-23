import { useStore } from './index';

// Inventory Selectors
export const useInventory = () => useStore((state) => state.inventory);
export const useInventoryActions = () => useStore((state) => ({
  addInventoryItem: state.addInventoryItem,
  updateInventoryItem: state.updateInventoryItem,
  removeInventoryItem: state.removeInventoryItem,
}));

// Installer Selectors
export const useInstallers = () => useStore((state) => state.installers);
export const useInstallerActions = () => useStore((state) => ({
  addInstaller: state.addInstaller,
  updateInstaller: state.updateInstaller,
  removeInstaller: state.removeInstaller,
}));

// Installation Selectors
export const useInstallations = () => useStore((state) => state.installations);
export const useInstallationActions = () => useStore((state) => ({
  addInstallation: state.addInstallation,
  updateInstallation: state.updateInstallation,
  removeInstallation: state.removeInstallation,
}));

// Appointment Selectors
export const useAppointments = () => useStore((state) => state.appointments);
export const useAppointmentActions = () => useStore((state) => ({
  addAppointment: state.addAppointment,
  updateAppointment: state.updateAppointment,
  removeAppointment: state.removeAppointment,
}));