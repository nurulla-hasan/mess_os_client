import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { MessageSquare } from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { 
  getSubscriptionPlans, 
  getSubscriptionHistory 
} from "@/services/subscription.service";
import { SubscriptionContent } from "@/components/subscription/subscription-content";

export default async function ManagerSubscriptionPage() {
  const messId = await getActiveMessIdFromCookies();

  if (!messId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold">No Active Mess Selected</h2>
          <p className="text-muted-foreground">Please select a mess to manage subscriptions.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  // Parallel data fetching
  const [plansRes, historyRes] = await Promise.all([
    getSubscriptionPlans(),
    getSubscriptionHistory(messId),
  ]);

  const plans = plansRes?.success ? plansRes.data : [];
  const history = historyRes?.success ? historyRes.data : [];

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Subscription Management"
        description="Manage your mess subscription, view plans, and billing history."
      />
      
      <SubscriptionContent 
        plans={plans}
        history={history}
        messId={messId}
      />
    </DashboardPageLayout>
  );
}
