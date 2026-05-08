import React from "react";
import { Sparkles } from "lucide-react";
import { getMe } from "@/services/auth.service";
import PageLayout from "@/components/ui/custom/page-layout";

// Refactored Components
import { ParticleField } from "@/components/get-started/particle-field";
import { ActionCards } from "@/components/get-started/action-cards";
import { HowItWorks } from "@/components/get-started/how-it-works";
import GetStartedClientWrapper from "../../../components/get-started/get-started-client-wrapper";

export default async function GetStartedPage() {
  const response = await getMe();
  const user = response?.success ? response.data : null;
  const isUserOnly = user?.globalRole === "user";

  return (
    <>
      <PageLayout>
        {/* Animated Background */}
        <ParticleField />
        
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
        <ActionCards isUserOnly={isUserOnly} />

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
