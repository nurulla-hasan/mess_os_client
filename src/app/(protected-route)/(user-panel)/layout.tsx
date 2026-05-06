
import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
