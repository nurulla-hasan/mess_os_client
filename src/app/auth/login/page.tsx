"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { getPostLoginRoute } from "@/lib/auth-routing";
import { IUser } from "@/types/user.type";

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
// import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/schemas/auth.schema";
import { login } from "@/services/auth.service";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await login({ ...values, rememberMe });

      if (response?.success) {
        SuccessToast(response.message || "Login successful!");

        const user = (response.data?.user as IUser) || null;

        // Determine redirect route based on user state
        const redirectRoute = getPostLoginRoute(user);
        router.replace(redirectRoute);
      } else {
        ErrorToast(response?.message || "Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      ErrorToast("Something went wrong. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold ">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Login to continue managing your mess
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email or phone</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  {...form.register("email")}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <FieldError errors={[form.formState.errors.email]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...form.register("password")}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FieldError errors={[form.formState.errors.password]} />
            </Field>
          </FieldGroup>

          {/* Utility Row */}
          <div className="flex items-center justify-between">
            <Field orientation="horizontal" className="w-auto">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <FieldLabel htmlFor="remember" className="font-normal cursor-pointer">
                Remember me
              </FieldLabel>
            </Field>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            loadingText="Signing In..."
            className="w-full"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div> */}

        {/* Social Auth */}
        {/* <Button variant="outline" className="w-full" type="button">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button> */}

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
