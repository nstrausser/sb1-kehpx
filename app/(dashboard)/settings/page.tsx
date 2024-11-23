import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const SettingsContent = dynamic(
  () => import("@/components/settings/SettingsContent"),
  {
    loading: () => (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
      </div>
    ),
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Settings - PPF Inventory Manager",
  description: "Configure your PPF Inventory Manager settings",
};

export default function SettingsPage() {
  return <SettingsContent />;
}