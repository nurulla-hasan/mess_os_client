"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save, Calendar as CalendarIcon, Wallet, ReceiptText, User } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getMessMemberOptions } from "@/services/mess.service";
import { createExpense } from "@/services/expense.service";
import { SuccessToast, ErrorToast, formatDate } from "@/lib/utils";
import { IMemberOption } from "@/types/member.type";
import { CreateExpensePayload, FundSource } from "@/types/expense.type";

interface CreateExpenseModalProps {
  messId: string;
  mode?: "manager" | "member";
}

export function CreateExpenseModal({ messId, mode = "manager" }: CreateExpenseModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [members, setMembers] = React.useState<IMemberOption[]>([]);
  
  const [formData, setFormData] = React.useState<CreateExpensePayload>({
    category: "",
    amount: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    fundSource: "mess_cash",
    paidBy: "",
    receiptUrl: "",
  });

  React.useEffect(() => {
    if (open && messId && mode === "manager") {
      const fetchMembers = async () => {
        const res = await getMessMemberOptions(messId);
        if (res?.success) {
          setMembers(res.data);
        }
      };
      fetchMembers();
    }
  }, [open, messId, mode]);

  const handleSubmit = async () => {
    if (!formData.category || formData.amount <= 0) {
      ErrorToast("Please fill in category and valid amount.");
      return;
    }

    if (formData.receiptUrl && !formData.receiptUrl.startsWith("http")) {
      ErrorToast("Please enter a valid URL for the receipt (starting with http/https).");
      return;
    }

    setIsLoading(true);
    try {
      const payload: CreateExpensePayload = {
        ...formData,
        // If mode is member or paidBy is empty/all, omit it so backend defaults to self
        paidBy: (mode === "manager" && formData.paidBy && formData.paidBy !== "all") ? formData.paidBy : undefined,
        amount: Number(formData.amount),
        receiptUrl: formData.receiptUrl?.trim() || undefined,
      };

      const res = await createExpense(messId, payload);
      if (res?.success) {
        SuccessToast(res.message || "Expense created successfully.");
        setOpen(false);
        setFormData({
          category: "",
          amount: 0,
          date: format(new Date(), "yyyy-MM-dd"),
          fundSource: "mess_cash",
          paidBy: "",
          receiptUrl: "",
        });
      } else {
        ErrorToast(res?.message || "Failed to create expense.");
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
      title="Create New Expense"
      description="Log a new expenditure for the mess. Expenses are subject to approval."
      actionTrigger={
        <Button className="shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> Add Expense
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-5 max-h-[50vh] overflow-y-auto">
        {/* Category & Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Category</label>
            <Input 
              placeholder="e.g. Grocery, Electricity" 
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Amount (৳)</label>
            <Input 
              type="number"
              placeholder="0.00" 
              value={formData.amount || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
            />
          </div>
        </div>

        {/* Date & Fund Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? formatDate(formData.date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(formData.date)}
                  onSelect={(d) => d && setFormData(prev => ({ ...prev, date: format(d, "yyyy-MM-dd") }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Fund Source</label>
            <Select 
              value={formData.fundSource}
              onValueChange={(val: FundSource) => setFormData(prev => ({ ...prev, fundSource: val }))}
            >
              <SelectTrigger>
                <Wallet className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mess_cash">Mess Cash</SelectItem>
                <SelectItem value="personal_cash">Personal Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Manager Only: Paid By */}
        {mode === "manager" && (
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-medium">Paid By (Optional)</label>
            <Select 
              value={formData.paidBy}
              onValueChange={(val) => setFormData(prev => ({ ...prev, paidBy: val }))}
            >
              <SelectTrigger>
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Myself" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Myself (Default)</SelectItem>
                {members.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">Omit to log as your own expense.</p>
          </div>
        )}

        {/* Receipt URL */}
        <div className="flex flex-col gap-2 text-left">
          <label className="text-sm font-medium flex items-center gap-2">
            <ReceiptText className="h-4 w-4" /> Receipt URL (Optional)
          </label>
          <Input 
            placeholder="https://example.com/receipt.jpg" 
            value={formData.receiptUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, receiptUrl: e.target.value }))}
          />
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
            <Save /> Save Expense
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
