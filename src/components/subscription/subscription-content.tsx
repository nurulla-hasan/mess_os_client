"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Check,
  History,
  Loader2,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ISubscriptionPlan, ISubscriptionLog } from "@/types/subscription.type";
import { subscriptionHistoryColumns } from "./subscription-history-columns";
import { subscribeToPlan, cancelSubscription } from "@/services/subscription.service";
import { cn, formatDate, SuccessToast, ErrorToast } from "@/lib/utils";
import { useSubscription } from "@/providers/subscription-provider";

interface SubscriptionContentProps {
  plans: ISubscriptionPlan[];
  history: ISubscriptionLog[];
  messId: string;
}

export function SubscriptionContent({ 
  plans, 
  history, 
  messId 
}: SubscriptionContentProps) {
  const { subscription: currentSubscription } = useSubscription();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Refresh data if user returns from payment gateway
  // Many gateways append status or session params
  const hasStatus = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("status");

  if (hasStatus) {
    // Clear status from URL and refresh
    const url = new URL(window.location.href);
    url.searchParams.delete("status");
    window.history.replaceState({}, "", url.toString());
    router.refresh();
  }

  const handleSubscribe = (planId: string) => {
    startTransition(async () => {
      try {
        const res = await subscribeToPlan(messId, planId);
        if (res.success) {
          if (res.data?.gatewayUrl) {
            SuccessToast("Redirecting to payment gateway...");
            window.location.href = res.data.gatewayUrl;
          } else {
            SuccessToast(res.message || "Subscribed successfully!");
            router.refresh();
          }
        } else {
          ErrorToast(res.message || "Failed to subscribe.");
        }
      } catch {
        ErrorToast("An unexpected error occurred.");
      }
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      try {
        const res = await cancelSubscription(messId);
        if (res.success) {
          SuccessToast("Subscription cancelled successfully.");
          router.refresh();
        } else {
          ErrorToast(res.message || "Failed to cancel subscription.");
        }
      } catch {
        ErrorToast("An unexpected error occurred.");
      }
    });
  };

  const isCurrentPlan = (planCode: string) => {
    return currentSubscription?.planId === planCode;
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Summary (if active) */}
      {currentSubscription && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">Active Subscription: {currentSubscription.plan.name}</h3>
                  <Badge variant="success" className="capitalize">{currentSubscription.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Renews on <span className="font-bold">{formatDate(currentSubscription.currentPeriodEnd)}</span>
                </p>
              </div>
            </div>
            {currentSubscription.planId !== "free" && !currentSubscription.cancelAtPeriodEnd && (
              <ConfirmationModal
                title="Cancel Subscription?"
                description="Are you sure you want to cancel your subscription? You will lose access to premium features at the end of the billing cycle."
                confirmText="Yes, Cancel"
                loadingText="Cancelling..."
                onConfirm={handleCancel}
                isLoading={isPending}
                variant="destructive"
                trigger={
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isPending}
                  >
                    Cancel Subscription
                  </Button>
                }
              />
            )}
            {currentSubscription.cancelAtPeriodEnd && (
              <Badge variant="rejected">Scheduled for Cancellation</Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Plans Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((plan) => {
          const active = isCurrentPlan(plan.code);
          const isFree = plan.price === 0;

          return (
            <Card key={plan._id} className={cn(
              "flex flex-col relative overflow-hidden transition-all duration-300",
              active ? "border-primary ring-1 ring-primary" : "hover:border-primary/30"
            )}>
              {plan.code === "pro" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                  Recommended
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">
                    {isFree ? "Free" : `৳${plan.price}`}
                  </span>
                  {!isFree && (
                    <span className="text-xs text-muted-foreground">/ {plan.billingCycle}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Up to {plan.maxMembers} Members</span>
                  </div>
                  {Object.entries(plan.features).map(([feature, enabled]) => {
                    if (!enabled) return null;
                    return (
                      <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-emerald-500/50" />
                        <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full shadow-sm"
                  variant={active ? "outline" : "default"}
                  disabled={active || isPending}
                  onClick={() => handleSubscribe(plan.code)}
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {active ? "Current Active Plan" : isFree ? "Switch to Free" : "Upgrade to " + plan.name}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-3">
            <History className="h-4 w-4 text-muted-foreground" />
            Billing & Action History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={subscriptionHistoryColumns}
            data={history}
          />
        </CardContent>
      </Card>
    </div>
  );
}
