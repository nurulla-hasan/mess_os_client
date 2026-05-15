"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Utensils } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import {
  UserRole,
  getRoutePrefix,
  getSidebarSections,
} from "./sidebar-constants";
import { SidebarSection } from "./sidebar-section";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  userRole?: UserRole;
  messName?: string;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  userRole = "member",
  messName,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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
            <SidebarSection 
              key={idx} 
              section={section} 
              pathname={pathname} 
              userRole={userRole}
              prefix={prefix}
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
