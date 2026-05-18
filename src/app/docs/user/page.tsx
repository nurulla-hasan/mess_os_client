import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  LayoutDashboard,
  MessageSquareWarning,
  Receipt,
  Calendar,
  UtensilsCrossed,
  Utensils,
  BookOpen,
  FileText,
  Bell,
  CreditCard,
  User,
  BarChart3,
  Info,
  Sparkles
} from "lucide-react";

export default function UserDocsPage() {
  const userModules = [
    {
      id: "dashboard",
      title: "1. Dashboard",
      icon: LayoutDashboard,
      badge: "Overview",
      description: "Your personalized home screen displaying your live meal count, current estimated monthly bill, and upcoming duty reminders.",
      features: [
        "Live financial summary: Net deposits, total estimated meal cost, and running balance.",
        "Meal booking status: Instantly view your meal booking status for today and tomorrow.",
        "Duty Alerts: Immediate notification banner when you are assigned to upcoming market duty."
      ],
      tip: "Keep an eye on your running balance widget to ensure your deposits cover your estimated monthly expenses."
    },
    {
      id: "meals",
      title: "2. Meals",
      icon: Utensils,
      badge: "Activities",
      description: "Verify your daily logged meal counts to ensure absolute billing accuracy.",
      features: [
        "Check daily recorded breakfast, lunch, and dinner counts logged against your name.",
        "Verify guest meal additions and custom feast multipliers.",
        "Instantly flag discrepancies to the manager if an incorrect meal count is logged."
      ],
      tip: "Check your meal log at the end of each week to ensure your consumption count is perfectly accurate."
    },
    {
      id: "meal-off-requests",
      title: "3. Meal Off Requests",
      icon: UtensilsCrossed,
      badge: "Activities",
      description: "Submit meal cancellation requests in advance when traveling, fasting, or dining out.",
      features: [
        "Select specific dates and meal slots (Breakfast, Lunch, or Dinner) to pause.",
        "Submit reasons for meal cancellation for manager review.",
        "Live status tracking: View when your request is Approved or Rejected."
      ],
      tip: "Submit your meal-off requests well before the manager's established daily booking cutoff time."
    },
    {
      id: "market-duties",
      title: "4. Market Duties",
      icon: Calendar,
      badge: "Activities",
      description: "Check your assigned bazaar duty dates, instructions, and grocery checklists.",
      features: [
        "View your upcoming scheduled market purchasing dates on the calendar.",
        "Access the exact shopping list prepared by the manager.",
        "Receive automated push reminders prior to your duty date."
      ],
      tip: "Coordinate with the mess cook the evening before your market duty to verify if any special spices or items are needed."
    },
    {
      id: "menu-plans",
      title: "5. Menu Plans",
      icon: BookOpen,
      badge: "Activities",
      description: "Check today's and this week's scheduled meal menu prepared by the manager.",
      features: [
        "View scheduled dishes for Breakfast, Lunch, and Dinner across all 7 days.",
        "Check special feast menus or weekend meal upgrades.",
        "Plan your meal-off requests based on upcoming menu preferences."
      ],
      tip: "Check the weekly menu on Sunday evenings so you know exactly what delicious meals are planned for the week."
    },
    {
      id: "payments-deposits",
      title: "6. Payments/Deposits",
      icon: CreditCard,
      badge: "Financial",
      description: "Submit digital payment proofs when transferring mess dues or cash deposits.",
      features: [
        "Submit transaction IDs for payments made via bKash, Nagad, Rocket, or Bank Transfer.",
        "Upload screenshot proof of mobile banking payment confirmations.",
        "Track verification status as the manager checks and approves your payment."
      ],
      tip: "Always double-check your transaction ID before submitting to ensure lightning-fast verification by the manager."
    },
    {
      id: "expenses",
      title: "7. Expenses",
      icon: Receipt,
      badge: "Financial",
      description: "Complete transparent view of all daily grocery and bazaar expenditures logged by the manager.",
      features: [
        "Browse daily expense records categorized by Vegetables, Meat, Grocery, or Utilities.",
        "Inspect attached photo receipts of market bills to verify exact prices.",
        "Filter expense logs by date or specific categories."
      ],
      tip: "Review daily grocery receipts regularly to stay informed about market pricing trends."
    },
    {
      id: "my-bill",
      title: "8. My Bill",
      icon: FileText,
      badge: "Financial",
      description: "Detailed, transparent breakdown of your monthly mess invoice and payable dues.",
      features: [
        "Clear formula display: (Total Consumed Meals × Meal Rate) + Equal Shared Overheads - Total Deposits.",
        "View itemized shared costs (e.g., your exact share of the cook salary and wifi bill).",
        "Download official PDF invoices for finalized billing cycles."
      ],
      tip: "Clear your net payable dues promptly after monthly billing finalization to maintain your account in good standing."
    },
    {
      id: "notices",
      title: "9. Notices",
      icon: Bell,
      badge: "Communications",
      description: "Official message board for manager announcements and urgent mess updates.",
      features: [
        "Read important notices regarding monthly meetings, feast dates, or rent deadlines.",
        "Priority indicators highlight urgent announcements requiring immediate attention.",
        "Search or filter past historical notices for reference."
      ],
      tip: "Turn on browser notifications so you never miss an urgent mess announcement."
    },
    {
      id: "complaints",
      title: "10. Complaints",
      icon: MessageSquareWarning,
      badge: "Communications",
      description: "Direct ticketing system to communicate grievances or maintenance requests to the mess manager.",
      features: [
        "Submit detailed complaints regarding food taste, kitchen hygiene, or room repairs.",
        "Track ticket status in real-time as the manager reviews and responds.",
        "Attach photo evidence of broken fixtures or plumbing issues."
      ],
      tip: "Provide clear details and photos when submitting maintenance issues so the manager can arrange timely repairs."
    },
    {
      id: "reports",
      title: "11. Reports",
      icon: BarChart3,
      badge: "Account",
      description: "Full transparency access to overall mess financial statements and audit summaries.",
      features: [
        "Review monthly income versus expenditure summaries for the entire mess.",
        "Audit grocery expense charts to see exactly how mess funds are distributed.",
        "Verify that equal share overhead calculations are perfectly accurate."
      ],
      tip: "Reviewing financial reports gives you complete confidence that every single taka in the mess is accounted for."
    },
    {
      id: "profile",
      title: "12. Profile",
      icon: User,
      badge: "Account",
      description: "Manage your personal contact info, emergency contacts, and account security.",
      features: [
        "Update your display name, mobile phone number, and profile picture.",
        "Set emergency contact details for medical or personal emergencies.",
        "Change your account password and manage active login sessions."
      ],
      tip: "Keep a high-quality profile picture so new roommates can easily recognize you."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Header */}
      <div className="border-b pb-6 space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <Users className="size-4" /> Member Manual
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Member Complete Guide
        </h1>
        <p className="text-muted-foreground text-base max-w-3xl leading-relaxed">
          As a mess member or roommate, Mess OS provides you with complete transparency over your daily meal counts, grocery receipts, and monthly bill calculations. Below is the comprehensive guide to all 12 member modules.
        </p>
      </div>

      {/* Quick Navigation Anchor Grid */}
      <div className="p-5 rounded-2xl bg-muted/40 border space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Info className="size-4 text-primary" /> Quick Jump to Section
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {userModules.map((m) => (
            <a 
              key={m.id} 
              href={`#${m.id}`}
              className="px-3 py-2 rounded-lg bg-background border hover:border-primary/50 hover:bg-primary/5 text-xs font-medium text-foreground transition-all flex items-center justify-between group"
            >
              <span className="truncate">{m.title}</span>
              <span className="text-xs bg-muted group-hover:bg-primary/10 group-hover:text-primary px-1.5 py-0.5 rounded ml-2 font-semibold">
                {m.badge}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Module List Section */}
      <div className="space-y-8">
        {userModules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} id={module.id} className="scroll-mt-28 border hover:border-primary/20 transition-all duration-300">
              <CardHeader className="space-y-2 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {module.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary font-bold px-2.5 py-0.5 text-xs">
                    {module.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {module.description}
                </p>
              </CardHeader>
              <Separator className="bg-border/60" />
              <CardContent className="pt-6 space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Key Features & Member Workflow
                  </h4>
                  <ul className="space-y-2">
                    {module.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tip Box */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                  <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Member Pro Tip
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {module.tip}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
