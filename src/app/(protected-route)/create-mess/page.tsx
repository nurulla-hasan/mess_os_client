"use client";

import * as React from "react";
import { Plus, Trash2, Home, MapPin, ArrowRight, Sparkles, LayoutDashboard, Copy } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageLayout from "@/components/ui/custom/page-layout";
import { createMessSchema } from "@/schemas/mess.schema";
import { createMess } from "@/services/mess.service";
import { Badge } from "@/components/ui/badge";

type CreateMessFormValues = z.infer<typeof createMessSchema>;

export default function CreateMessPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<CreateMessFormValues>({
    resolver: zodResolver(createMessSchema),
    defaultValues: {
      name: "",
      address: "",
      mealCategories: [{ value: "Breakfast" }, { value: "Lunch" }, { value: "Dinner" }],
      equalShareCategories: [{ value: "Internet" }, { value: "Electricity" }, { value: "Water" }],
    },
  });

  const { fields: mealFields, append: appendMeal, remove: removeMeal } = useFieldArray({
    name: "mealCategories",
    control: form.control,
  });

  const { fields: shareFields, append: appendShare, remove: removeShare } = useFieldArray({
    name: "equalShareCategories",
    control: form.control,
  });

  // Watch values for the preview
  const watchedName = form.watch("name");
  const watchedAddress = form.watch("address");
  const watchedMeals = form.watch("mealCategories");
  const watchedShares = form.watch("equalShareCategories");

  async function onSubmit(values: CreateMessFormValues) {
    setIsLoading(true);
    try {
      // Map back to array of strings for the API
      const apiPayload = {
        name: values.name,
        address: values.address,
        settings: {
          mealCategories: values.mealCategories.map(m => m.value),
          equalShareCategories: values.equalShareCategories.map(s => s.value),
        }
      };

      const response = await createMess(apiPayload);

      if (response?.success) {
        SuccessToast("Mess created successfully!");
        router.push("/manager");
      } else {
        ErrorToast(response?.message || "Failed to create mess");
      }
    } catch (error) {
      ErrorToast("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 pt-6">
        
        {/* Left Column - Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold ">Create your Mess</h1>
            <p className="text-muted-foreground">
              Set up your mess details and customize your management categories.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent >
                <FieldGroup>
                  <Field data-invalid={!!form.formState.errors.name}>
                    <FieldLabel htmlFor="mess-name">Mess Name</FieldLabel>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mess-name"
                        placeholder="e.g. Sunrise Hostel"
                        className="pl-10"
                        {...form.register("name")}
                        disabled={isLoading}
                      />
                    </div>
                    <FieldDescription>This will be visible to all members.</FieldDescription>
                    <FieldError errors={[form.formState.errors.name]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.address}>
                    <FieldLabel htmlFor="mess-address">Address</FieldLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mess-address"
                        placeholder="e.g. 123 Main St, City"
                        className="pl-10"
                        {...form.register("address")}
                        disabled={isLoading}
                      />
                    </div>
                    <FieldError errors={[form.formState.errors.address]} />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Meal Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meal Categories</CardTitle>
                <CardDescription>Define the daily meal types available for members.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealFields.map((field, index) => {
                  const error = form.formState.errors.mealCategories?.[index]?.value;
                  return (
                    <Field key={field.id} data-invalid={!!error} orientation="horizontal" className="space-y-0">
                      <div className="flex-1">
                        <Input
                          {...form.register(`mealCategories.${index}.value` as const)}
                          disabled={isLoading}
                          placeholder="e.g. Breakfast"
                        />
                        <FieldError errors={[error]} />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMeal(index)}
                        disabled={mealFields.length === 1 || isLoading}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Field>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendMeal({ value: "" })}
                  disabled={isLoading}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Meal Category
                </Button>
              </CardContent>
            </Card>

            {/* Equal Share Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Equal Share Categories</CardTitle>
                <CardDescription>Fixed expenses divided equally among all active members.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shareFields.map((field, index) => {
                  const error = form.formState.errors.equalShareCategories?.[index]?.value;
                  return (
                    <Field key={field.id} data-invalid={!!error} orientation="horizontal" className="space-y-0">
                      <div className="flex-1">
                        <Input
                          {...form.register(`equalShareCategories.${index}.value` as const)}
                          disabled={isLoading}
                          placeholder="e.g. Internet"
                        />
                        <FieldError errors={[error]} />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeShare(index)}
                        disabled={shareFields.length === 1 || isLoading}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Field>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendShare({ value: "" })}
                  disabled={isLoading}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense Category
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" size="lg" onClick={() => router.push("/get-started")} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" size="lg" loading={isLoading} loadingText="Creating...">
                Create Mess
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="sticky top-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              Preview Workspace
            </h3>
            
            <Card className="pt-0 overflow-hidden">
              <div className="h-24 bg-linear-to-r from-primary/20 via-primary/10 to-transparent flex items-end p-4">
                <div className="w-16 h-16 rounded-xl bg-background border shadow-sm flex items-center justify-center -mb-8 z-10">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold truncate">
                    {watchedName || "Your Mess Name"}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {watchedAddress || "Mess Address location"}
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 flex justify-between items-center group">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Invite Code</p>
                    <p className="font-mono font-bold text-primary tracking-widest blur-xs group-hover:blur-none transition-all">MESS-XXXX</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Meals Tracked</p>
                    <div className="flex flex-wrap gap-2">
                      {watchedMeals.filter(m => m.value).length > 0 ? (
                        watchedMeals.filter(m => m.value).map((meal, i) => (
                          <Badge key={i} variant="secondary">{meal.value}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground italic">None added</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Shared Expenses</p>
                    <div className="flex flex-wrap gap-2">
                      {watchedShares.filter(s => s.value).length > 0 ? (
                        watchedShares.filter(s => s.value).map((share, i) => (
                          <Badge key={i} variant="secondary">{share.value}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground italic">None added</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed text-center">
                    Creating a mess automatically assigns you the Manager role. You can invite members right after creation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </div>
    </PageLayout>
  );
}
