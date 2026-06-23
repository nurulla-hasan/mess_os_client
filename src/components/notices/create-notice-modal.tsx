"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createNotice } from "@/services/notice.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Title cannot exceed 120 characters"),
  content: z.string().min(1, "Content is required").max(5000, "Content cannot exceed 5000 characters"),
  isPinned: z.boolean().optional(),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

interface CreateNoticeModalProps {
  messId: string;
}

export function CreateNoticeModal({ messId }: CreateNoticeModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: "",
      content: "",
      isPinned: false,
    },
  });

  const { errors } = form.formState;

  async function onSubmit(values: NoticeFormValues) {
    setIsLoading(true);
    try {
      const res = await createNotice(messId, values);
      if (res?.success) {
        SuccessToast(res.message || "Notice created successfully.");
        setOpen(false);
        form.reset();
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to create notice.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        ErrorToast(error.message);
      } else {
        ErrorToast("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Create New Notice"
      description="Broadcast an announcement to all members of your mess."
      actionTrigger={
        <Button className="w-full sm:w-auto">
          <Plus /> Create Notice
        </Button>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 overflow-y-auto max-h-[50vh]">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Notice Details</FieldLegend>
            <FieldDescription>
              Provide a clear title and detailed content for your announcement.
            </FieldDescription>
            
            <FieldGroup>
              <Field data-invalid={!!errors.title}>
                <FieldLabel htmlFor="n-title">Notice Title</FieldLabel>
                <Input 
                  id="n-title" 
                  placeholder="e.g. Monthly bazar budget update" 
                  {...form.register("title")} 
                />
                <FieldError errors={[errors.title]} />
              </Field>

              <Field data-invalid={!!errors.content}>
                <FieldLabel htmlFor="n-content">Content</FieldLabel>
                <Textarea 
                  id="n-content"
                  placeholder="Write your announcement details here..." 
                  className="min-h-32 resize-none"
                  {...form.register("content")} 
                />
                <FieldError errors={[errors.content]} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field
                orientation="horizontal"
                className="justify-between rounded-lg border p-4 bg-muted/30"
              >
                <div className="space-y-0.5">
                  <FieldLabel htmlFor="n-pinned" className="text-base font-medium">
                    Pin to Top
                  </FieldLabel>
                  <FieldDescription className="text-xs">
                    Pinned notices appear at the top of the board for everyone.
                  </FieldDescription>
                </div>
                <Controller
                  control={form.control}
                  name="isPinned"
                  render={({ field }) => (
                    <Switch
                      id="n-pinned"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={isLoading}
              loadingText="Creating..."
            >
              <Save />
              Publish Notice
            </Button>
          </div>
        </FieldGroup>
      </form>
    </ModalWrapper>
  );
}
