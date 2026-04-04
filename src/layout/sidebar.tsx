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
  UserPlus,
  Utensils,
  Wallet,
  ShoppingBag,
  Receipt,
  Moon,
  Bell,
  Settings,
  User,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type UserRole = "member" | "manager" | "admin";

interface NavItemType {
  name: string;
  icon: LucideIcon;
  href: string;
  roles?: UserRole[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  userRole?: UserRole;
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

// Main navigation items - role aware
function getMainNavItems(role: UserRole): NavItemType[] {
  const prefix = getRoutePrefix(role);
  return [
    { name: "Dashboard", icon: LayoutGrid, href: prefix },
  ];
}

// Management section - Manager only
function getManagementItems(role: UserRole): NavItemType[] {
  if (role === "member") return [];
  const prefix = getRoutePrefix(role);
  return [
    { name: "Members", icon: Users, href: `${prefix}/members`, roles: ["manager", "admin"] },
    { name: "Join Requests", icon: UserPlus, href: `${prefix}/join-requests`, roles: ["manager", "admin"] },
    { name: "Meal Management", icon: Utensils, href: `${prefix}/meals`, roles: ["manager", "admin"] },
  ];
}

// Financial section
function getFinancialItems(role: UserRole): NavItemType[] {
  const prefix = getRoutePrefix(role);
  const baseItems: NavItemType[] = [
    { name: "Deposits", icon: Wallet, href: `${prefix}/deposits` },
    { name: "Expenses", icon: ShoppingBag, href: `${prefix}/expenses` },
  ];
  
  // Manager/Admin get extra financial items
  if (role !== "member") {
    baseItems.push(
      { name: "Utility Bills", icon: Receipt, href: `${prefix}/utility-bills`, roles: ["manager", "admin"] },
      { name: "Monthly Summary", icon: BarChart3, href: `${prefix}/summary`, roles: ["manager", "admin"] }
    );
  }
  
  return baseItems;
}

// Requests section - All roles
function getRequestsItems(role: UserRole): NavItemType[] {
  const prefix = getRoutePrefix(role);
  return [
    { name: "Meal Off Requests", icon: Moon, href: `${prefix}/meal-off-requests` },
    { name: "Notices", icon: Bell, href: `${prefix}/notices` },
  ];
}

// Account section
function getAccountItems(role: UserRole): NavItemType[] {
  const prefix = getRoutePrefix(role);
  const items: NavItemType[] = [
    { name: "Profile", icon: User, href: `${prefix}/profile` },
  ];
  
  // Manager/Admin get mess settings
  if (role !== "member") {
    items.unshift(
      { name: "Mess Settings", icon: Settings, href: `${prefix}/mess-settings`, roles: ["manager", "admin"] }
    );
  }
  
  return items;
}

// Filter items by role
function filterByRole(items: NavItemType[], role: UserRole): NavItemType[] {
  return items.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(role);
  });
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  userRole = "member",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Get role-based navigation items
  const MAIN_NAV_ITEMS = getMainNavItems(userRole);
  const MANAGEMENT_ITEMS = getManagementItems(userRole);
  const FINANCIAL_ITEMS = getFinancialItems(userRole);
  const REQUESTS_ITEMS = getRequestsItems(userRole);
  const ACCOUNT_ITEMS = getAccountItems(userRole);

  // Filter items based on user role (for extra safety)
  const visibleManagementItems = filterByRole(MANAGEMENT_ITEMS, userRole);
  const visibleFinancialItems = filterByRole(FINANCIAL_ITEMS, userRole);
  const visibleRequestsItems = filterByRole(REQUESTS_ITEMS, userRole);
  const visibleAccountItems = filterByRole(ACCOUNT_ITEMS, userRole);

  // Check if current path matches any sub-item for auto-expand
  const isManagementPath = visibleManagementItems.some(
    (item: NavItemType) => pathname === item.href
  );
  const isFinancialPath = visibleFinancialItems.some(
    (item: NavItemType) => pathname === item.href
  );
  const isRequestsPath = visibleRequestsItems.some(
    (item: NavItemType) => pathname === item.href
  );
  const isAccountPath = visibleAccountItems.some(
    (item: NavItemType) => pathname === item.href
  );

  // Set initial open states
  const [isManagementOpen, setIsManagementOpen] = useState(isManagementPath);
  const [isFinancialOpen, setIsFinancialOpen] = useState(isFinancialPath);
  const [isRequestsOpen, setIsRequestsOpen] = useState(isRequestsPath);
  const [isAccountOpen, setIsAccountOpen] = useState(isAccountPath);

  // Auto-expand sections and close sidebar on route change using useEffect
   
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  // Render navigation item
  const NavItem = ({ item, isSubItem = false }: { item: NavItemType; isSubItem?: boolean }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
          isSubItem && "w-[90%] ml-5"
        )}
      >
        <div className="flex items-center text-sm px-2">
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </div>
      </Link>
    );
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
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 ring-1 ring-primary/20">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              Mess<span className="text-primary">Manager</span>
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Mess Management
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-4">
          {/* Dashboard - Always visible */}
          {MAIN_NAV_ITEMS.map((item: NavItemType) => (
            <NavItem key={item.href} item={item} />
          ))}

          {/* Management Group - Manager only */}
          {visibleManagementItems.length > 0 && (
            <Collapsible open={isManagementOpen} onOpenChange={setIsManagementOpen}>
              <CollapsibleTrigger
                className={cn(
                  "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                  isManagementPath
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center text-sm px-2">
                  <Users className="mr-2 h-4 w-4" />
                  Management
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isManagementOpen && "-rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {visibleManagementItems.map((item) => (
                  <NavItem key={item.href} item={item} isSubItem />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Financial Group */}
          {visibleFinancialItems.length > 0 && (
            <Collapsible open={isFinancialOpen} onOpenChange={setIsFinancialOpen}>
              <CollapsibleTrigger
                className={cn(
                  "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                  isFinancialPath
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center text-sm px-2">
                  <Wallet className="mr-2 h-4 w-4" />
                  Financial
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isFinancialOpen && "-rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {visibleFinancialItems.map((item) => (
                  <NavItem key={item.href} item={item} isSubItem />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Requests Group */}
          {visibleRequestsItems.length > 0 && (
            <Collapsible open={isRequestsOpen} onOpenChange={setIsRequestsOpen}>
              <CollapsibleTrigger
                className={cn(
                  "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                  isRequestsPath
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center text-sm px-2">
                  <Bell className="mr-2 h-4 w-4" />
                  Requests
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isRequestsOpen && "-rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {visibleRequestsItems.map((item) => (
                  <NavItem key={item.href} item={item} isSubItem />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Account/Settings Group */}
          {visibleAccountItems.length > 0 && (
            <Collapsible open={isAccountOpen} onOpenChange={setIsAccountOpen}>
              <CollapsibleTrigger
                className={cn(
                  "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                  isAccountPath
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center text-sm px-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isAccountOpen && "-rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {visibleAccountItems.map((item) => (
                  <NavItem key={item.href} item={item} isSubItem />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
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

