import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Calendar,
  Wallet,
  Smartphone,
  BookOpen
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/custom/theme-toggle";

export default function RootPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-3xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Utensils className="size-4" />
            </span>
            <span className="font-bold text-lg tracking-tight">Mess OS</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <Link href="/docs" className="transition-colors hover:text-foreground flex items-center gap-1.5">
              <BookOpen className="size-4 text-primary" /> Documentation
            </Link>
            <Link href="/docs/manager" className="transition-colors hover:text-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600" /> Manager Manual
            </Link>
            <Link href="/docs/user" className="transition-colors hover:text-foreground flex items-center gap-1.5">
              <Users className="size-4 text-primary" /> Member Manual
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="outline" size="icon-sm" />
            <Button asChild variant="ghost" size="sm" className="font-semibold">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="font-semibold shadow-sm">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 shadow-sm mx-auto">
            <Sparkles className="size-4" /> The All-In-One Digital Mess Operating System
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-5xl mx-auto">
            Simplify Your Mess Management. <span className="bg-linear-to-r from-primary via-emerald-600 to-primary bg-clip-text text-transparent">Zero Calculation Errors.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Automate grocery tracking, schedule daily bazaar duties, approve meal pauses instantly, and generate 100% transparent monthly bills between roommates and managers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto font-bold text-base px-8 py-6 shadow-md hover:scale-[1.02] transition-transform">
              <Link href="/auth/register">
                <span>Start Your Mess Now</span> <ArrowRight className="size-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold text-base px-8 py-6 border-border/80 hover:bg-muted transition-colors">
              <Link href="/docs">
                <BookOpen className="size-5 mr-2 text-primary" /> Read Documentation
              </Link>
            </Button>
          </div>

          {/* Quick Role Links */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <Link 
              href="/docs/manager" 
              className="p-5 rounded-2xl border bg-card hover:border-emerald-500/40 hover:shadow-sm transition-all group relative overflow-hidden flex items-start gap-4"
            >
              <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shrink-0 mt-0.5">
                <ShieldCheck className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                  Manager Complete Guide <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Learn how to calculate monthly meal rates, log daily bazaar expenses, and manage roommate complaints.
                </p>
              </div>
            </Link>

            <Link 
              href="/docs/user" 
              className="p-5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all group relative overflow-hidden flex items-start gap-4"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 mt-0.5">
                <Users className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Member Complete Guide <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Learn how to submit meal pauses, track your personal meal count, and check your monthly bill invoices.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Grid Banner */}
      <section className="border-t bg-muted/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto sm:mx-0 font-bold mb-3">
              <Calculator className="size-5" />
            </div>
            <h4 className="font-bold text-base text-foreground">Zero Math Disputes</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automated equal share overhead division ensures every taka is accounted for.
            </p>
          </div>

          <div className="space-y-2">
            <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 mx-auto sm:mx-0 font-bold mb-3">
              <Calendar className="size-5" />
            </div>
            <h4 className="font-bold text-base text-foreground">Daily Duty Roster</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automatic push reminders sent to roommates before their scheduled market visits.
            </p>
          </div>

          <div className="space-y-2">
            <div className="size-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600 mx-auto sm:mx-0 font-bold mb-3">
              <Wallet className="size-5" />
            </div>
            <h4 className="font-bold text-base text-foreground">Live Balance Tracking</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Roommates can verify their running wallet balance in real-time as expenses are logged.
            </p>
          </div>

          <div className="space-y-2">
            <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 mx-auto sm:mx-0 font-bold mb-3">
              <Smartphone className="size-5" />
            </div>
            <h4 className="font-bold text-base text-foreground">Instant Meal Control</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pause your meal with a single click before the daily booking cutoff time when eating outside.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Mess OS. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/docs" className="hover:underline">Documentation</Link>
            <Link href="/docs/manager" className="hover:underline">Manager Guide</Link>
            <Link href="/docs/user" className="hover:underline">Member Guide</Link>
            <Link href="/auth/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
