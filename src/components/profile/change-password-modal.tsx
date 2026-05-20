"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/services/auth.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<ChangePasswordFormValues>();

  const onSubmit = async (data: ChangePasswordFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      ErrorToast("New passwords do not match");
      return;
    }

    setLoading(true);
    const res = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    if (res.success) {
      SuccessToast("Password changed successfully");
      reset();
      setOpen(false);
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      actionTrigger={
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs font-bold hover:bg-primary/5 border-primary/10"
        >
          Change Password
        </Button>
      }
      title="Change Password"
      description="Enter your current password and a new password to update your security."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 max-h-[50vh] overflow-y-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="oldPassword">Current Password</Label>
          <Input
            id="oldPassword"
            type="password"
            {...register("oldPassword", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword", { required: true, minLength: 6 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} loadingText="Updating...">
            Update Password
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
