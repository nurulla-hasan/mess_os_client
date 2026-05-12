"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Share2, 
  ShieldCheck,
  CreditCard,
  Copy,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "N/A";
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tranId);
    setIsCopied(true);
    toast.success("Transaction ID copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <DashboardPageLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative w-full max-w-xl">
          {/* Success Icon Animation Container */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 scale-150 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-emerald-500 text-white p-5 rounded-full shadow-2xl shadow-emerald-500/40 animate-in zoom-in duration-500">
                <CheckCircle2 className="h-16 w-16 stroke-[2.5px]" />
              </div>
            </div>
            
            <div className="mt-6 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for your payment. Your transaction has been completed and your record is updated.
              </p>
            </div>
          </div>

          <Card className="border-2 border-emerald-500/10 shadow-2xl shadow-emerald-500/5 bg-card/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                    <Badge variant="success" className="px-3 py-1 text-xs font-bold flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      <ShieldCheck className="h-3 w-3" /> VERIFIED
                    </Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment Date</p>
                    <p className="text-sm font-bold">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Transaction ID</span>
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {isCopied ? "COPIED" : "COPY"}
                      </button>
                    </div>
                    <p className="font-mono text-sm break-all font-bold tracking-tight">
                      {tranId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Payment Method</p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold">Online Transfer</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-border/50 space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Payment Type</p>
                      <span className="text-sm font-bold">Mess Deposit</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1 shadow-lg shadow-primary/20" asChild>
                    <Link href="/manager/subscription">
                      View My History <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" /> Save Receipt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center gap-6 animate-in fade-in duration-1000 delay-500">
            <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" /> SHARE RECEIPT
            </button>
            <div className="w-px h-4 bg-border/50" />
            <Link href="/manager" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
