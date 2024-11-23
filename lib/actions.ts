import { db } from "@/lib/db";
import { toCamelCase, toSnakeCase } from "@/lib/utils";
import type { Installation, Installer, PPFRoll, Appointment } from "@/types";

// Installer actions
export async function getInstallers() {
  const res = await fetch("/api/installers");
  if (!res.ok) throw new Error("Failed to fetch installers");
  return res.json();
}

export async function createInstaller(data: Omit<Installer, "id">) {
  const res = await fetch("/api/installers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSnakeCase(data)),
  });
  if (!res.ok) throw new Error("Failed to create installer");
  return res.json();
}

// Installation actions
export async function getInstallations() {
  const res = await fetch("/api/installations");
  if (!res.ok) throw new Error("Failed to fetch installations");
  return res.json();
}

export async function createInstallation(data: Omit<Installation, "id">) {
  const res = await fetch("/api/installations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSnakeCase(data)),
  });
  if (!res.ok) throw new Error("Failed to create installation");
  return res.json();
}

// Inventory actions
export async function getInventory() {
  const res = await fetch("/api/inventory");
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export async function createInventoryItem(data: Omit<PPFRoll, "id">) {
  const res = await fetch("/api/inventory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSnakeCase(data)),
  });
  if (!res.ok) throw new Error("Failed to create inventory item");
  return res.json();
}