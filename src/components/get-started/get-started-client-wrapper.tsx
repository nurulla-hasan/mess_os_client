"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";
import { IUser } from "@/types/user.type";
import { UserProfileCard } from "./user-profile-card";

interface GetStartedClientWrapperProps {
  user: IUser | null;
  children?: React.ReactNode;
}

export default function GetStartedClientWrapper({ user }: GetStartedClientWrapperProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <UserProfileCard 
      user={user} 
      isLoading={false} 
      onLogout={handleLogout} 
    />
  );
}
