"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  XCircle, 
  RefreshCcw, 
  Home, 
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSmartFilter } from "@/hooks/useSmartFilter";

function PaymentCancelContent() {
  const { getFilter } = useSmartFilter();
  const tranId = getFilter("tran_id") || "N/A";

  return (
    <DashboardPageLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-rose-500/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] bg-amber-500/5 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="relative w-full max-w-xl">
          {/* Cancel Icon Animation Container */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 scale-150 bg-rose-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-rose-500 text-white p-5 rounded-full shadow-2xl shadow-rose-500/40 animate-in zoom-in duration-500">
                <XCircle className="h-16 w-16 stroke-[2.5px]" />
              </div>
            </div>
            
            <div className="mt-6 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-3xl font-bold">Payment Cancelled</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                The transaction was cancelled or could not be completed at this time. No funds have been deducted from your account.
              </p>
            </div>
          </div>

          <Card className="border-2 border-rose-500/10 shadow-2xl shadow-rose-500/5 bg-card/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                    <Badge variant="rejected" className="px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-3 w-3" /> CANCELLED
                    </Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Transaction Time</p>
                    <p className="text-sm font-bold">{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Reference ID</span>
                    <p className="font-mono text-sm break-all font-bold">
                      {tranId}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-amber-500/5 flex gap-4 items-start">
                    <HelpCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Need assistance?</p>
                      <p className="text-xs text-amber-800/70 dark:text-amber-400/70 leading-relaxed">
                        If you encountered an error during payment, please try again or contact your bank if the issue persists.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1 shadow-lg shadow-primary/20" asChild>
                    <Link href="/manager/subscription">
                      <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/manager">
                      <Home className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
}
