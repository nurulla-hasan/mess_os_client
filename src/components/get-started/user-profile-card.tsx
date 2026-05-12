"use client";

import React from "react";
import { Mail, Shield, User as UserIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { IUser } from "@/types/user.type";

interface UserProfileCardProps {
  user: IUser | null;
  isLoading: boolean;
  onLogout: () => void;
}

export function UserProfileCard({ user, isLoading, onLogout }: UserProfileCardProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center mt-8 w-full max-w-md mx-auto">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 w-full animate-pulse">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex justify-center mt-8">
      <div className="group relative">
        <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-primary/10 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-primary/20 shadow-xl overflow-hidden min-w-[320px] md:min-w-112.5">
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse" />
            <Avatar className="h-20 w-20 border-2 border-primary/50 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-primary rounded-full border-2 border-background shadow-lg">
              <Shield className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-1.5 pr-8 md:pr-10">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h4 className="text-xl font-bold  text-foreground">{user.fullName}</h4>
              <div className={cn(
                "inline-flex items-center self-center md:self-auto px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                user.globalRole === "super_admin" 
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-sm shadow-amber-500/10" 
                  : user.globalRole === "manager"
                    ? "bg-blue-500/10 border-blue-500/20 text-blue-500 shadow-sm shadow-blue-500/10"
                    : "bg-primary/10 border-primary/20 text-primary shadow-sm shadow-primary/10"
              )}>
                {user.globalRole?.replace("_", " ")}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>{user.email}</span>
            </div>
            <p className="text-xs text-primary/70 font-medium">Ready to manage your mess</p>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={onLogout}
              className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4.5 w-4.5" />
            </Button>
          </div>

          <div className="absolute -bottom-4 -right-4 p-3 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <UserIcon className="h-24 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
