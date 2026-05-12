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
} from "lucide-react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";

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
      <div className="p-6">
        <div className="flex flex-col items-center py-6 border-b">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-black mb-3 border-2 border-primary/20 shrink-0">
            {member.user.fullName.charAt(0)}
          </div>
          <h3 className="text-xl font-bold truncate max-w-full">
            {member.user.fullName}
          </h3>
          <p className="text-sm text-muted-foreground truncate max-w-full">
            {member.user.email}
          </p>
          <div className="mt-4 flex gap-2 items-center">
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
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-tighter">
                Left On
              </span>
              <span className="text-sm font-bold text-rose-900 truncate">
                {format(new Date(member.leftAt), "PPP")}
              </span>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
