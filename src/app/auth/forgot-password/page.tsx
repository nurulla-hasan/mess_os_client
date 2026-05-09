"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { forgotPassword } from "@/services/auth.service";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    try {
      const response = await forgotPassword({ email: values.email });

      if (response?.success) {
        SuccessToast(response.message || "OTP sent to your email!");
        router.push(`/auth/verify-otp?type=reset&email=${encodeURIComponent(values.email)}`);
      } else {
        ErrorToast(response?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      ErrorToast("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Forgot password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a verification code
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  {...form.register("email")}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <FieldDescription>
                We&apos;ll send a verification code to this email
              </FieldDescription>
              <FieldError errors={[form.formState.errors.email]} />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            loading={isLoading}
            loadingText="Sending..."
            className="w-full"
          >
            Send OTP
          </Button>
        </form>

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
