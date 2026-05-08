"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user.type";
import { logout, getMe } from "@/services/auth.service";

import PageLayout from "@/components/ui/custom/page-layout";

// Refactored Components
import { ParticleField } from "@/components/get-started/particle-field";
import { UserProfileCard } from "@/components/get-started/user-profile-card";
import { ActionCards } from "@/components/get-started/action-cards";
import { HowItWorks } from "@/components/get-started/how-it-works";

export default function GetStartedPage() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await getMe();
        if (response?.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile in get-started:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

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
          {/* User Profile Section */}
          <UserProfileCard 
            user={user} 
            isLoading={isLoading} 
            onLogout={handleLogout} 
          />
        </div>

        {/* Main Action Cards */}
        <ActionCards isUserOnly={isUserOnly} />

        {/* How it works Section */}
        <HowItWorks />
      </PageLayout>
      
      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
}
