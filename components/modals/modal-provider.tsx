"use client";

import { useEffect, useState } from "react";
import { NewInstallationModal } from "./installation/new-installation-modal";
import { EditInstallationModal } from "./installation/edit-installation-modal";
import { NewInventoryModal } from "./inventory/new-inventory-modal";
import { EditInventoryModal } from "./inventory/edit-inventory-modal";
import { NewInstallerModal } from "./installer/new-installer-modal";
import { EditInstallerModal } from "./installer/edit-installer-modal";
import { NewAppointmentModal } from "./appointment/new-appointment-modal";
import { EditAppointmentModal } from "./appointment/edit-appointment-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewInstallationModal />
      <EditInstallationModal />
      <NewInventoryModal />
      <EditInventoryModal />
      <NewInstallerModal />
      <EditInstallerModal />
      <NewAppointmentModal />
      <EditAppointmentModal />
    </>
  );
}