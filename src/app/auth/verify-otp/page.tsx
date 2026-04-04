"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Timer } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hooks/useUtilityHooks";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const verifyOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { secondsLeft, isRunning, start } = useCountdown(30, "otp-timer");

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Start countdown on mount
  React.useEffect(() => {
    if (!isRunning && secondsLeft === "00:30") {
      start();
    }
  });

  function onSubmit(values: VerifyOtpFormValues) {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/reset-password");
    }, 2000);
  }

  const handleResend = () => {
    start();
    // Add resend logic here
    console.log("OTP Resent");
  };

  return (
    <Card className="grid gap-12 w-full sm:max-w-96">
      <CardHeader className="text-center gap-0">
        <h1 className="text-xl font-semibold">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2" data-invalid={fieldState.invalid}>
                  <FormLabel className="sr-only">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4">
              <Button
                type="submit"
                loading={isLoading}
                loadingText="Verifying..."
                className="w-full"
              >
                Verify OTP
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Didn&apos;t receive a code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isRunning}
                  className="font-medium text-primary hover:underline underline-offset-4 disabled:opacity-50 disabled:no-underline"
                >
                  {isRunning ? (
                    <span className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      Resend in {secondsLeft}
                    </span>
                  ) : (
                    "Resend"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
