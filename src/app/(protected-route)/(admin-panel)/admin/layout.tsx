
import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";

import { SubscriptionProvider } from "@/providers/subscription-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SubscriptionProvider subscription={null}>
      <MainLayout userRole="admin">
        {children}
      </MainLayout>
    </SubscriptionProvider>
  );
}
