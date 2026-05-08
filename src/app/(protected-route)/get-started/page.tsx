"use client";

import React, { useEffect, useState } from "react";
import { Users, Utensils, CreditCard, CheckCircle, ArrowRight, Sparkles, Zap, Star, User as UserIcon, Shield, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/components/ui/custom/page-layout";
import { cn, getInitials, SuccessToast, ErrorToast } from "@/lib/utils";
import { getMe, logout } from "@/services/auth.service";
import { requestManagerAccess } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Animated floating particles
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Giant soft orbs */}
      <div className="absolute -top-20 -left-20 w-125 h-125 bg-primary/8 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-150 h-150 bg-primary/6 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/2 w-100 h-100 bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating dots with different animations */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            i % 3 === 0 ? "bg-primary/40" : i % 3 === 1 ? "bg-primary/25" : "bg-primary/50"
          )}
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 11) % 70}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      
      {/* Pulsing rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute border border-primary/20 rounded-full"
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${20 + (i * 15) % 60}%`,
            top: `${20 + (i * 12) % 50}%`,
            animation: `ping ${3 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      
      {/* Sparkle icons */}
      <Sparkles className="absolute top-[15%] left-[20%] w-5 h-5 text-primary/30 animate-pulse" style={{ animationDuration: '2s' }} />
      <Star className="absolute top-[25%] right-[15%] w-4 h-4 text-primary/40 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      <Zap className="absolute bottom-[30%] left-[10%] w-4 h-4 text-primary/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-[20%] right-[25%] w-6 h-6 text-primary/25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
      <Star className="absolute top-[40%] left-[5%] w-3 h-3 text-primary/30 animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '1.2s' }} />
      
      {/* Cross sparkles text */}
      <span className="absolute top-[18%] right-[30%] text-primary/30 text-xl animate-pulse" style={{ animationDuration: '2s' }}>✦</span>
      <span className="absolute top-[35%] left-[25%] text-primary/25 text-lg animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}>✦</span>
      <span className="absolute bottom-[25%] right-[10%] text-primary/35 text-2xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>✦</span>
      <span className="absolute top-[60%] right-[5%] text-primary/20 text-base animate-pulse" style={{ animationDuration: '2.3s', animationDelay: '0.4s' }}>✦</span>
      <span className="absolute bottom-[40%] left-[15%] text-primary/30 text-sm animate-pulse" style={{ animationDuration: '2.7s', animationDelay: '0.9s' }}>✦</span>
    </div>
  );
}

// Shimmer effect component
function ShimmerEffect() {
  return (
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
  );
}

// Glow orb for cards
function CardGlow() {
  return (
    <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
  );
}

export default function GetStartedPage() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

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

  const handleRequestManager = async () => {
    if (!requestReason.trim()) {
      ErrorToast("Please provide a reason for your request.");
      return;
    }

    setIsSubmittingRequest(true);
    try {
      const response = await requestManagerAccess({ reason: requestReason });
      if (response?.success) {
        SuccessToast(response.message || "Request submitted successfully!");
        setIsRequestModalOpen(false);
        setRequestReason("");
      } else {
        ErrorToast(response?.message || "Failed to submit request.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingRequest(false);
    }
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
          <div className="flex justify-center mt-8">
            {isLoading ? (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 w-full max-w-md animate-pulse">
                <Skeleton className="h-16 w-16 rounded-2xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ) : user ? (
              <div className="group relative">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-primary/10 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-primary/20 shadow-xl overflow-hidden min-w-[320px] md:min-w-112.5">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse" />
                    <Avatar className="h-20 w-20 border-2 border-primary/50 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 p-1.5 bg-primary rounded-full border-2 border-background shadow-lg">
                      <Shield className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-1.5">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h4 className="text-xl font-bold tracking-tight text-foreground">{user.fullName}</h4>
                      <div className={cn(
                        "inline-flex items-center self-center md:self-auto px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-colors duration-300",
                        user.globalRole === "super_admin" 
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-sm shadow-amber-500/10" 
                          : user.globalRole === "manager"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-500 shadow-sm shadow-blue-500/10"
                            : "bg-primary/10 border-primary/20 text-primary shadow-sm shadow-primary/10"
                      )}>
                        {user.globalRole.replace("_", " ")}
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-xs text-primary/70 font-medium">Ready to manage your mess</p>
                  </div>

                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleLogout}
                      className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-4.5 w-4.5" />
                    </Button>
                  </div>

                  <div className="absolute -bottom-4 -right-4 p-3 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <UserIcon className="h-24 w-24" />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Main Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Join a Mess Card */}
          <div className="group relative">
            <CardGlow />
            <Card className="py-0 relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
              <ShimmerEffect />
              
              <CardContent className="relative flex flex-col gap-8 p-8">
                <div className="flex items-start gap-5">
                  <div className="relative flex items-center justify-center w-18 h-18 rounded-2xl bg-linear-to-br from-primary/30 to-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                    <Users className="h-9 w-9 text-primary" />
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">Join a Mess</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect with existing communities
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Join an existing mess using an invite code or request approval from mess managers. Perfect for members looking to connect.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild size="lg" className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <a href="/join-mess" className="gap-2">
                      Join with Code
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create a Mess Card */}
          <div className="group relative">
            <CardGlow />
            <Card className="py-0 relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
              <ShimmerEffect />
              
              <CardContent className="relative flex flex-col gap-8 p-8">
                <div className="flex items-start gap-5">
                  <div className="relative flex items-center justify-center w-18 h-18 rounded-2xl bg-linear-to-br from-primary/30 to-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                    <Utensils className="h-9 w-9 text-primary" />
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">Create a Mess</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start your own community
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Start your own mess and manage members, meals, and expenses with powerful tools. Ideal for managers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {isUserOnly ? (
                    <Button 
                      onClick={() => setIsRequestModalOpen(true)}
                      size="lg" 
                      className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      Request Manager Access
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button asChild size="lg" className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                      <a href="/create-mess" className="gap-2">
                        Create Mess
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How it works Section */}
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
      </PageLayout>

      {/* Request Manager Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-125 border-primary/20 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">Request Manager Access</DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              To create and manage a mess, you need manager privileges. Please provide a reason for your request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-semibold">Reason for Request</Label>
              <Textarea
                id="reason"
                placeholder="Example: I want to create and manage my own mess for my college hostel."
                className="min-h-30 bg-background/50 border-primary/10 focus-visible:ring-primary/30"
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your request will be reviewed by the super admin.
              </p>
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsRequestModalOpen(false)} disabled={isSubmittingRequest}>
              Cancel
            </Button>
            <Button 
              onClick={handleRequestManager} 
              disabled={isSubmittingRequest || !requestReason.trim()}
              className="min-w-35 shadow-lg shadow-primary/20"
            >
              {isSubmittingRequest ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
