import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "PPF Inventory Manager",
  description: "Track and manage paint protection film inventory and installations",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <Providers>
          <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            {children}
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}