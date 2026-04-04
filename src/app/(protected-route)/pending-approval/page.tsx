"use client";

import { Clock, ArrowLeft, RotateCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/ui/custom/page-layout";

export default function PendingApprovalPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg space-y-8">
          {/* Status Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/30 to-primary/10 border-2 border-primary/20 shadow-xl shadow-primary/10">
                <Clock className="h-12 w-12 text-primary animate-pulse" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-primary/40 rounded-full" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 bg-primary/30 rounded-full" />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">Pending Approval</h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto">
              Your request to join the mess is waiting for manager approval
            </p>
          </div>

          {/* Info Card */}
          <Card className="border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">What happens next?</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary/60 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    The mess manager will review your request
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary/60 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    You will gain full access after approval
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary/60 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    You will be notified once approved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1 gap-2 group"
              onClick={() => window.location.reload()}
            >
              <RotateCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Status
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1 gap-2"
              asChild
            >
              <a href="/get-started">
                <ArrowLeft className="h-4 w-4" />
                Back to Get Started
              </a>
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground">
            If this takes too long, contact your mess manager
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
