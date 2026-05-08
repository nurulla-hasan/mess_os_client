import React from "react";
import { Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { getMe } from "@/services/auth.service";
import PageLayout from "@/components/ui/custom/page-layout";
import { redirect } from "next/navigation";

// Refactored Components
import { ParticleField } from "@/components/get-started/particle-field";
import { ActionCards } from "@/components/get-started/action-cards";
import { HowItWorks } from "@/components/get-started/how-it-works";
import GetStartedClientWrapper from "../../../components/get-started/get-started-client-wrapper";

import { IMembership } from "@/types/user.type";
import { IMess } from "@/types/mess.type";

export default async function GetStartedPage() {
  const response = await getMe();

  if (!response?.success) {
    redirect("/auth/login");
  }

  const user = response.data;
  const isUserOnly = user?.globalRole === "user";

  // Check for suspended mess
  const suspendedMembership = (user?.memberships as IMembership[])?.find(
    (m) => typeof m.messId !== "string" && m.messId?.status === "suspended"
  );
  const suspendedMess = suspendedMembership?.messId as IMess;

  return (
    <>
      <PageLayout>
        {/* Animated Background */}
        <ParticleField />
        
        {/* Suspension Banner */}
        {suspendedMess && (
          <div className="relative z-10 max-w-4xl mx-auto mb-12">
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-md shadow-2xl shadow-rose-500/10 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icons.ShieldAlert className="h-24 w-24 text-rose-500" />
              </div>
              <div className="h-16 w-16 rounded-full bg-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/30 animate-pulse">
                <Icons.ShieldAlert className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left relative z-10">
                <h2 className="text-xl font-bold text-rose-600 tracking-tight">Your mess has been suspended</h2>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-rose-500/70">Reason from Admin</p>
                  <p className="text-sm font-medium text-foreground/80 italic bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                    &quot;{suspendedMess.suspensionNote || "Violation of platform terms and conditions."}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Header Section */}
        <div className="relative text-center space-y-5 mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/5">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Welcome to Mess OS</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <GetStartedClientWrapper user={user} />
        </div>

        {/* Main Action Cards */}
        <ActionCards isUserOnly={isUserOnly} isSuspended={!!suspendedMess} />

        {/* How it works Section */}
        <HowItWorks />
      </PageLayout>
      
      {/* Global animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}} />
    </>
  );
}
