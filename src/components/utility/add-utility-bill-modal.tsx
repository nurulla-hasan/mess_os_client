"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { createUtilityBill } from "@/services/utility.service";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddUtilityBillModalProps {
  messId: string;
  dynamicCategories: string[];
}

export function AddUtilityBillModal({ messId, dynamicCategories }: AddUtilityBillModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState<string>(dynamicCategories[0] || "others");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [date, setDate] = useState<Date | undefined>(new Date());

  const months = [
    { label: "January", value: "1" }, { label: "February", value: "2" },
    { label: "March", value: "3" }, { label: "April", value: "4" },
    { label: "May", value: "5" }, { label: "June", value: "6" },
    { label: "July", value: "7" }, { label: "August", value: "8" },
    { label: "September", value: "9" }, { label: "October", value: "10" },
    { label: "November", value: "11" }, { label: "December", value: "12" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !category) {
      ErrorToast("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await createUtilityBill(messId, {
        category,
        amount: parseFloat(amount),
        billingMonth: parseInt(month),
        year: parseInt(year),
        dueDate: format(date, "yyyy-MM-dd")
      });

      if (res.success) {
        SuccessToast("Utility bill created successfully.");
        setOpen(false);
        router.refresh();
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Add Utility Bill"
      description="Enter the details for the new utility bill. This will be visible to all members."
      actionTrigger={
        <Button>
          <Plus />
          Add Utility Bill
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="px-6 py-4 max-h-[50vh] overflow-y-auto">
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs font-bold uppercase text-muted-foreground">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="capitalize">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicCategories.length > 0 ? (
                    dynamicCategories.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">
                        {c}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="others">Others</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase text-muted-foreground">Amount (৳)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="2200" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month" className="text-xs font-bold uppercase text-muted-foreground">Billing Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger id="month">
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
              <Label htmlFor="year" className="text-xs font-bold uppercase text-muted-foreground">Year</Label>
              <Input 
                id="year" 
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
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8 border-t pt-4">
          <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button loading={loading} loadingText="Creating Bill..." type="submit" >
            Create Bill
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
