import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Calendar,
  Wallet,
  Smartphone
} from "lucide-react";

export default function DocsOverviewPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="space-y-4 border-b pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-2">
          <Sparkles className="size-3.5" /> Welcome to Mess OS Documentation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Master Automated Mess Management
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Mess OS is the ultimate, all-in-one digital operating system designed to eliminate calculation errors, automate grocery tracking, and establish complete financial transparency between mess managers and roommates.
        </p>
      </div>

      {/* Choose Your Role Guides */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Select Your Role Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manager Card */}
          <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300 border-emerald-500/20 bg-linear-to-br from-emerald-500/5 via-background to-background flex flex-col justify-between">
            <CardHeader className="space-y-3 pb-4">
              <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
                <ShieldCheck className="size-6" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Manager Complete Guide
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn how to generate monthly billing cycles, log daily bazaar expenses, assign market duties, manage member complaints, and calculate automated meal rates seamlessly.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-emerald-500/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="size-4" /> 18 Comprehensive Module Guides
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="size-4" /> Automated Billing & Expense Logging
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="size-4" /> AI Shopping Assistant & Roster Rules
                </div>
                <div className="pt-2">
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold group-hover:gap-3 transition-all">
                    <Link href="/docs/manager">
                      <span>Explore Manager Guide</span> <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Card */}
          <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300 border-primary/20 bg-linear-to-br from-primary/5 via-background to-background flex flex-col justify-between">
            <CardHeader className="space-y-3 pb-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Users className="size-6" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Member Complete Guide
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn how to track your personal meal count, view real-time grocery expenses, submit meal-off requests, check your assigned market duties, and verify your monthly bills.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-primary/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="size-4" /> 12 Interactive Member Modules
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="size-4" /> Transparent Monthly Bill Breakdown
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="size-4" /> Meal Off Requests & Payment Logs
                </div>
                <div className="pt-2">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold group-hover:gap-3 transition-all">
                    <Link href="/docs/user">
                      <span>Explore Member Guide</span> <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Platform Highlights */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Core Architectural Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-muted/30 border">
            <CardContent className="p-5 space-y-2">
              <Calculator className="size-6 text-primary" />
              <h3 className="font-bold text-base">Error-Free Accounting</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated division of grocery costs and shared utility bills ensures zero financial disputes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border">
            <CardContent className="p-5 space-y-2">
              <Calendar className="size-6 text-emerald-600" />
              <h3 className="font-bold text-base">Smart Duty Roster</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated market scheduling alerts members before their assigned bazaar duty dates.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border">
            <CardContent className="p-5 space-y-2">
              <Wallet className="size-6 text-rose-600" />
              <h3 className="font-bold text-base">Live Deposit Tracking</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Members can verify running balance in real-time as managers log expenses and deposits.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border">
            <CardContent className="p-5 space-y-2">
              <Smartphone className="size-6 text-amber-600" />
              <h3 className="font-bold text-base">Instant Meal Control</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pause your meal with a single click before the daily booking cutoff time when eating outside.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
