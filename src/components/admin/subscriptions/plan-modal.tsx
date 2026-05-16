/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm, Controller, Path, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
  FieldLegend,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/services/admin.service";
import { ISubscriptionPlan } from "@/types/subscription.type";
import { Switch } from "@/components/ui/switch";

const planSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  currency: z.string().default("BDT"),
  billingCycle: z.enum(["free", "monthly", "yearly"]),
  durationDays: z.coerce.number().min(1, "Duration must be at least 1 day"),
  maxMembers: z.coerce.number().min(1, "Must allow at least 1 member"),
  features: z.object({
    meals: z.boolean().default(false),
    expenses: z.boolean().default(false),
    billing: z.boolean().default(false),
    reports: z.boolean().default(false),
    marketSchedule: z.boolean().default(false),
    aiShopping: z.boolean().default(false),
    notices: z.boolean().default(false),
    complaints: z.boolean().default(false),
    prioritySupport: z.boolean().default(false),
  }),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().default(1),
});

type PlanFormValues = z.infer<typeof planSchema>;

interface PlanModalProps {
  plan?: ISubscriptionPlan;
  trigger?: React.ReactNode;
}

const FEATURE_LABELS: Record<string, string> = {
  meals: "Meals Management",
  expenses: "Expense Tracking",
  billing: "Billing & Invoicing",
  reports: "Advanced Reports",
  marketSchedule: "Market Schedules",
  aiShopping: "AI Shopping Assistant",
  notices: "Notice Board",
  complaints: "Complaints System",
  prioritySupport: "Priority Support",
};

export function PlanModal({ plan, trigger }: PlanModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema as any),
    defaultValues: plan
      ? {
          name: plan.name,
          code: plan.code,
          price: plan.price,
          currency: plan.currency,
          billingCycle: plan.billingCycle as PlanFormValues["billingCycle"],
          durationDays: plan.durationDays || 30,
          maxMembers: plan.maxMembers,
          features: {
            meals: plan.features.meals || false,
            expenses: plan.features.expenses || false,
            billing: plan.features.billing || false,
            reports: plan.features.reports || false,
            marketSchedule: plan.features.marketSchedule || false,
            aiShopping: plan.features.aiShopping || false,
            notices: plan.features.notices || false,
            complaints: plan.features.complaints || false,
            prioritySupport: plan.features.prioritySupport || false,
          },
          isDefault: plan.isDefault,
          isActive: plan.isActive,
          sortOrder: plan.sortOrder || 1,
        }
      : {
          name: "",
          code: "",
          price: 0,
          currency: "BDT",
          billingCycle: "monthly",
          durationDays: 30,
          maxMembers: 10,
          features: {
            meals: true,
            expenses: true,
            billing: false,
            reports: false,
            marketSchedule: false,
            aiShopping: false,
            notices: true,
            complaints: true,
            prioritySupport: false,
          },
          isDefault: false,
          isActive: true,
          sortOrder: 1,
        },
  });

  const onSubmit: SubmitHandler<PlanFormValues> = async (values) => {
    setIsSubmitting(true);
    try {
      const response = plan
        ? await updateSubscriptionPlan(plan._id, values)
        : await createSubscriptionPlan(values);

      if (response?.success) {
        SuccessToast(
          response.message ||
            `Plan ${plan ? "updated" : "created"} successfully!`,
        );
        router.refresh();
        setIsOpen(false);
        if (!plan) form.reset();
      } else {
        ErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      ErrorToast(err?.message || "Failed to save plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { errors } = form.formState;

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title={plan ? "Edit Subscription Plan" : "Create New Plan"}
      description={
        plan
          ? "Update the details and limitations of this plan."
          : "Define a new subscription tier with specific features and pricing."
      }
      actionTrigger={
        trigger || (
          <Button
            variant={plan ? "outline" : "default"}
            size={plan ? "icon-sm" : "default"}
          >
            {plan ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {!plan && "Create New Plan"}
          </Button>
        )
      }
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 max-h-[50vh] overflow-y-auto"
      >
        <FieldGroup>
          {/* Section 1: Identity */}
          <FieldSet>
            <FieldLegend>Plan Details</FieldLegend>
            <FieldDescription>
              Identity and identification for this tier.
            </FieldDescription>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="p-name">Plan Name</FieldLabel>
                <Input
                  id="p-name"
                  placeholder="e.g. Pro"
                  {...form.register("name")}
                />
                <FieldError errors={[errors.name]} />
              </Field>
              <Field data-invalid={!!errors.code}>
                <FieldLabel htmlFor="p-code">Unique Code</FieldLabel>
                <Input
                  id="p-code"
                  placeholder="pro_tier"
                  {...form.register("code")}
                  disabled={!!plan}
                />
                <FieldError errors={[errors.code]} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Section 2: Pricing */}
          <FieldSet>
            <FieldLegend>Pricing & Limits</FieldLegend>
            <FieldDescription>
              Set the cost and member limitations.
            </FieldDescription>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field data-invalid={!!errors.price}>
                <FieldLabel htmlFor="p-price">Price (BDT)</FieldLabel>
                <Input id="p-price" type="number" {...form.register("price")} />
                <FieldError errors={[errors.price]} />
              </Field>
              <Field data-invalid={!!errors.billingCycle}>
                <FieldLabel htmlFor="p-cycle">Billing Cycle</FieldLabel>
                <Controller
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="p-cycle">
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.billingCycle]} />
              </Field>
              <Field data-invalid={!!errors.maxMembers}>
                <FieldLabel htmlFor="p-members">Max Members</FieldLabel>
                <Input
                  id="p-members"
                  type="number"
                  {...form.register("maxMembers")}
                />
                <FieldError errors={[errors.maxMembers]} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Section 3: Features */}
          <FieldSet>
            <FieldLegend>Features</FieldLegend>
            <FieldDescription>
              Select features included in this plan.
            </FieldDescription>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {Object.keys(FEATURE_LABELS).map((key) => {
                const name = `features.${key}` as Path<PlanFormValues>;
                return (
                  <Field key={key} orientation="horizontal">
                    <Controller
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <Checkbox
                          id={`f-${key}`}
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <FieldLabel
                      htmlFor={`f-${key}`}
                      className="font-normal cursor-pointer"
                    >
                      {FEATURE_LABELS[key]}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Section 4: Settings */}
          <FieldSet>
            <FieldLegend>Platform Status</FieldLegend>
            <FieldDescription>
              Visible to messes and selection logic.
            </FieldDescription>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                orientation="horizontal"
                className="justify-between rounded-lg border p-4 bg-muted"
              >
                <div className="space-y-0.5">
                  <FieldLabel
                    htmlFor="s-active"
                    className="text-base font-medium py-0"
                  >
                    Active Status
                  </FieldLabel>
                  <FieldDescription className="text-xs">
                    Visible to messes.
                  </FieldDescription>
                </div>
                <Controller
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <Switch
                      id="s-active"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </Field>
              <Field
                orientation="horizontal"
                className="justify-between rounded-lg border p-4 bg-muted"
              >
                <div className="space-y-0.5">
                  <FieldLabel
                    htmlFor="s-default"
                    className="text-base font-medium py-0"
                  >
                    Default Plan
                  </FieldLabel>
                  <FieldDescription className="text-xs">
                    Pre-selected for new messes.
                  </FieldDescription>
                </div>
                <Controller
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <Switch
                      id="s-default"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="justify-end pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              {plan ? "Update Plan" : "Create Plan"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </ModalWrapper>
  );
}
