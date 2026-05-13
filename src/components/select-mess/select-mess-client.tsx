"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building2, Users, Crown, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/ui/custom/page-layout";
import { IMembership } from "@/types/user.type";
import { IMess } from "@/types/mess.type";
import { switchActiveMess } from "@/services/auth.service";
import { toast } from "sonner";

interface SelectMessClientProps {
  usableMemberships: IMembership[];
}

export default function SelectMessClient({ usableMemberships }: SelectMessClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedMessId, setSelectedMessId] = useState<string | null>(null);

  const handleSelectMess = (membership: IMembership) => {
    const mess = membership.messId as IMess;
    const messId = mess._id;

    setSelectedMessId(messId);

    startTransition(async () => {
      const result = await switchActiveMess(messId);

      if (result.success && result.redirectTo) {
        toast.success(`Switched to ${mess.name}`);
        router.push(result.redirectTo);
      } else {
        toast.error(result.message || "Failed to switch mess. Please try again.");
        setSelectedMessId(null);
      }
    });
  };

  return (
    <PageLayout>
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-2xl space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Multiple Messes Found</span>
            </div>
            <h1 className="text-3xl font-bold">Select Your Mess</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              You have access to multiple messes. Choose which one you&apos;d like to manage or participate in.
            </p>
          </div>

          {/* Mess Cards */}
          <div className="space-y-4">
            {usableMemberships.map((membership) => {
              const mess = membership.messId as IMess;
              const role = membership.role || membership.messRole;
              const isManager = role === "manager";
              const isLoading = isPending && selectedMessId === mess._id;
              const isDisabled = isPending;

              return (
                <Card
                  key={membership._id || mess._id}
                  className={`
                    group relative overflow-hidden cursor-pointer
                    border-2 transition-all duration-300
                    ${isDisabled && !isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    }
                    ${isLoading ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border"}
                  `}
                  onClick={() => !isDisabled && handleSelectMess(membership)}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:via-primary/5 group-hover:to-primary/3 transition-all duration-500" />

                  <CardContent className="relative p-6">
                    <div className="flex items-center gap-5">
                      {/* Icon */}
                      <div className={`
                        shrink-0 flex items-center justify-center w-14 h-14 rounded-xl
                        transition-all duration-300
                        ${isManager
                          ? "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                        }
                      `}>
                        {isManager
                          ? <Crown className="h-7 w-7" />
                          : <Users className="h-7 w-7" />
                        }
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold truncate">{mess.name}</h3>
                          <Badge
                            variant={isManager ? "outline" : "secondary"}
                            className="shrink-0 capitalize text-xs"
                          >
                            {role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" />
                            {mess.address || "No address"}
                          </span>
                          {mess.memberCount !== undefined && (
                            <>
                              <span className="text-border">•</span>
                              <span className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5" />
                                {mess.memberCount} members
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Arrow / Loader */}
                      <div className="shrink-0">
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 text-primary animate-spin" />
                        ) : (
                          <ArrowRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            You can switch between messes anytime from your profile settings.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
