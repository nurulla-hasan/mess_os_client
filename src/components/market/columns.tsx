/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { format } from "date-fns";
import { IMarketSchedule } from "@/types/market-schedule.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpdateMarketScheduleModal } from "./update-market-schedule-modal";
import { ViewMarketScheduleModal } from "./view-market-schedule-modal";
import { CompleteMarketScheduleModal } from "./complete-market-schedule-modal";
import { updateMarketScheduleStatus } from "@/services/market-schedule.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { useRouter } from "next/navigation";

const MarketActionCell = ({ schedule }: { schedule: IMarketSchedule }) => {
  const router = useRouter();
  const [isVoidOpen, setIsVoidOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const handleVoid = async () => {
    setIsPending(true);
    try {
      const res = await updateMarketScheduleStatus(schedule.messId, schedule._id, {
        status: "void"
      });
      if (res?.success) {
        SuccessToast(res.message || "Schedule voided successfully.");
        setIsVoidOpen(false);
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to void schedule.");
      }
    } catch (error: any) {
      ErrorToast(error?.message || "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 px-2">
      {/* View Details Modal */}
      <ViewMarketScheduleModal schedule={schedule} />

      {schedule.status === "pending" && (
        <div className="flex items-center gap-1">
          {/* Update Modal */}
          <UpdateMarketScheduleModal
            messId={schedule.messId}
            schedule={schedule}
          />

          {/* Complete Action Modal */}
          <CompleteMarketScheduleModal
            messId={schedule.messId}
            schedule={schedule}
          />

          {/* Void Action Trigger */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setIsVoidOpen(true)}
            className="text-rose-600"
          >
            <Ban />
          </Button>

          <ConfirmationModal
            open={isVoidOpen}
            onOpenChange={setIsVoidOpen}
            trigger={null}
            title="Void Market Schedule"
            description="Are you sure you want to void this schedule? This action cannot be undone and will cancel this bazaar duty."
            confirmText="Void Schedule"
            variant="destructive"
            isLoading={isPending}
            onConfirm={handleVoid}
          />
        </div>
      )}
    </div>
  );
};

export const columns: ColumnDef<IMarketSchedule>[] = [
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {format(new Date(row.original.targetDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assignees",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {row.original.assignedTo.map((member) => (
            <Avatar
              key={member._id}
              className="h-7 w-7 border-2 border-background ring-offset-background"
            >
              <AvatarImage
                src={member.user.avatarUrl}
                alt={member.user.fullName}
              />
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                {member.user.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground truncate max-w-37.5">
          {row.original.assignedTo.map((m) => m.user.fullName).join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "shoppingItems",
    header: "Items",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-[10px]">
        {row.original.shoppingItems.length} Items
      </Badge>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          ৳{row.original.estimatedBudget}
        </span>
        {row.original.actualCost !== undefined && (
          <span className="text-xs text-muted-foreground uppercase">
            Spent: ৳{row.original.actualCost}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "void"
                ? "rejected"
                : "pending"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end px-4">Actions</div>,
    cell: ({ row }) => <MarketActionCell schedule={row.original} />,
  },
];
