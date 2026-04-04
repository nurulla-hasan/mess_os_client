"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, FileText, ArrowLeft, Users, Utensils, CreditCard, Sparkles, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PageLayout from "@/components/ui/custom/page-layout";
import { SuccessToast } from "@/lib/utils";

// Zod schema for form validation - backend-friendly field names
const createMessSchema = z.object({
  name: z.string().min(1, "Mess name is required").min(2, "Name must be at least 2 characters"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
});

type CreateMessFormValues = z.infer<typeof createMessSchema>;

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateMessFormValues>({
    resolver: zodResolver(createMessSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
    },
  });

  // Fake submit handler - replace with real API call later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_values: CreateMessFormValues) {
    setIsLoading(true);
    
    // Fake delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // TODO: Replace with real API integration
    // const response = await createMess(values);
    
    setIsLoading(false);
    SuccessToast("Mess created successfully!");
    
    // Redirect to manager dashboard after fake success
    router.push("/manager");
  }

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
                    <div className="flex items-center justify-center w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
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
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Mess Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Mess name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                  placeholder="Enter mess name"
                                  className="pl-10"
                                  disabled={isLoading}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                  placeholder="Enter location or address"
                                  className="pl-10"
                                  disabled={isLoading}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Description
                              <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Textarea
                                  placeholder="Add a short description about your mess..."
                                  className="pl-10 min-h-25 resize-none"
                                  disabled={isLoading}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Actions */}
                      <div className="flex flex-col gap-3 pt-2">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Mess"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full lg:hidden"
                          asChild
                          disabled={isLoading}
                        >
                          <a href="/get-started">
                            <ArrowLeft />
                            Back
                          </a>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
