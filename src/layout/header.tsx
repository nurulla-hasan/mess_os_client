"use client";

import { Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ThemeToggle } from "../components/ui/custom/theme-toggle";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  const admin = {
    fullName: "Golap hasan",
    email: "golaphasan@gmail.com",
    role: "Admin",
    image: "https://github.com/shadcn.png",
  };
  const isLoading = false;

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 z-30 bg-sidebar border-b">
      <div className="relative h-full flex items-center justify-between px-4">
        {/* Left side: mobile menu or spacer */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon-sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: notification + theme toggle + profile */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Theme toggle */}
          <ThemeToggle variant="outline" size="icon-sm" />

          {/* Notification icon */}
          <Link href="/vendor/notifications">
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full relative "
            >
              <Bell className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center pl-2">
            {/* Profile dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  {isLoading ? (
                    <>
                      <Skeleton className=" rounded-full" />
                      <Skeleton className="h-4 w-28 rounded-sm hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={admin?.image}
                          alt={admin?.fullName || "user"}
                        />
                        <AvatarFallback>
                          {admin?.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:flex flex-col text-left">
                        <p className="text-sm font-medium leading-none">
                          {admin?.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {admin?.role}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {admin?.fullName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {admin?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
