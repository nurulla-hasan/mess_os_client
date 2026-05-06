
import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout userRole="manager">
      {children}
    </MainLayout>
  );
}
