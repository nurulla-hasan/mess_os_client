import type { ReactNode } from "react";
import { Utensils, CheckCircle, Users, CreditCard } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Section - Product Intro */}
      <div className="hidden lg:flex lg:w-[48%] relative flex-col justify-center px-16 xl:px-24 py-16 overflow-hidden">
        {/* Strong Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-primary/5 to-muted/40" />
        
        {/* Large Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-125 h-125 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-100 h-100 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-20 w-75 h-75 bg-secondary/30 rounded-full blur-[60px]" />
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-40 w-32 h-32 border border-primary/20 rounded-2xl rotate-12 opacity-40" />
        <div className="absolute bottom-40 right-60 w-20 h-20 bg-primary/10 rounded-xl rotate-45" />
        <div className="absolute top-40 left-10 w-16 h-16 border-2 border-primary/15 rounded-full" />

        <div className="relative z-10 max-w-lg mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <Utensils className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Mess OS</span>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h1 className="text-[2rem] xl:text-[2.25rem] font-semibold tracking-tight leading-[1.15]">
              Simplify your{" "}
              <span className="text-primary">mess management</span>
            </h1>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              The all-in-one platform for managing your mess, bazaar, and member finances.
            </p>

            {/* Features */}
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Smart bazaar tracking</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Automated calculations & expense monitoring</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy payments</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Deposit & expense management simplified</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Member management</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Role-based access for your team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16 py-12 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-tl from-muted/40 via-background to-primary/5" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-100 h-100 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-87.5 h-87.5 bg-secondary/20 rounded-full blur-[60px]" />
        <div className="absolute top-1/3 left-20 w-24 h-24 border border-primary/20 rounded-2xl -rotate-12 opacity-50" />
        <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-primary/10 rounded-xl rotate-45" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <Utensils className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Mess OS</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}