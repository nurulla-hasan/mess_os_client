"use client";

import * as React from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { registerSchema } from "@/schemas/auth.schema";
import { register } from "@/services/auth.service";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    if (!agreeToTerms) {
      ErrorToast("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      const response = await register({
        fullName: values.fullname,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (response?.success) {
        SuccessToast(response.message || "Account created successfully!");
        router.replace(
          `/auth/verify-otp?type=register&email=${encodeURIComponent(values.email)}`,
        );
      } else {
        ErrorToast(
          response?.message || "Registration failed. Please try again.",
        );
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An unexpected error occurred. Please try again.";
      ErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Create your account to start managing your mess
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {/* Row 1: Full name | Phone number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field data-invalid={!!form.formState.errors.fullname}>
                <FieldLabel htmlFor="fullname">Full name</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullname"
                    placeholder="John Doe"
                    className="pl-10"
                    {...form.register("fullname")}
                    disabled={isLoading}
                    autoComplete="name"
                  />
                </div>
                <FieldError errors={[form.formState.errors.fullname]} />
              </Field>
              <Field data-invalid={!!form.formState.errors.phone}>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    className="pl-10"
                    {...form.register("phone")}
                    disabled={isLoading}
                    autoComplete="tel"
                  />
                </div>
                <FieldError errors={[form.formState.errors.phone]} />
              </Field>
            </div>

            {/* Row 2: Email (full width) */}
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
              <FieldError errors={[form.formState.errors.email]} />
            </Field>

            {/* Row 3: Password | Confirm password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field data-invalid={!!form.formState.errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...form.register("password")}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
                <FieldError errors={[form.formState.errors.password]} />
              </Field>
              <Field data-invalid={!!form.formState.errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...form.register("confirmPassword")}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
                <FieldError errors={[form.formState.errors.confirmPassword]} />
              </Field>
            </div>
          </FieldGroup>

          {/* Terms Section */}
          <div className="pt-2 border-t">
            <Field orientation="horizontal" className="pt-2 items-center">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) =>
                  setAgreeToTerms(checked as boolean)
                }
              />
              <FieldLabel
                htmlFor="terms"
                className="text-sm leading-relaxed font-normal cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
              </FieldLabel>
            </Field>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            loadingText="Creating account..."
            className="w-full"
          >
            Create account
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground pt-2 border-t">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
