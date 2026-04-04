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
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface NavItemType {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface NavItemProps {
  item: NavItemType;
  isSubItem?: boolean;
}

const MAIN_NAV_ITEMS: NavItemType[] = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Members", icon: Users, href: "/dashboard/members" },
  { name: "Meal Management", icon: Utensils, href: "/dashboard/meals" },
];

const FINANCIAL_SUB_ITEMS: NavItemType[] = [
  { name: "Deposits", icon: Wallet, href: "/dashboard/deposits" },
  { name: "Expenses", icon: ShoppingBag, href: "/dashboard/expenses" },
  { name: "Utility Bills", icon: Receipt, href: "/dashboard/utility-bills" },
];

const REQUESTS_SUB_ITEMS: NavItemType[] = [
  { name: "Meal Off Requests", icon: Moon, href: "/dashboard/meal-off-requests" },
  { name: "Notices", icon: Bell, href: "/dashboard/notices" },
];

const ACCOUNT_SUB_ITEMS: NavItemType[] = [
  { name: "Mess Settings", icon: Settings, href: "/dashboard/mess-settings" },
  { name: "Profile", icon: User, href: "/dashboard/profile" },
];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Check if current path matches any sub-item
  const isFinancialPath = FINANCIAL_SUB_ITEMS.some(
    (item) => pathname === item.href,
  );
  const isRequestsPath = REQUESTS_SUB_ITEMS.some(
    (item) => pathname === item.href,
  );
  const isAccountPath = ACCOUNT_SUB_ITEMS.some(
    (item) => pathname === item.href,
  );

  // Set initial open states
  const [isFinancialOpen, setIsFinancialOpen] = useState(true);
  const [isRequestsOpen, setIsRequestsOpen] = useState(true);
  const [isAccountOpen, setIsAccountOpen] = useState(true);

  // Auto-expand sections when navigating (React-recommended pattern to avoid cascading renders)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isFinancialPath) setIsFinancialOpen(true);
    if (isRequestsPath) setIsRequestsOpen(true);
    if (isAccountPath) setIsAccountOpen(true);
    setIsSidebarOpen(false);
  }

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  // Render navigation item
  const NavItem = ({ item, isSubItem = false }: NavItemProps) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
          isSubItem && "w-[90%] ml-5",
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
        "lg:translate-x-0",
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
          {MAIN_NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          {/* Financial group */}
          <Collapsible open={isFinancialOpen} onOpenChange={setIsFinancialOpen}>
            <CollapsibleTrigger
              className={cn(
                "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                isFinancialPath
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center text-sm px-2">
                <Wallet className="mr-2 h-4 w-4" />
                Financials
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isFinancialOpen && "-rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {FINANCIAL_SUB_ITEMS.map((item) => (
                <NavItem key={item.href} item={item} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Requests group */}
          <Collapsible open={isRequestsOpen} onOpenChange={setIsRequestsOpen}>
            <CollapsibleTrigger
              className={cn(
                "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                isRequestsPath
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center text-sm px-2">
                <Bell className="mr-2 h-4 w-4" />
                Requests & Alerts
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isRequestsOpen && "-rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {REQUESTS_SUB_ITEMS.map((item) => (
                <NavItem key={item.href} item={item} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Account group */}
          <Collapsible open={isAccountOpen} onOpenChange={setIsAccountOpen}>
            <CollapsibleTrigger
              className={cn(
                "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
                isAccountPath
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center text-sm px-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isAccountOpen && "-rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {ACCOUNT_SUB_ITEMS.map((item) => (
                <NavItem key={item.href} item={item} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>
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
};

export default Sidebar;
