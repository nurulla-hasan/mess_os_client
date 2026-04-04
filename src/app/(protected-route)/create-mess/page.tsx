"use client";

import { useState } from "react";
import { Building2, MapPin, FileText, ArrowLeft, Users, Utensils, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/ui/custom/page-layout";

const benefits = [
  {
    icon: Users,
    title: "Manage members easily",
    description: "Invite and organize all your mess members in one place",
  },
  {
    icon: Utensils,
    title: "Track meals and bazaar",
    description: "Log daily meals and bazaar expenses effortlessly",
  },
  {
    icon: CreditCard,
    title: "Monitor deposits and expenses",
    description: "Keep track of all financial activities automatically",
  },
];

export default function CreateMessPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement create mess
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Let&apos;s get started</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Create Your Mess</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Set up your mess to start managing members, meals, deposits, and expenses
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Information Section */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Why create a mess?</h2>
                <p className="text-muted-foreground">
                  A mess helps you organize shared living expenses, track daily meals, 
                  and manage bazaar costs with your roommates or colleagues.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Link */}
              <Button variant="ghost" className="gap-2" asChild>
                <a href="/get-started">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Get Started
                </a>
              </Button>
            </div>

            {/* Right: Form Card */}
            <div className="order-1 lg:order-2">
              <Card className="border-2 border-primary/10 shadow-xl shadow-primary/5">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Mess Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        Mess name
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Enter mess name"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-base">
                        Location
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Enter location or address"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base">
                        Description
                        <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Textarea
                          id="description"
                          placeholder="Add a short description about your mess..."
                          className="pl-10 min-h-25 resize-none"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Mess"}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full lg:hidden"
                        asChild
                      >
                        <a href="/get-started">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </a>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
