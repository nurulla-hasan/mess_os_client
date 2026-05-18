"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Save, Pencil } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateNotice } from "@/services/notice.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { INotice } from "@/types/notice.type";

const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Title cannot exceed 120 characters"),
  content: z.string().min(1, "Content is required").max(5000, "Content cannot exceed 5000 characters"),
  isPinned: z.boolean().optional(),
  status: z.enum(["active", "archived"]),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

interface EditNoticeModalProps {
  notice: INotice;
}

export function EditNoticeModal({ notice }: EditNoticeModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned,
      status: notice.status,
    },
  });

  const { errors } = form.formState;

  const onSubmit: SubmitHandler<NoticeFormValues> = async (values) => {
    setIsLoading(true);
    try {
      // If status is changed to archived, ensure isPinned is false
      const payload = {
        ...values,
        isPinned: values.status === "archived" ? false : values.isPinned,
      };

      const res = await updateNotice(notice.messId, notice._id, payload);
      if (res?.success) {
        SuccessToast(res.message || "Notice updated successfully.");
        setOpen(false);
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to update notice.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) ErrorToast(error.message);
      else ErrorToast("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Edit Notice"
      description="Modify the announcement details or visibility."
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Pencil />
        </Button>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 max-h-[50vh] overflow-y-auto">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Notice Details</FieldLegend>
            <FieldGroup>
              <Field data-invalid={!!errors.title}>
                <FieldLabel htmlFor="edit-title">Notice Title</FieldLabel>
                <Input id="edit-title" {...form.register("title")} />
                <FieldError errors={[errors.title]} />
              </Field>

              <Field data-invalid={!!errors.content}>
                <FieldLabel htmlFor="edit-content">Content</FieldLabel>
                <Textarea 
                  id="edit-content"
                  className="min-h-32 resize-none"
                  {...form.register("content")} 
                />
                <FieldError errors={[errors.content]} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                orientation="horizontal"
                className="justify-between rounded-lg border p-4 bg-muted/30"
              >
                <FieldLabel htmlFor="edit-pinned" className="text-sm font-medium">
                  Pinned
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="isPinned"
                  render={({ field }) => (
                    <Switch
                      id="edit-pinned"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.watch("status") === "archived"}
                    />
                  )}
                />
              </Field>

              <Field
                orientation="horizontal"
                className="justify-between rounded-lg border p-4 bg-muted/30"
              >
                <FieldLabel htmlFor="edit-status" className="text-sm font-medium">
                  Archived
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Switch
                      id="edit-status"
                      checked={field.value === "archived"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "archived" : "active");
                        if (checked) form.setValue("isPinned", false);
                      }}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading} loadingText="Saving...">
              <Save />
              Save Changes
            </Button>
          </div>
        </FieldGroup>
      </form>
    </ModalWrapper>
  );
}
