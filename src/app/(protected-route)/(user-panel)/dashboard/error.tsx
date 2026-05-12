"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";

export default function GlobalPanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Panel Route Error:", error);
  }, [error]);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full animate-pulse" />
          <div className="h-24 w-24 bg-destructive/10 rounded-full flex items-center justify-center relative ring-8 ring-destructive/5 border border-destructive/20 shadow-2xl">
            <AlertTriangle className="h-12 w-12 text-destructive drop-shadow-md" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black tracking-tight text-foreground mb-3 drop-shadow-sm">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground/80 max-w-md mx-auto mb-8 leading-relaxed font-medium">
          We encountered an unexpected error while loading this page. 
          Our system has logged the issue, but please try refreshing.
        </p>
        
        <Button 
          onClick={() => reset()} 
          size="lg"
          className="shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 rounded-full px-8 font-semibold"
        >
          <RefreshCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </div>
    </DashboardPageLayout>
  );
}
