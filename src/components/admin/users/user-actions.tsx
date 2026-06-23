"use client";

import React from "react";
import { Ban, Trash2, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateUserStatus, deleteUserPermanently } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

// Sub-components
import { UserDetailsModal } from "./user-details-modal";
import { RoleUpdateModal } from "./role-update-modal";

/**
 * Main Action Buttons Component for Data Table
 * Coordinates View Details, Role Update, Status Toggle (Block/Unblock), and Delete User
 */
export function ActionButtons({ user }: { user: IUser }) {
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    const newStatus = user.status === "active" ? "blocked" : "active";
    
    try {
      const response = await updateUserStatus(user._id as string, newStatus);
      if (response?.success) {
        SuccessToast(response.message || `User ${newStatus} successfully!`);
        setIsStatusModalOpen(false);
        router.refresh();
      } else {
        ErrorToast(response?.message || "Failed to update status.");
      }
    } catch  {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await deleteUserPermanently(user._id as string);
      if (response?.success) {
        SuccessToast(response.message || "User deleted successfully!");
        setIsDeleteModalOpen(false);
        router.refresh();
      } else {
        ErrorToast(response?.message || "Failed to delete user.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent deleting super_admin accounts
  const isSuperAdmin = user.globalRole === "super_admin";

  return (
    <div className="flex items-center justify-end gap-1">
      {/* View Details Action */}
      <UserDetailsModal user={user} />

      {/* Global Role Update Action */}
      <RoleUpdateModal user={user} />

      {/* Account Status Toggle Action (Block/Unblock) */}
      <ConfirmationModal
        open={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
        title={user.status === "active" ? "Block User" : "Unblock User"}
        description={
          user.status === "active"
            ? `Are you sure you want to block ${user.fullName}? They will lose access to the platform.`
            : `Are you sure you want to unblock ${user.fullName}? They will regain access to the platform.`
        }
        confirmText={user.status === "active" ? "Block User" : "Unblock User"}
        loadingText={user.status === "active" ? "Blocking..." : "Unblocking..."}
        cancelText="Cancel"
        onConfirm={handleStatusUpdate}
        isLoading={isLoading}
        variant={user.status === "active" ? "destructive" : "default"}
        actionTrigger={
          <Button 
            variant="outline" 
            size="icon-sm" 
            className={user.status === "active" ? "text-rose-600" : "text-emerald-600"}
          >
            {user.status === "active" ? (
              <Ban />
            ) : (
              <UserCheck />
            )}
          </Button>
        }
      />

      {/* Delete User Action (hidden for super_admin) */}
      {!isSuperAdmin && (
        <ConfirmationModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="Delete User"
          description={`Are you sure you want to permanently delete ${user.fullName}? This action cannot be undone. If they are a sole manager of a mess, that entire mess and all its data will also be deleted.`}
          confirmText="Delete User"
          loadingText="Deleting..."
          cancelText="Cancel"
          onConfirm={handleDeleteUser}
          isLoading={isLoading}
          variant="destructive"
          actionTrigger={
            <Button variant="outline" size="icon-sm" className="text-rose-600">
              <Trash2 />
            </Button>
          }
        />
      )}
    </div>
  );
}
