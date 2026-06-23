"use client";

import React from "react";
import { Users, Utensils, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequestManagerModal } from "./request-manager-modal";
import { JoinMessModal } from "./join-mess-modal";
import Link from "next/link";

// Shimmer effect component
function ShimmerEffect() {
  return (
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
  );
}

// Glow orb for cards
function CardGlow() {
  return (
    <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
  );
}

interface ActionCardsProps {
  isUserOnly: boolean;
  isSuspended?: boolean;
}

export function ActionCards({ isUserOnly, isSuspended = false }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
      {/* Join a Mess Card */}
      <div className="group relative">
        <CardGlow />
        <Card className={`py-0 relative overflow-hidden border-2 border-transparent ${!isSuspended && "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"} transition-all duration-500 bg-card/80 ${isSuspended && "opacity-80 grayscale-[0.5]"}`}>
          <ShimmerEffect />
          
          <CardContent className="relative flex flex-col gap-8 p-8">
            <div className="flex items-start gap-5">
              <div className={`relative flex items-center justify-center w-18 h-18 rounded-lg bg-linear-to-br ${isSuspended ? "from-muted to-muted/50" : "from-primary/30 to-primary/10 group-hover:scale-110 group-hover:rotate-3"} transition-all duration-500 shadow-lg`}>
                <Users className={`h-9 w-9 ${isSuspended ? "text-muted-foreground" : "text-primary"}`} />
                {!isSuspended && <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse" />}
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-3xl font-bold  group-hover:text-primary transition-colors duration-300">
                  Join a Mess
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect with existing communities
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Join an existing mess using an invite code or request approval
              from mess managers. Perfect for members looking to connect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {isSuspended ? (
                <Button disabled size="lg" className="w-full sm:w-auto">Account Restricted</Button>
              ) : (
                <JoinMessModal />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create a Mess Card */}
      <div className="group relative">
        <CardGlow />
        <Card className={`py-0 relative overflow-hidden border-2 border-transparent ${!isSuspended && "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"} transition-all duration-500 bg-card/80 ${isSuspended && "opacity-80 grayscale-[0.5]"}`}>
          <ShimmerEffect />
          
          <CardContent className="relative flex flex-col gap-8 p-8">
            <div className="flex items-start gap-5">
              <div className={`relative flex items-center justify-center w-18 h-18 rounded-lg bg-linear-to-br ${isSuspended ? "from-muted to-muted/50" : "from-primary/30 to-primary/10 group-hover:scale-110 group-hover:rotate-3"} transition-all duration-500 shadow-lg`}>
                <Utensils className={`h-9 w-9 ${isSuspended ? "text-muted-foreground" : "text-primary"}`} />
                {!isSuspended && <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse" />}
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-3xl font-bold  group-hover:text-primary transition-colors duration-300">
                  Create a Mess
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Start your own community
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Start your own mess and manage members, meals, and expenses with
              powerful tools. Ideal for managers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {isSuspended ? (
                <Button disabled size="lg" className="w-full sm:w-auto">Actions Disabled</Button>
              ) : isUserOnly ? (
                <RequestManagerModal />
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <Link href="/create-mess" className="gap-3">
                    Create Mess
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
