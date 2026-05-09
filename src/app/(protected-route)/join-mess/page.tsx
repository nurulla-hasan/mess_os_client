"use client";

import * as React from "react";
import { Key, ArrowRight, ShieldCheck } from "lucide-react";
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
} from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageLayout from "@/components/ui/custom/page-layout";
import { joinMessSchema } from "@/schemas/mess.schema";
import { joinMess } from "@/services/mess.service";

type JoinMessFormValues = z.infer<typeof joinMessSchema>;

export default function JoinMessPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<JoinMessFormValues>({
    resolver: zodResolver(joinMessSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  async function onSubmit(values: JoinMessFormValues) {
    setIsLoading(true);
    try {
      // Using the server action
      const response = await joinMess(values);

      if (response?.success) {
        SuccessToast("Join request sent successfully!");
        router.push("/pending-approval");
      } else {
        ErrorToast(response?.message || "Failed to join mess. Please check the invite code.");
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md border-2 border-primary/10 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pt-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Join a Mess</h1>
            <p className="text-sm text-muted-foreground">
              Enter the invite code provided by your mess manager
            </p>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Field data-invalid={!!form.formState.errors.inviteCode}>
                  <FieldLabel htmlFor="invite-code">Invite Code</FieldLabel>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-code"
                      placeholder="e.g. MESS-1234"
                      className="pl-10 uppercase"
                      {...form.register("inviteCode", {
                        onChange: (e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }
                      })}
                      disabled={isLoading}
                    />
                  </div>
                  <FieldError errors={[form.formState.errors.inviteCode]} />
                </Field>
              </FieldGroup>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once submitted, your request will be sent to the mess manager. You will gain access after they approve it.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Submitting..."
                  className="flex-1 group"
                >
                  Submit Request
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1"
                  onClick={() => router.push("/get-started")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
