"use client";

import { useEffect, useState } from "react";
import { NewInstallationModal } from "@/components/modals/installation/new-installation-modal";
import { EditInstallationModal } from "@/components/modals/installation/edit-installation-modal";
import { NewInventoryModal } from "@/components/modals/inventory/new-inventory-modal";
import { EditInventoryModal } from "@/components/modals/inventory/edit-inventory-modal";
import { NewInstallerModal } from "@/components/modals/installer/new-installer-modal";
import { EditInstallerModal } from "@/components/modals/installer/edit-installer-modal";

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
    </>
  );
}