import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessDetails } from "@/services/mess.service";

export default async function ManagerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const activeMessId = await getActiveMessIdFromCookies();
  let messName = "";

  if (activeMessId) {
    const messRes = await getMessDetails(activeMessId);
    if (messRes.success) {
      messName = messRes.data.name;
    }
  }

  return (
    <MainLayout userRole="manager" messName={messName}>
      {children}
    </MainLayout>
  );
}
