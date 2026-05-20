"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Trash2, 
  Save, 
  Calendar as CalendarIcon, 
  ShoppingCart, 
  UserPlus,
  PackagePlus
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createMarketSchedule } from "@/services/market-schedule.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { getMessMemberOptions } from "@/services/mess.service";
import { IMemberOption } from "@/types/member.type";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// ============================================
// Sub-components (Memoized)
// ============================================

const ShoppingItemRow = React.memo(({ 
  item, 
  onUpdate, 
  onRemove, 
  canRemove 
}: { 
  item: ShoppingItem; 
  onUpdate: (id: string, field: "name" | "quantity", value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) => {
  return (
    <div className="flex gap-3 items-start group relative bg-muted p-2 rounded-md border border-dashed border-muted-foreground/20">
      <div className="flex-1 space-y-2">
        <Input 
          placeholder="Item name (e.g. Rice)" 
          value={item.name}
          onChange={(e) => onUpdate(item.id, "name", e.target.value)}
          className="h-8 text-sm focus-visible:ring-1"
        />
        <Input 
          placeholder="Quantity (e.g. 5kg)" 
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, "quantity", e.target.value)}
          className="h-8 text-sm focus-visible:ring-1"
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "h-8 w-8 text-muted-foreground hover:text-destructive transition-opacity",
          canRemove ? "opacity-100 md:opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => onRemove(item.id)}
        type="button"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});

ShoppingItemRow.displayName = "ShoppingItemRow";

const MemberRow = React.memo(({ 
  member, 
  isSelected, 
  onToggle 
}: { 
  member: IMemberOption; 
  isSelected: boolean; 
  onToggle: (id: string) => void;
}) => {
  return (
    <div className="flex items-center space-x-3 p-1 hover:bg-background/50 rounded transition-colors group">
      <Checkbox 
        id={member._id} 
        checked={isSelected}
        onCheckedChange={() => onToggle(member._id)}
      />
      <label 
        htmlFor={member._id} 
        className="text-sm cursor-pointer flex-1 py-1 group-hover:text-primary transition-colors"
      >
        {member.name}
      </label>
    </div>
  );
});

MemberRow.displayName = "MemberRow";

// ============================================
// Sub-components (Memoized)
// ============================================

// ... (Sub-components stay same)

// ============================================
// Types
// ============================================

interface CreateMarketScheduleModalProps {
  messId: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
}

// ============================================
// Main Component
// ============================================

export function CreateMarketScheduleModal({ messId }: CreateMarketScheduleModalProps) {
  const [members, setMembers] = React.useState<IMemberOption[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  // Fetch active members when modal opens
  React.useEffect(() => {
    if (!open) return;
    getMessMemberOptions(messId).then((res) => {
      if (res?.success) setMembers(res.data);
    });
  }, [open, messId]);

  const [assignedTo, setAssignedTo] = React.useState<string[]>([]);
  const [estimatedBudget, setEstimatedBudget] = React.useState<string>("");
  const [shoppingItems, setShoppingItems] = React.useState<ShoppingItem[]>([
    { id: Math.random().toString(), name: "", quantity: "" }
  ]);

  const addShoppingItem = React.useCallback(() => {
    setShoppingItems(prev => [...prev, { id: Math.random().toString(), name: "", quantity: "" }]);
  }, []);

  const removeShoppingItem = React.useCallback((id: string) => {
    setShoppingItems(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev);
  }, []);

  const updateShoppingItem = React.useCallback((id: string, field: "name" | "quantity", value: string) => {
    setShoppingItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  const toggleMember = React.useCallback((memberId: string) => {
    setAssignedTo(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId) 
        : [...prev, memberId]
    );
  }, []);

  const handleSubmit = async () => {
    if (assignedTo.length === 0) {
      ErrorToast("Please assign at least one member.");
      return;
    }

    const validItems = shoppingItems.filter(item => item.name.trim());
    if (validItems.length === 0) {
      ErrorToast("Please add at least one shopping item.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        assignedTo,
        targetDate: format(date, "yyyy-MM-dd"),
        estimatedBudget: parseFloat(estimatedBudget) || 0,
        shoppingItems: validItems.map(({ name, quantity }) => ({ name, quantity }))
      };

      const res = await createMarketSchedule(messId, payload);
      if (res?.success) {
        SuccessToast(res.message || "Market schedule created.");
        setOpen(false);
        // Reset state
        setAssignedTo([]);
        setEstimatedBudget("");
        setShoppingItems([{ id: Math.random().toString(), name: "", quantity: "" }]);
      } else {
        ErrorToast(res?.message || "Failed to create schedule.");
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
      title="Create Market Schedule"
      description="Plan bazaar duties and shopping lists for members."
      actionTrigger={
        <Button className="w-full sm:w-auto">
          <Plus /> Create Schedule
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6 max-h-[50vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-1">
          {/* Left Side: Assignees & Date */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" /> Target Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <UserPlus className="h-4 w-4 text-muted-foreground" /> Assign To
                </span>
                <Badge variant="secondary" className="text-xs font-normal">{assignedTo.length} Selected</Badge>
              </label>
              <div className="border rounded-md p-2">
                <ScrollArea className="h-48">
                  <div className="space-y-1">
                    {members.map((m) => (
                      <MemberRow 
                        key={m._id}
                        member={m}
                        isSelected={assignedTo.includes(m._id)}
                        onToggle={toggleMember}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-3">
                <span className="text-muted-foreground">৳</span> Estimated Budget
              </label>
              <Input 
                type="number" 
                placeholder="e.g. 1500" 
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side: Shopping List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-3">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" /> Shopping List
              </label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addShoppingItem}
                className="text-xs gap-1"
              >
                <PackagePlus className="h-3 w-3" /> Add Item
              </Button>
            </div>

            <ScrollArea className="h-80 pr-3">
              <div className="space-y-3 pb-2">
                {shoppingItems.map((item) => (
                  <ShoppingItemRow 
                    key={item.id}
                    item={item}
                    onUpdate={updateShoppingItem}
                    onRemove={removeShoppingItem}
                    canRemove={shoppingItems.length > 1}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-auto">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={isLoading}
            loadingText="Saving..."
          >
            <Save /> Save Schedule
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
