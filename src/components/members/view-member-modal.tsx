"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IMember } from "@/types/member.type";
import {
  Calendar,
  Shield,
  CreditCard,
  Phone,
  LucideIcon,
  Eye,
  UtensilsCrossed,
  DollarSign,
  Building2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { updateMemberParticipation, requestResidentToggle, acceptResidentToggle, getPendingToggleRequests } from "@/services/mess.service";
import { getMe } from "@/services/auth.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface ViewMemberModalProps {
  member: IMember;
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined;
  subValue?: string;
}

const DetailItem = ({
  icon: Icon,
  label,
  value,
  subValue,
}: DetailItemProps) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-muted">
    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center text-muted-foreground border shrink-0">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground truncate">
        {value || "N/A"}
      </span>
      {subValue && (
        <span className="text-xs text-muted-foreground truncate">
          {subValue}
        </span>
      )}
    </div>
  </div>
);

export function ViewMemberModal({ member }: ViewMemberModalProps) {
  const [open, setOpen] = React.useState(false);
  const [currentMemberId, setCurrentMemberId] = React.useState<string | undefined>(undefined);
  const [meals, setMeals] = React.useState(member.participation?.meals ?? true);
  const [sharedExpenses, setSharedExpenses] = React.useState(member.participation?.sharedExpenses ?? true);
  const [saving, setSaving] = React.useState(false);
  const [pendingRequest, setPendingRequest] = React.useState<{
    _id: string;
    acceptedBy: { _id: string }[];
  } | null>(null);
  const [loadingRequest, setLoadingRequest] = React.useState(true);

  // Fetch current user's member ID on mount
  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getMe();
        const user = res?.data as { _id: string; memberships?: { _id: string; messId: string | { _id: string } }[] } | undefined;
        if (user?.memberships) {
          const activeMessId = member.messId;
          const found = user.memberships.find((m) => {
            const mId = typeof m.messId === "string" ? m.messId : m.messId?._id;
            return mId === activeMessId;
          });
          if (found?._id) {
            setCurrentMemberId(found._id);
          }
        }
      } catch {
        // fail silently
      }
    };
    fetchCurrentUser();
  }, [member.messId]);

  const isOwnProfile = member._id === currentMemberId;
  const isCurrentlyResident = member.isResidentManager !== false;
  const acceptCount = pendingRequest?.acceptedBy?.length ?? 0;
  const alreadyAccepted = pendingRequest?.acceptedBy?.some((a) => a._id === currentMemberId);

  // Fetch pending request when modal opens
  React.useEffect(() => {
    if (open && member.messRole === "manager") {
      getPendingToggleRequests(member.messId)
        .then((res) => {
          if (res.success && Array.isArray(res.data)) {
            const found = (res.data as { _id: string; managerId?: string | { _id: string }; acceptedBy: { _id: string }[] }[]).find(
              (r) => {
                const mgrId = typeof r.managerId === "string" ? r.managerId : r.managerId?._id;
                return mgrId === member._id;
              }
            );
            setPendingRequest(found ?? null);
          }
        })
        .finally(() => setLoadingRequest(false));
    }
  }, [open, member.messId, member._id, member.messRole]);

  const handleRequestToggle = async () => {
    setSaving(true);
    try {
      const res = await requestResidentToggle(member.messId, member._id);
      if (res.success) {
        const data = res.data as { instant?: boolean } | null;
        if (data?.instant) {
          SuccessToast("You are now set as Resident and included in billing.");
        } else {
          SuccessToast("Request sent! Waiting for member approvals.");
        }
        // Refresh pending request
        const refresh = await getPendingToggleRequests(member.messId);
        if (refresh.success && Array.isArray(refresh.data)) {
          const found = (refresh.data as { _id: string; managerId?: string | { _id: string }; acceptedBy: { _id: string }[] }[]).find(
            (r) => {
              const mgrId = typeof r.managerId === "string" ? r.managerId : r.managerId?._id;
              return mgrId === member._id;
            }
          );
          setPendingRequest(found ?? null);
        }
      } else {
        ErrorToast(res.message || "Failed to send request");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleAcceptRequest = async () => {
    if (!pendingRequest) return;
    setSaving(true);
    try {
      const res = await acceptResidentToggle(member.messId, pendingRequest._id);
      if (res.success) {
        const data = res.data as { approved?: boolean } | null;
        if (data?.approved) {
          SuccessToast("Request approved! Manager has been set as External.");
          setPendingRequest(null);
        } else {
          SuccessToast(res.message || "You accepted the request!");
          // Refresh to update the count
          const refresh = await getPendingToggleRequests(member.messId);
          if (refresh.success && Array.isArray(refresh.data)) {
            const found = (refresh.data as { _id: string; managerId?: string | { _id: string }; acceptedBy: { _id: string }[] }[]).find(
              (r) => {
                const mgrId = typeof r.managerId === "string" ? r.managerId : r.managerId?._id;
                return mgrId === member._id;
              }
            );
            setPendingRequest(found ?? null);
          }
        }
      } else {
        ErrorToast(res.message || "Failed to accept request");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveParticipation = async () => {
    setSaving(true);
    try {
      const res = await updateMemberParticipation(member.messId, member._id, {
        meals,
        sharedExpenses,
      });
      if (res.success) {
        SuccessToast("Participation updated successfully");
      } else {
        ErrorToast(res.message || "Failed to update participation");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Member Profile"
      description="Detailed view of the community member's information."
      showClose
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="p-6 max-h-[50vh] overflow-y-auto">
        <div className="flex flex-col items-center py-6 border-b">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-3 border-2 border-primary/20 shrink-0">
            {member.user.fullName.charAt(0)}
          </div>
          <h3 className="text-xl font-bold truncate max-w-full">
            {member.user.fullName}
          </h3>
          <p className="text-sm text-muted-foreground truncate max-w-full">
            {member.user.email}
          </p>
          <div className="mt-4 flex gap-3 items-center">
            <Badge
              variant={member.messRole === "manager" ? "manager" : "member"}
              className="px-3"
            >
              {member.messRole.toUpperCase()}
            </Badge>
            <Badge
              variant={
                member.status === "active"
                  ? "active"
                  : member.status === "pending"
                    ? "pending"
                    : "rejected"
              }
            >
              {member.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <DetailItem icon={Phone} label="Phone" value={member.user.phone} />
          <DetailItem
            icon={Calendar}
            label="Joined/Requested"
            value={format(new Date(member.createdAt), "MMM dd, yyyy")}
            subValue={
              member.joinedAt
                ? `Official: ${format(new Date(member.joinedAt), "MMM dd")}`
                : undefined
            }
          />
          <DetailItem
            icon={CreditCard}
            label="Due Amount"
            value={`৳${member.dueAmount || 0}`}
            subValue="Pending balance"
          />
          <DetailItem
            icon={Shield}
            label="Advance"
            value={`৳${member.advanceAmount || 0}`}
            subValue="Credit balance"
          />
        </div>

        {member.leftAt && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-100 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-rose-600 border shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-rose-600 uppercase er">
                Left On
              </span>
              <span className="text-sm font-bold text-rose-900 truncate">
                {format(new Date(member.leftAt), "PPP")}
              </span>
            </div>
          </div>
        )}

        {/* Resident Status - only for active managers */}
        {member.status === "active" && member.messRole === "manager" && (
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Manager Type
            </h4>

            {/* Current status badge */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={isCurrentlyResident ? "active" : "muted"} className="font-medium">
                {isCurrentlyResident ? "Resident" : "External"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {isCurrentlyResident
                  ? "Included in billing (meals & shared expenses)"
                  : "Excluded from billing"}
              </span>
            </div>

            {/* Self (manager viewing own profile) */}
            {isOwnProfile && (
              <div className="space-y-2">
                {pendingRequest ? (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="text-xs font-medium text-amber-800 mb-1">
                      Request Pending — {acceptCount}/3 approvals
                    </p>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((acceptCount / 3) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-amber-600 mt-1">
                      Waiting for members to approve your request to go External.
                    </p>
                  </div>
                ) : isCurrentlyResident ? (
                  <Button
                    size="sm"
                    className="w-full"
                    variant="outline"
                    onClick={handleRequestToggle}
                    loading={saving}
                    loadingText="Sending request..."
                  >
                    Request to Go External
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={handleRequestToggle}
                    loading={saving}
                    loadingText="Reverting..."
                  >
                    Revert to Resident
                  </Button>
                )}
              </div>
            )}

            {/* Member viewing manager's profile */}
            {!isOwnProfile && pendingRequest && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Requesting to go External ({acceptCount}/3 approved)
                </div>
                {alreadyAccepted ? (
                  <p className="text-xs text-emerald-600 font-medium">You accepted this request ✓</p>
                ) : (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={handleAcceptRequest}
                    loading={saving}
                    loadingText="Accepting..."
                    disabled={loadingRequest}
                  >
                    Accept Request
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Participation Settings - only for active non-manager members */}
        {member.status === "active" && member.messRole !== "manager" && (
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Participation Settings
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Meals</span>
                </div>
                <Switch
                  checked={meals}
                  onCheckedChange={setMeals}
                  disabled={saving}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Shared Expenses</span>
                </div>
                <Switch
                  checked={sharedExpenses}
                  onCheckedChange={setSharedExpenses}
                  disabled={saving}
                />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full mt-3"
              onClick={handleSaveParticipation}
              loading={saving}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
