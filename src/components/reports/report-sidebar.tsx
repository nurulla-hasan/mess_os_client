"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Filter, 
  BarChart3, 
  FileText, 
  Wallet, 
  ArrowUpRight,
  PieChart
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReportSidebarProps {
  activeType: string;
  role: "manager" | "member";
}

export function ReportSidebar({ activeType, role }: ReportSidebarProps) {
  const isManager = role === "manager";

  const reportTypes = [
    {
      id: "summary",
      label: "Overview Summary",
      icon: BarChart3,
      description: "Mess operational overview",
    },
    {
      id: "statement",
      label: isManager ? "Member Statement" : "My Statement",
      icon: FileText,
      description: "Personal ledger & finalizations",
    },
    {
      id: "expenses",
      label: isManager ? "Expenses Report" : "My Expenses",
      icon: Wallet,
      description: "Detailed expense records",
    },
    {
      id: "payments",
      label: isManager ? "Payments Report" : "My Payments",
      icon: ArrowUpRight,
      description: "Detailed payment history",
    },
    {
      id: "financial",
      label: "Financial Report",
      icon: PieChart,
      description: "Monthly financial breakdown",
      managerOnly: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          Select Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          {reportTypes.map((item) => (
            <Link
              key={item.id}
              href={`?type=${item.id}`}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md transition-all duration-200 group",
                activeType === item.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 shrink-0",
                activeType === item.id ? "text-primary-foreground" : "text-primary group-hover:scale-110 transition-transform"
              )} />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold leading-none">{item.label}</span>
                <span className={cn(
                  "text-xs mt-1 truncate",
                  activeType === item.id ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {item.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
