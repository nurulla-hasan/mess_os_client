"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Timer } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCountdown } from "@/hooks/useUtilityHooks";
import { SuccessToast, ErrorToast } from "@/lib/utils";

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
  otp: z.string().min(6, "Your one-time password must be 6 characters"),
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_values: VerifyOtpFormValues) {
    setIsLoading(true);
    try {
      SuccessToast("OTP verified successfully!");
      router.push("/auth/reset-password");
    } catch (error) {
      ErrorToast("Failed to verify OTP. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleResend = () => {
    start();
    SuccessToast("OTP resent to your email!");
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
        {email && (
          <p className="text-xs text-muted-foreground">{email}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP Input */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col items-center" data-invalid={fieldState.invalid}>
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
                  <p className="text-xs text-muted-foreground mt-2">
                    Code expires in 10 minutes
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resend Section */}
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

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Verifying..."
              className="w-full"
            >
              Verify code
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
