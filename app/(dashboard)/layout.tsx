import { DashboardNav } from "@/components/dashboard/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto pl-[72px]">
          <div className="p-8">{children}</div>
        </main>
        <ThemeToggle />
        <Toaster />
      </div>
    </div>
  );
}