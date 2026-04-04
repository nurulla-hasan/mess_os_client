"use client";

import * as React from "react";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { resetPassword } from "@/services/auth.service";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!email || !otp) {
      ErrorToast("Email and OTP are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        email,
        otp,
        newPassword: values.password,
      });

      if (response?.success) {
        SuccessToast(response.message || "Password reset successfully!");
        router.push("/auth/login");
      } else {
        ErrorToast(response?.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      ErrorToast("Failed to reset password. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Set new password</h1>
        <p className="text-sm text-muted-foreground">
          Create a new password for your account
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem data-invalid={fieldState.invalid}>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem data-invalid={fieldState.invalid}>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password helper */}
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters
            </p>

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Resetting..."
              className="w-full"
            >
              Reset password
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground pt-2 border-t">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
