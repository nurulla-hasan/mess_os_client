import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";
import { getCurrentUserRole, getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessDetails } from "@/services/mess.service";

type UserRole = "member" | "manager" | "admin";

function mapRole(role: string | null): UserRole {
  if (role === "manager") return "manager";
  if (role === "admin" || role === "super_admin") return "admin";
  return "member";
}

export default async function NotificationsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [role, activeMessId] = await Promise.all([
    getCurrentUserRole(),
    getActiveMessIdFromCookies(),
  ]);

  let messName = "";

  if (activeMessId) {
    const messRes = await getMessDetails(activeMessId).catch(() => null);
    if (messRes?.success) {
      messName = messRes.data.name;
    }
  }

  return (
    <MainLayout userRole={mapRole(role)} messName={messName}>
      {children}
    </MainLayout>
  );
}
