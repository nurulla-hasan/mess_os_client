"use client";

import { Users, Utensils, CreditCard, CheckCircle, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import PageLayout from "@/components/ui/custom/page-layout";
import { cn } from "@/lib/utils";

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
          
          <DashboardPageHeader
            title="Get Started"
            description="Create your mess or join an existing one to begin managing meals and expenses"
          />
        </div>

        {/* Main Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Join a Mess Card */}
          <div className="group relative">
            <CardGlow />
            <Card>
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
                  <Button variant="outline" size="lg" asChild className="hover:bg-primary/5 transition-colors">
                    <a href="/browse-mess">Browse Mess</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create a Mess Card */}
          <div className="group relative">
            <CardGlow />
            <Card className="relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
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
                  <Button asChild size="lg" className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <a href="/create-mess" className="gap-2">
                      Create Mess
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
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
