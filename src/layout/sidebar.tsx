"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  LogOut,
  ChevronDown,
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
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn, ErrorToast } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useSubscription, routeFeatureMap, alwaysAccessibleRoutes } from "@/providers/subscription-provider";

type UserRole = "member" | "manager" | "admin";

interface NavItemType {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface NavSection {
  title?: string;
  icon?: LucideIcon;
  items: NavItemType[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  userRole?: UserRole;
  messName?: string;
}

// Helper to get role-based route prefix
function getRoutePrefix(role: UserRole): string {
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

function getSidebarSections(role: UserRole): NavSection[] {
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

function SidebarSectionGroup({ 
  section, 
  pathname, 
  userRole,
  prefix,
  isAllowed 
}: { 
  section: NavSection; 
  pathname: string;
  userRole: UserRole;
  prefix: string;
  isAllowed: (featureKey?: string, role?: string) => boolean;
}) {
  const router = useRouter();
  // Check if any item in this section is currently active
  const isSectionActive = section.items.some((item) => pathname === item.href);
  const [isOpen, setIsOpen] = useState(true);

  // Visual content for navigation item
  const NavItemContent = ({ item, isLocked, isActive }: { 
    item: NavItemType; 
    isLocked: boolean; 
    isSubItem: boolean;
    isActive: boolean;
  }) => (
    <div className="flex items-center text-sm px-2">
      <item.icon className={cn(
        "mr-2 h-4 w-4 transition-colors",
        isActive ? "text-primary-foreground" : isLocked ? "text-muted-foreground/40" : "text-muted-foreground group-hover:text-primary"
      )} />
      <span className={cn(isLocked && "select-none")}>{item.name}</span>
    </div>
  );

  // Main navigation item component
  const NavItem = ({ item, isSubItem = false }: { item: NavItemType; isSubItem?: boolean }) => {
    const isActive = pathname === item.href;
    
    // Determine if locked
    const routePart = item.href.replace(prefix, "") || "/dashboard";
    const isAlwaysAllowed = alwaysAccessibleRoutes.includes(routePart);
    const featureKey = routeFeatureMap[routePart];
    const allowed = isAlwaysAllowed || isAllowed(featureKey, userRole);
    const isLocked = !allowed;

    const handleClick = (e: React.MouseEvent) => {
      if (isLocked) {
        e.preventDefault();
        if (userRole === "manager") {
          router.push(`${prefix}/subscription`);
        } else {
          ErrorToast("Feature locked. Please contact your manager to upgrade.");
        }
      }
    };

    const commonClasses = cn(
      "flex items-center justify-between p-2 rounded-sm text-sm font-medium transition-colors duration-200 group cursor-pointer",
      isActive
        ? "bg-primary text-primary-foreground"
        : isLocked 
          ? "text-muted-foreground/60"
          : "hover:bg-accent hover:text-accent-foreground",
      isSubItem && "w-[90%] ml-5"
    );

    if (isLocked) {
      return (
        <div onClick={handleClick} className={commonClasses}>
          <NavItemContent item={item} isLocked={true} isSubItem={isSubItem} isActive={isActive} />
          <Lock className="h-3 w-3 text-muted-foreground/40" />
        </div>
      );
    }

    return (
      <Link href={item.href} className={commonClasses}>
        <NavItemContent item={item} isLocked={false} isSubItem={isSubItem} isActive={isActive} />
      </Link>
    );
  };

  // If section has no title, render items flat
  if (!section.title) {
    return (
      <>
        {section.items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </>
    );
  }

  // Render collapsible section
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
          isSectionActive
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <div className="flex items-center text-sm px-2">
          {section.icon && <section.icon className="mr-2 h-4 w-4" />}
          {section.title}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "-rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {section.items.map((item) => (
          <NavItem key={item.href} item={item} isSubItem />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  userRole = "member",
  messName,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAllowed } = useSubscription();

  const sections = getSidebarSections(userRole);
  const prefix = getRoutePrefix(userRole);

  useEffect(() => {
    setIsSidebarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-sidebar w-64 transition-transform duration-300 ease-in-out transform flex flex-col border-r",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-6 border-b h-20">
        <Link href={prefix} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary shadow-lg shadow-primary/20 ring-1 ring-primary/20">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold  text-foreground">
              Mess<span className="text-primary">Manager</span>
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest truncate max-w-[150px]">
              {messName || "Mess Management"}
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 h-[calc(100vh-148px)]">
        <nav className="space-y-2 p-4">
          {sections.map((section, idx) => (
            <SidebarSectionGroup 
              key={idx} 
              section={section} 
              pathname={pathname} 
              userRole={userRole}
              prefix={prefix}
              isAllowed={isAllowed}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="justify-start w-full text-primary"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
}

