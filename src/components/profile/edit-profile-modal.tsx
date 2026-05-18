"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateMe } from "@/services/auth.service";
import { IUser } from "@/types/user.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";

interface EditProfileModalProps {
  user: IUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EditProfileFormValues {
  fullName: string;
  phone: string;
  address: string;
  bio: string;
}

export function EditProfileModal({
  user,
  open,
  onOpenChange,
}: EditProfileModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<EditProfileFormValues>({
    defaultValues: {
      fullName: user.fullName,
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    setLoading(true);
    const res = await updateMe(data);
    if (res.success) {
      SuccessToast("Profile updated successfully");
      onOpenChange(false);
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Make changes to your profile here. Click save when you're done."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 max-h-[50vh] overflow-y-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="Tell us a bit about yourself"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} loadingText="Saving...">
            Save Changes
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
