import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Utensils, 
  ChevronRight,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/custom/theme-toggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-3xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Utensils className="size-4" />
              </span>
              <span className="font-bold text-lg">Mess OS</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold ml-1 border border-primary/20">
                DOCS
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/docs" className="transition-colors hover:text-primary">
              Overview
            </Link>
            <Link href="/docs/manager" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600" /> Manager Guide
            </Link>
            <Link href="/docs/user" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <Users className="size-4 text-primary" /> User Guide
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="outline" size="icon-sm" />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" /> Back to App
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-8 gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <Sparkles className="size-4" />
                <span className="text-sm">Mess OS Docs Hub</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Everything you need to master automated mess management as a manager or member.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Navigation
              </h4>
              <Link 
                href="/docs"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors"
              >
                <BookOpen className="size-4 text-muted-foreground" />
                <span>Introduction</span>
                <ChevronRight className="size-3 ml-auto opacity-50" />
              </Link>
              <Link 
                href="/docs/manager"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors"
              >
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Manager Complete Guide</span>
                <ChevronRight className="size-3 ml-auto opacity-50" />
              </Link>
              <Link 
                href="/docs/user"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors"
              >
                <Users className="size-4 text-primary" />
                <span>Member Complete Guide</span>
                <ChevronRight className="size-3 ml-auto opacity-50" />
              </Link>
            </div>

            <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3">
              <h5 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Quick Help
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need technical support or custom features for your mess? Contact our support team.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold">
                <Link href="/#contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
