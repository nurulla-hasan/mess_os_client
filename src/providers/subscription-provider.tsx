"use client";

import { createContext, useContext, ReactNode } from "react";
import { IMessSubscription, ISubscriptionFeatures } from "@/types/subscription.type";

interface SubscriptionContextType {
  subscription: IMessSubscription | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ 
  children, 
  subscription 
}: { 
  children: ReactNode; 
  subscription: IMessSubscription | null;
}) {
  return (
    <SubscriptionContext.Provider value={{ subscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return { subscription: null, isAllowed: (_featureKey?: string, _role?: string) => true };
  }

  const isAllowed = (featureKey: string | undefined, role?: string) => {
    if (role === "admin") return true;
    if (!featureKey) return true;
    
    const features = context.subscription?.plan?.features;
    if (!features) return false;

    return features[featureKey as keyof ISubscriptionFeatures] === true;
  };

  return { ...context, isAllowed };
}

/**
 * Route to Feature Mapping
 */
export const routeFeatureMap: Record<string, keyof ISubscriptionFeatures> = {
  "/meals": "meals",
  "/meal-off-requests": "meals",
  "/menu-plans": "meals",

  "/payments": "expenses",
  "/expenses": "expenses",

  "/billing": "billing",
  "/my-bill": "billing",
  "/utility-bills": "billing",

  "/reports": "reports",

  "/market-schedules": "marketSchedule",
  "/market-duties": "marketSchedule",

  "/ai-shopping": "aiShopping",

  "/notices": "notices",
  "/complaints": "complaints",
};

/**
 * Routes that are always accessible
 */
export const alwaysAccessibleRoutes = [
  "/dashboard",
  "/members",
  "/mess-settings",
  "/subscription",
  "/profile",
];
