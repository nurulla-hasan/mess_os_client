import type { ReactNode } from "react";
import MainLayout from "@/layout/main-layout";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessDetails } from "@/services/mess.service";

import { getCurrentSubscription } from "@/services/subscription.service";
import { SubscriptionProvider } from "@/providers/subscription-provider";

export default async function ManagerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const activeMessId = await getActiveMessIdFromCookies();
  let messName = "";
  let currentSubscription = null;

  if (activeMessId) {
    const [messRes, subRes] = await Promise.all([
      getMessDetails(activeMessId),
      getCurrentSubscription(activeMessId),
    ]);

    if (messRes.success) {
      messName = messRes.data.name;
    }
    if (subRes.success) {
      currentSubscription = subRes.data;
    }
  }

  return (
    <SubscriptionProvider subscription={currentSubscription}>
      <MainLayout userRole="manager" messName={messName}>
        {children}
      </MainLayout>
    </SubscriptionProvider>
  );
}
