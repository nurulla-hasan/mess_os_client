import {
  LayoutGrid,
  Users,
  Utensils,
  Wallet,
  ShoppingBag,
  Receipt,
  Moon,
  Bell,
  Settings,
  User,
  BarChart3,
  Home,
  ShoppingCart,
  Calendar,
  Sparkles,
  Bolt,
  AlertTriangle,
  FileText,
  CreditCard,
  LucideIcon,
  ShieldCheck,
  History,
} from "lucide-react";

export type UserRole = "member" | "manager" | "admin";

export interface NavItemType {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface NavSection {
  title?: string;
  icon?: LucideIcon;
  items: NavItemType[];
}

// Helper to get role-based route prefix
export function getRoutePrefix(role: UserRole): string {
  switch (role) {
    case "manager":
      return "/manager";
    case "admin":
      return "/admin";
    case "member":
    default:
      return "/dashboard";
  }
}

export function getSidebarSections(role: UserRole): NavSection[] {
  const prefix = getRoutePrefix(role);

  if (role === "admin") {
    return [
      {
        items: [{ name: "Admin Dashboard", icon: LayoutGrid, href: prefix }],
      },
      {
        title: "Platform",
        icon: Users,
        items: [
          { name: "Users", icon: Users, href: `${prefix}/users` },
          { name: "Messes", icon: Home, href: `${prefix}/messes` },
          { name: "Manager Requests", icon: ShieldCheck, href: `${prefix}/manager-requests` },
          { name: "Subscription Plans", icon: CreditCard, href: `${prefix}/subscriptions` },
          { name: "Subscription History", icon: History, href: `${prefix}/subscriptions/history` },
        ],
      },
      {
        title: "Analytics",
        icon: BarChart3,
        items: [
          { name: "Platform Stats", icon: BarChart3, href: `${prefix}/stats` },
        ],
      },
      {
        title: "Account",
        icon: Settings,
        items: [
          { name: "Profile", icon: User, href: `${prefix}/profile` },
        ],
      },
    ];
  }

  if (role === "manager") {
    return [
      {
        items: [{ name: "Dashboard", icon: LayoutGrid, href: prefix }],
      },
      {
        title: "Management",
        icon: Users,
        items: [
          { name: "Members", icon: Users, href: `${prefix}/members` },
          { name: "Meals", icon: Utensils, href: `${prefix}/meals` },
          { name: "Meal Off Requests", icon: Moon, href: `${prefix}/meal-off-requests` },
          { name: "Market Schedules", icon: ShoppingCart, href: `${prefix}/market-schedules` },
          { name: "Menu Plans", icon: Calendar, href: `${prefix}/menu-plans` },
          { name: "AI Shopping", icon: Sparkles, href: `${prefix}/ai-shopping` },
        ],
      },
      {
        title: "Financial",
        icon: Wallet,
        items: [
          { name: "Payments", icon: Wallet, href: `${prefix}/payments` },
          { name: "Expenses", icon: ShoppingBag, href: `${prefix}/expenses` },
          { name: "Billing", icon: Receipt, href: `${prefix}/billing` },
          { name: "Utility Bills", icon: Bolt, href: `${prefix}/utility-bills` },
        ],
      },
      {
        title: "Communications",
        icon: Bell,
        items: [
          { name: "Notices", icon: Bell, href: `${prefix}/notices` },
          { name: "Complaints", icon: AlertTriangle, href: `${prefix}/complaints` },
        ],
      },
      {
        title: "Settings",
        icon: Settings,
        items: [
          { name: "Reports", icon: FileText, href: `${prefix}/reports` },
          { name: "Mess Settings", icon: Settings, href: `${prefix}/mess-settings` },
          { name: "Subscription", icon: CreditCard, href: `${prefix}/subscription` },
          { name: "Profile", icon: User, href: `${prefix}/profile` },
        ],
      },
    ];
  }

  // Member
  return [
    {
      items: [{ name: "Dashboard", icon: LayoutGrid, href: prefix }],
    },
    {
      title: "Mess Activities",
      icon: Utensils,
      items: [
        { name: "Meals", icon: Utensils, href: `${prefix}/meals` },
        { name: "Meal Off Requests", icon: Moon, href: `${prefix}/meal-off-requests` },
        { name: "Market Duties", icon: ShoppingCart, href: `${prefix}/market-duties` },
        { name: "Menu Plans", icon: Calendar, href: `${prefix}/menu-plans` },
      ],
    },
    {
      title: "Financial",
      icon: Wallet,
      items: [
        { name: "Payments/Deposits", icon: Wallet, href: `${prefix}/payments` },
        { name: "Expenses", icon: ShoppingBag, href: `${prefix}/expenses` },
        { name: "My Bill", icon: Receipt, href: `${prefix}/my-bill` },
      ],
    },
    {
      title: "Communications",
      icon: Bell,
      items: [
        { name: "Notices", icon: Bell, href: `${prefix}/notices` },
        { name: "Complaints", icon: AlertTriangle, href: `${prefix}/complaints` },
      ],
    },
    {
      title: "Account",
      icon: Settings,
      items: [
        { name: "Reports", icon: FileText, href: `${prefix}/reports` },
        { name: "Profile", icon: User, href: `${prefix}/profile` },
      ],
    },
  ];
}
