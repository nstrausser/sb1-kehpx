"use client";

import { ThemeProvider } from "next-themes";
import { ModalProvider } from "./modal-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ModalProvider />
    </ThemeProvider>
  );
}