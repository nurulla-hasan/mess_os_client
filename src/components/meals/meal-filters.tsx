"use client";

import { SearchInput } from "@/components/ui/custom/search-input";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function MealFilters() {
  const { getFilter, updateBatch } = useSmartFilter();
  
  const startDate = getFilter("start");
  const currentDate = startDate ? new Date(startDate) : new Date();

  const handleMonthChange = (newDate: Date) => {
    const start = startOfMonth(newDate);
    const end = endOfMonth(newDate);
    
    updateBatch({
      start: format(start, "yyyy-MM-dd"),
      end: format(end, "yyyy-MM-dd")
    });
  };

  const nextMonth = () => handleMonthChange(addMonths(currentDate, 1));
  const prevMonth = () => handleMonthChange(subMonths(currentDate, 1));

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search members ..." 
      />
      
      <div className="flex items-center gap-1.5 bg-muted p-0.5 rounded-md border shadow-sm backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={prevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
            >
              <CalendarIcon className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent whitespace-nowrap">
                {format(currentDate, "MMMM yyyy")}
              </span>
              {format(currentDate, "MM-yyyy") === format(new Date(), "MM-yyyy") && (
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48 p-1">
            <div className="grid grid-cols-1 gap-1">
              {Array.from({ length: 12 }).map((_, i) => {
                const monthDate = new Date(currentDate.getFullYear(), i, 1);
                const isActive = format(currentDate, "MM") === format(monthDate, "MM");
                return (
                  <DropdownMenuItem 
                    key={i} 
                    className={cn(
                      "flex items-center justify-between cursor-pointer rounded-md px-3 py-2",
                      isActive && "bg-primary/10 text-primary font-bold"
                    )}
                    onClick={() => handleMonthChange(monthDate)}
                  >
                    {format(monthDate, "MMMM")}
                    {format(monthDate, "MM-yyyy") === format(new Date(), "MM-yyyy") && (
                      <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm font-bold border border-emerald-500/20">TODAY</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={nextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
