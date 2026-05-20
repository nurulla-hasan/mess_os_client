"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { updateUtilityBill } from "@/services/utility.service";
import { IUtilityBill } from "@/types/utility.type";
import { cn, ErrorToast, SuccessToast } from "@/lib/utils";

interface EditUtilityBillModalProps {
  bill: IUtilityBill;
  messId: string;
}

const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export function EditUtilityBillModal({ bill, messId }: EditUtilityBillModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialDate = useMemo(
    () => (bill.dueDate ? new Date(bill.dueDate) : undefined),
    [bill.dueDate]
  );

  const [category, setCategory] = useState(bill.category);
  const [amount, setAmount] = useState(String(bill.amount));
  const [month, setMonth] = useState(String(bill.billingMonth));
  const [year, setYear] = useState(String(bill.year));
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !month || !year) {
      ErrorToast("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await updateUtilityBill(messId, bill._id, {
        category,
        amount: Number(amount),
        billingMonth: Number(month),
        year: Number(year),
        dueDate: date ? format(date, "yyyy-MM-dd") : undefined,
      });

      if (res.success) {
        SuccessToast("Utility bill updated successfully.");
        setOpen(false);
        router.refresh();
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error).message || "Failed to update utility bill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Edit Utility Bill"
      description="Update this unpaid utility bill before it is marked as paid."
      actionTrigger={
        <Button
          variant="outline"
          size="icon-sm"
          className="text-amber-500 hover:bg-amber-50 hover:text-amber-600"
          title="Edit Bill"
        >
          <Edit className="h-4 w-4" />
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="max-h-[50vh] overflow-y-auto px-6 py-4">
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`category-${bill._id}`} className="text-xs font-bold uppercase text-muted-foreground">
                Category
              </Label>
              <Input
                id={`category-${bill._id}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="internet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`amount-${bill._id}`} className="text-xs font-bold uppercase text-muted-foreground">
                Amount
              </Label>
              <Input
                id={`amount-${bill._id}`}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Billing Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`year-${bill._id}`} className="text-xs font-bold uppercase text-muted-foreground">
                Year
              </Label>
              <Input
                id={`year-${bill._id}`}
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-muted-foreground">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn("w-full justify-start text-left", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t pt-4">
          <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={loading}>
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
