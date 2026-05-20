"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquarePlus } from "lucide-react";
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
import { createComplaint } from "@/services/complaint.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const complaintSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Title cannot exceed 120 characters"),
  description: z.string().min(1, "Description is required").max(5000, "Description cannot exceed 5000 characters"),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

interface CreateComplaintModalProps {
  messId: string;
}

export function CreateComplaintModal({ messId }: CreateComplaintModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit: SubmitHandler<ComplaintFormValues> = async (values) => {
    setIsLoading(true);
    try {
      const res = await createComplaint(messId, values);
      if (res?.success) {
        SuccessToast(res.message || "Complaint submitted successfully.");
        setOpen(false);
        form.reset();
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to submit complaint.");
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
      title="Submit a Complaint"
      description="Report an issue or concern to the mess management."
      actionTrigger={
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          New Complaint
        </Button>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 max-h-[50vh] overflow-y-auto">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Complaint Information</FieldLegend>
            <FieldGroup>
              <Field data-invalid={!!errors.title}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input 
                  id="title" 
                  placeholder="e.g., Kitchen tap leaking"
                  {...form.register("title")} 
                />
                <FieldError errors={[errors.title]} />
              </Field>

              <Field data-invalid={!!errors.description}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea 
                  id="description"
                  placeholder="Provide details about the issue..."
                  className="min-h-32 resize-none"
                  {...form.register("description")} 
                />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading} loadingText="Submitting...">
              <MessageSquarePlus />
              Submit Complaint
            </Button>
          </div>
        </FieldGroup>
      </form>
    </ModalWrapper>
  );
}
