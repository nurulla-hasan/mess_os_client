"use client";

import React from "react";
import { Ban, ShieldAlert, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout, getMe } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { getPostLoginRoute } from "@/lib/auth-routing";

export default function BlockedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Background check to see if user is unblocked
  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await getMe();
        if (response?.success && response.data?.status === "active") {
          const redirectRoute = getPostLoginRoute(response.data);
          router.replace(redirectRoute);
        }
      } catch {
        // Silently ignore background check errors
      }
    };

    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animated Icon Container */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative bg-rose-500/10 p-6 rounded-3xl border border-rose-500/20">
            <Ban className="h-16 w-16 text-rose-600 animate-in zoom-in duration-500" />
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="bg-rose-600 p-2 rounded-xl shadow-lg animate-bounce">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold  text-foreground">
            Account Restricted
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed px-4">
            Your account has been blocked by the platform administrator. 
            This action may be due to a violation of our terms or suspicious activity.
          </p>
        </div>

        {/* Support Card */}
        <div className="bg-muted border border-border/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-left">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Need help?</p>
              <p className="text-xs text-muted-foreground">Contact support to appeal this decision.</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="mailto:[nurullahasan.dev@gmail.com]">
              nurullahasan.dev@gmail.com
            </a>
          </Button>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground gap-2"
            onClick={handleLogout}
            loading={isLoading}
          >
            <LogOut className="h-4 w-4" />
            Logout from account
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium pt-8">
          MessManagerOS &bull; Security Enforcement
        </p>
      </div>
    </div>
  );
}
