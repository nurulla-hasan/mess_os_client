import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  LayoutDashboard,
  Calculator,
  MessageSquareWarning,
  Coins,
  Receipt,
  Calendar,
  UtensilsCrossed,
  Utensils,
  Users,
  BookOpen,
  Settings,
  Bell,
  CheckCircle2,
  User,
  BarChart3,
  Sparkles,
  Zap,
  Info,
  Layers
} from "lucide-react";

export default function ManagerDocsPage() {
  const managerModules = [
    {
      id: "dashboard",
      title: "1. Dashboard Overview",
      icon: LayoutDashboard,
      badge: "Core",
      description: "The central command center providing live statistical summaries of the active billing cycle.",
      features: [
        "Live financial metrics: Total collections, total grocery expenses, and current estimated meal rate.",
        "Pending action widgets: Instant alerts for pending member join requests and meal-off requests.",
        "Quick navigation shortcuts to easily log daily meals or record new bazaar expenses."
      ],
      tip: "Check your dashboard first thing in the morning to approve pending meal-off requests before the daily cutoff."
    },
    {
      id: "ai-shopping",
      title: "2. AI Shopping Assistant & Bazaar List",
      icon: Sparkles,
      badge: "AI Powered",
      description: "Smart algorithmic grocery planning and recipe recommendations based on your current member headcount.",
      features: [
        "Automated generation of required grocery items and estimated market budget.",
        "Smart menu suggestions tailored to seasonal vegetable availability and mess budget.",
        "Exportable bazaar checklist for the assigned market duty member."
      ],
      tip: "Use AI shopping suggestions when planning weekly menus to optimize ingredient usage and reduce wastage."
    },
    {
      id: "billing",
      title: "3. Monthly Billing & Invoices",
      icon: Calculator,
      badge: "Financial",
      description: "Automated monthly accounting, meal rate calculation, and member invoice generation.",
      features: [
        "Create, manage, and finalize monthly billing cycles (e.g., May 2026).",
        "Automated meal rate formula: (Total Grocery Expense ÷ Total Consumed Meals).",
        "Overhead division: Automatically divides fixed shared expenses (cook salary, wifi) equally among all active members.",
        "Member invoice calculation: Total Meal Cost + Equal Share Cost - Total Member Deposits = Net Payable/Receivable."
      ],
      tip: "Always verify all meal logs and expense receipts before clicking 'Finalize Cycle' at the end of the month."
    },
    {
      id: "complaints",
      title: "4. Complaints Management",
      icon: MessageSquareWarning,
      badge: "Management",
      description: "A transparent ticketing system for members to raise issues regarding food quality, hygiene, or maintenance.",
      features: [
        "Real-time ticket queue categorized by status: Pending, In Progress, or Resolved.",
        "Direct communication channel to respond to member grievances with manager notes.",
        "Priority flags (Urgent / Normal) to address critical plumbing or electrical issues instantly."
      ],
      tip: "Promptly marking complaints as 'Resolved' boosts member satisfaction and maintains mess harmony."
    },
    {
      id: "deposits",
      title: "5. Member Deposits & Balances",
      icon: Coins,
      badge: "Financial",
      description: "Logging cash or bank deposits submitted by roommates to fund mess operations.",
      features: [
        "Log individual deposit entries with date, payment method, and reference notes.",
        "Live running balance tracking: Instantly updates member's wallet balance on their dashboard.",
        "Deposit history audit trail to prevent disputes over lost cash payments."
      ],
      tip: "Issue an instant confirmation deposit entry as soon as cash is handed over to maintain absolute trust."
    },
    {
      id: "expenses",
      title: "6. Bazaar Expense Logging",
      icon: Receipt,
      badge: "Financial",
      description: "Recording daily grocery and bazaar expenditures with attached proof of payment.",
      features: [
        "Log daily expenses by category: Vegetables, Meat/Fish, Grocery, Dairy, or Cleaning Supplies.",
        "Assign the 'Paid By' member to automatically credit their account or mess fund.",
        "Attach photo receipts of market bills for 100% financial transparency."
      ],
      tip: "Encourage market duty members to submit photo receipts immediately after returning from the bazaar."
    },
    {
      id: "market-schedules",
      title: "7. Daily Bazaar Schedule & Duty Roster",
      icon: Calendar,
      badge: "Operations",
      description: "Automated rotation and assignment of daily or weekly market purchasing duties.",
      features: [
        "Create fair, balanced rotation schedules for roommates to visit the market.",
        "Automated reminders sent to assigned members 24 hours before their market duty.",
        "Option to swap or reassign duty dates if a member is sick or unavailable."
      ],
      tip: "Publish the market roster at least one week in advance so members can plan their personal schedules."
    },
    {
      id: "meal-off-requests",
      title: "8. Meal Off Requests",
      icon: UtensilsCrossed,
      badge: "Operations",
      description: "Reviewing and approving member requests to pause their meal when traveling or eating out.",
      features: [
        "Centralized request queue showing requested date, meal type (Breakfast/Lunch/Dinner), and reason.",
        "One-click approval/rejection instantly adjusts the daily cooking headcount.",
        "Automated cutoff enforcement: Requests submitted after the mess deadline are flagged."
      ],
      tip: "Establish a strict daily cutoff time (e.g., 9:00 PM for next day's lunch) in mess settings."
    },
    {
      id: "meals",
      title: "9. Daily Meal Logging & Rate Control",
      icon: Utensils,
      badge: "Operations",
      description: "Recording the exact number of meals consumed daily by each mess member.",
      features: [
        "Batch input matrix to log breakfast, lunch, and dinner counts for all members simultaneously.",
        "Support for guest meals and special feasts with custom meal weight multipliers.",
        "Real-time sync with monthly billing to keep the running meal rate perfectly accurate."
      ],
      tip: "Log meals at the end of each day while cooking counts are fresh to avoid end-of-month discrepancies."
    },
    {
      id: "members",
      title: "10. Member Management & Roles",
      icon: Users,
      badge: "Management",
      description: "Controlling user access, assigning roles, and managing room allocations.",
      features: [
        "Review and approve join requests from new roommates.",
        "Assign roles: Elevate trusted members to 'Manager' role or keep them as 'Member'.",
        "Manage member status: Active, suspended (for unpaid dues), or archived upon leaving."
      ],
      tip: "Ensure all active members have their correct phone numbers listed for emergency communication."
    },
    {
      id: "menu-plans",
      title: "11. Menu & Recipe Planning",
      icon: BookOpen,
      badge: "Operations",
      description: "Designing structured weekly meal calendars to inform members what will be cooked.",
      features: [
        "Interactive weekly calendar view for Breakfast, Lunch, and Dinner.",
        "Attach specific recipes and required ingredient estimates for the mess cook.",
        "Members can view the menu in real-time on their dashboard."
      ],
      tip: "Involve roommates in menu planning to accommodate dietary preferences and reduce food complaints."
    },
    {
      id: "mess-settings",
      title: "12. Mess Configuration & Rules",
      icon: Settings,
      badge: "Management",
      description: "Defining operational parameters, financial rules, and shared overhead policies.",
      features: [
        "Set mess name, address, rules, and emergency contact details.",
        "Configure automated meal booking deadlines and guest meal pricing.",
        "Manage recurring overhead costs (e.g., monthly cook salary, electricity base rates)."
      ],
      tip: "Clearly state guest meal policies and late payment penalties in the rules section."
    },
    {
      id: "notices",
      title: "13. Notice Board & Announcements",
      icon: Bell,
      badge: "Communication",
      description: "Publishing official mess announcements, urgent updates, and meeting agendas.",
      features: [
        "Rich text editor to format important notices with headers, bullet points, and links.",
        "Priority tags (Urgent / Info / General) to highlight critical announcements.",
        "Push notifications sent to all members upon publishing an urgent notice."
      ],
      tip: "Pin monthly feast dates and payment deadline notices to the top of the board."
    },
    {
      id: "payments",
      title: "14. Payment Verification",
      icon: CheckCircle2,
      badge: "Financial",
      description: "Reviewing and confirming online or cash payments submitted by members.",
      features: [
        "Verify transaction IDs, bKash/Nagad references, and uploaded payment screenshots.",
        "Approve payments to instantly credit the member's deposit balance.",
        "Reject invalid or duplicate payment submissions with explanatory notes."
      ],
      tip: "Cross-reference mobile banking SMS alerts before approving submitted transaction IDs."
    },
    {
      id: "profile",
      title: "15. Manager Profile",
      icon: User,
      badge: "Personal",
      description: "Managing your personal administrative credentials and account security.",
      features: [
        "Update full name, phone number, bio, and upload a professional avatar.",
        "Change password and manage active device sessions.",
        "View personal role elevation history and audit logs."
      ],
      tip: "Keep your profile phone number up-to-date so members can contact you during emergencies."
    },
    {
      id: "reports",
      title: "16. Comprehensive Reports & Analytics",
      icon: BarChart3,
      badge: "Analytics",
      description: "Generating visual financial statements, meal expense insights, and exportable audit logs.",
      features: [
        "Period overview charts comparing total deposits versus total expenditures.",
        "Category breakdown graphs showing exactly where mess funds were spent (Vegetables vs Meat).",
        "Exportable PDF/Excel monthly statements for formal audits and record keeping."
      ],
      tip: "Share monthly summary report links in the mess WhatsApp group for complete transparency."
    },
    {
      id: "subscription",
      title: "17. Subscription Management",
      icon: Layers,
      badge: "Platform",
      description: "Managing your Mess OS SaaS subscription plan, billing history, and renewals.",
      features: [
        "View current active plan details, seat limits, and renewal dates.",
        "Upgrade or renew subscription plans via automated secure payment gateways.",
        "Download official Mess OS platform tax invoices and billing receipts."
      ],
      tip: "Set up auto-renewal or renew before expiration to avoid service interruption for your mess."
    },
    {
      id: "utility-bills",
      title: "18. Shared Utility Bills",
      icon: Zap,
      badge: "Financial",
      description: "Logging shared utility bills (Gas, Electricity, Water, Internet) for equal division.",
      features: [
        "Log monthly utility bills with due dates, total amounts, and attached bill copies.",
        "Automated equal share calculation: Instantly divides bill amounts equally among all active members.",
        "Separate accounting track to keep grocery meal expenses distinct from room utilities."
      ],
      tip: "Attach a clear photo of the official electricity or gas bill to avoid any billing doubts among roommates."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Header */}
      <div className="border-b pb-6 space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="size-4" /> Manager Manual
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Manager Complete Guide
        </h1>
        <p className="text-muted-foreground text-base max-w-3xl leading-relaxed">
          As a Mess Manager, you hold the keys to maintaining smooth mess operations, accurate financial accounting, and absolute transparency. Below is the comprehensive guide to all 18 manager modules in Mess OS.
        </p>
      </div>

      {/* Quick Navigation Anchor Grid */}
      <div className="p-5 rounded-2xl bg-muted/40 border space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Info className="size-4 text-emerald-600" /> Quick Jump to Section
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {managerModules.map((m) => (
            <a 
              key={m.id} 
              href={`#${m.id}`}
              className="px-3 py-2 rounded-lg bg-background border hover:border-emerald-500/50 hover:bg-emerald-500/5 text-xs font-medium text-foreground transition-all flex items-center justify-between group"
            >
              <span className="truncate">{m.title}</span>
              <span className="text-xs bg-muted group-hover:bg-emerald-500/10 group-hover:text-emerald-600 px-1.5 py-0.5 rounded ml-2 font-semibold">
                {m.badge}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Module List Section */}
      <div className="space-y-8">
        {managerModules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} id={module.id} className="scroll-mt-28 border hover:border-emerald-500/20 transition-all duration-300">
              <CardHeader className="space-y-2 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {module.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit border-emerald-500/30 text-emerald-600 font-bold px-2.5 py-0.5">
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
                    Key Features & Workflow
                  </h4>
                  <ul className="space-y-2">
                    {module.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <span className="size-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tip Box */}
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                  <Sparkles className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Manager Pro Tip
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
