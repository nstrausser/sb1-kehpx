"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Package,
  BarChart3,
  Settings,
  Users,
  Scissors,
  Scroll,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Inventory", icon: Package, href: "/inventory" },
  { name: "Installers", icon: Users, href: "/installers" },
  { name: "Installations", icon: Scissors, href: "/installations" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
] as const;

const NavButton = memo(function NavButton({ 
  item, 
  isActive 
}: { 
  item: typeof navigation[number];
  isActive: boolean;
}) {
  return (
    <Link href={item.href} prefetch={false}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="icon"
        className={cn(
          "h-12 w-12 relative group hover:bg-primary/10",
          isActive && "bg-secondary hover:bg-secondary/80"
        )}
      >
        <item.icon className="h-6 w-6" />
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          {item.name}
        </div>
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full" />
        )}
      </Button>
    </Link>
  );
});

function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[72px] flex flex-col bg-background border-r">
      <div className="flex items-center justify-center h-[72px] border-b">
        <Link href="/dashboard" prefetch={false}>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-primary/10"
          >
            <Scroll className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center py-6 space-y-4">
        {navigation.map((item) => (
          <NavButton 
            key={item.href} 
            item={item} 
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(DashboardNav);