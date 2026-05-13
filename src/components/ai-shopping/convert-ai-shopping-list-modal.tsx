"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { convertAiShoppingListToSchedule } from "@/services/ai-shopping.service";
import { getMessMemberOptions } from "@/services/mess.service";
import { IMemberOption } from "@/types/member.type";
import { IAiShoppingList } from "@/types/ai-shopping.type";
import { ShoppingCart, UserPlus, Wallet } from "lucide-react";

interface ConvertAiShoppingListModalProps {
  list: IAiShoppingList;
}

export function ConvertAiShoppingListModal({ list }: ConvertAiShoppingListModalProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [members, setMembers] = React.useState<IMemberOption[]>([]);
  const [assignedTo, setAssignedTo] = React.useState<string[]>([]);
  const [estimatedBudget, setEstimatedBudget] = React.useState("");
  React.useEffect(() => {
    if (!open) return;
    getMessMemberOptions(list.messId).then((res) => {
      if (res?.success) setMembers(res.data);
    });
  }, [open, list.messId]);
  const toggleMember = React.useCallback((memberId: string) => {
    setAssignedTo((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  }, []);

  const handleConvert = async () => {
    if (assignedTo.length === 0) {
      ErrorToast("Please assign at least one member.");
      return;
    }

    const budget = Number(estimatedBudget);
    if (!budget || budget <= 0) {
      ErrorToast("Please enter a valid estimated budget.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await convertAiShoppingListToSchedule(list.messId, list._id, {
        assignedTo,
        estimatedBudget: budget,
      });

      if (res.success) {
        SuccessToast(res.message || "Converted to market schedule.");
        setOpen(false);
        setAssignedTo([]);
        setEstimatedBudget("");
        router.refresh();
      } else {
        ErrorToast(res.message || "Failed to convert list.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Convert to Market Schedule"
      description="Assign duties and create a pending market schedule from this approved list."
      actionTrigger={
        <Button variant="outline" size="icon-sm" className="text-primary font-bold">
          <ShoppingCart />
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="rounded-lg border bg-muted/40 p-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">{list.items.length} shopping items</p>
            <p className="text-xs text-muted-foreground">Items will be copied into the new schedule.</p>
          </div>
          <Badge variant="info">approved</Badge>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-muted-foreground" /> Assign To
            </span>
            <Badge variant="secondary" className="text-xs font-normal">{assignedTo.length} Selected</Badge>
          </label>
          <div className="border rounded-md p-2">
            <ScrollArea className="h-48">
              <div className="space-y-1">
                {members.map((member) => (
                  <div key={member._id} className="flex items-center space-x-3 p-1 hover:bg-background/50 rounded transition-colors">
                    <Checkbox
                      id={`convert-${list._id}-${member._id}`}
                      checked={assignedTo.includes(member._id)}
                      onCheckedChange={() => toggleMember(member._id)}
                    />
                    <label htmlFor={`convert-${list._id}-${member._id}`} className="text-sm cursor-pointer flex-1 py-1">
                      {member.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" /> Estimated Budget
          </label>
          <Input
            type="number"
            min="1"
            placeholder="e.g. 1800"
            value={estimatedBudget}
            onChange={(event) => setEstimatedBudget(event.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleConvert} disabled={isLoading} loading={isLoading} loadingText="Converting...">
            Convert
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}