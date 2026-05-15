"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn, ErrorToast } from "@/lib/utils";
import { NavItemType, UserRole } from "./sidebar-constants";
import { useSubscription, routeFeatureMap, alwaysAccessibleRoutes } from "@/providers/subscription-provider";

interface SidebarItemProps {
  item: NavItemType;
  isSubItem?: boolean;
  pathname: string;
  userRole: UserRole;
  prefix: string;
}

const NavItemContent = ({ item, isLocked, isActive }: { 
  item: NavItemType; 
  isLocked: boolean; 
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

export function SidebarItem({ item, isSubItem = false, pathname, userRole, prefix }: SidebarItemProps) {
  const router = useRouter();
  const { isAllowed } = useSubscription();

  // Determine if locked
  const routePart = item.href.replace(prefix, "") || "/dashboard";
  const isAlwaysAllowed = alwaysAccessibleRoutes.includes(routePart);
  const featureKey = routeFeatureMap[routePart];
  const allowed = isAlwaysAllowed || isAllowed(featureKey, userRole);
  const isLocked = !allowed;

  // Active route style dio na if locked
  const isActive = !isLocked && pathname === item.href;

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      if (userRole === "manager") {
        const targetPath = `${prefix}/subscription`;
        ErrorToast("Upgrade your plan to unlock this feature");
        if (pathname !== targetPath) {
          router.push(targetPath);
        }
      } else {
        ErrorToast("This feature is not included in your mess plan. Ask your mess manager to upgrade.");
      }
    } else {
      router.push(item.href);
    }
  };

  const commonClasses = cn(
    "flex items-center justify-between p-2 rounded-sm text-sm font-medium transition-colors duration-200 group cursor-pointer w-full",
    isActive
      ? "bg-primary text-primary-foreground"
      : "hover:bg-accent hover:text-accent-foreground",
    isLocked && "text-muted-foreground/60",
    isSubItem && "w-[90%] ml-5"
  );

  return (
    <div onClick={handleClick} className={commonClasses}>
      <NavItemContent item={item} isLocked={isLocked} isActive={isActive} />
      {isLocked && <Lock className="h-3 w-3 text-muted-foreground/40 ml-2" />}
    </div>
  );
}
