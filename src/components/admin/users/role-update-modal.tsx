"use client";

import React from "react";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IUser, GlobalRole } from "@/types/user.type";
import { updateUserRole } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface RoleUpdateModalProps {
  user: IUser;
}

export function RoleUpdateModal({ user }: RoleUpdateModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [role, setRole] = React.useState<GlobalRole>(user.globalRole);
  const router = useRouter();

  const handleUpdate = async () => {
    if (role === user.globalRole) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUserRole(
        user._id as string,
        role,
      );
      if (response?.success) {
        SuccessToast(response.message || "Role updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        ErrorToast(response?.message || "Failed to update role.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Update Global Role"
      description={`Change platform-wide permissions for ${user.fullName}.`}
      actionTrigger={
        <Button
          variant="outline"
          size="icon-sm"
          className="text-blue-600"
        >
          <Shield />
        </Button>
      }
    >
      <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Select New Role
          </label>
          <Select value={role} onValueChange={(v) => setRole(v as GlobalRole)}>
            <SelectTrigger className="w-full bg-muted">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" className="text-xs">
                User (Default)
              </SelectItem>
              <SelectItem value="manager" className="text-xs">
                Manager
              </SelectItem>
              <SelectItem value="super_admin" className="text-xs">
                Super Admin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            loadingText="Updating..."
            size="sm"
            onClick={handleUpdate}
            loading={isLoading}
            disabled={role === user.globalRole}
          >
            Update Role
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
