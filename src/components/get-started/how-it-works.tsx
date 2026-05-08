"use client";

import React from "react";
import { Users, CreditCard, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Simple & Easy</span>
        </div>
        <h3 className="text-3xl font-bold bg-linear-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">How it works</h3>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Simple steps to manage your mess efficiently and effortlessly
        </p>
      </div>

      {/* Steps grid with connecting line on desktop */}
      <div className="relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-15 left-[20%] right-[20%] h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent rounded-full" />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center gap-6 py-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors animate-pulse" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300">
                    <Users className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center border-2 border-background shadow-lg">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Add members</h4>
                  <p className="text-muted-foreground">
                    Invite members to your mess
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center gap-6 py-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors animate-pulse" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300">
                    <CreditCard className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center border-2 border-background shadow-lg">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Track expenses</h4>
                  <p className="text-muted-foreground">
                    Manage bazaar and deposits
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 3 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center gap-6 py-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors animate-pulse" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center border-2 border-background shadow-lg">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Calculate automatically</h4>
                  <p className="text-muted-foreground">
                    Smart monthly calculations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
