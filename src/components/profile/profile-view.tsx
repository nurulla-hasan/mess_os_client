"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  ShieldCheck, 
  Camera, 
  Lock, 
  LogOut,
  Edit,
  MapPin,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/user.type";
import { EditProfileModal } from "./edit-profile-modal";
import { ChangePasswordModal } from "./change-password-modal";
import { logout, updateAvatar } from "@/services/auth.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

export function ProfileView({ user, role }: { user: IUser; role: "manager" | "member" }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setAvatarLoading(true);
    const res = await updateAvatar(formData);
    if (res.success) {
      SuccessToast("Avatar updated successfully");
      window.location.reload(); // Refresh to show new avatar
    } else {
      ErrorToast(res.message);
    }
    setAvatarLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header / Avatar Section */}
      <div className="relative group">
        <div className="h-32 w-full bg-linear-to-r from-primary/20 via-primary/10 to-background rounded-3xl" />
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage src={user.avatar} className="object-cover" />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                {user.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg border border-border"
              onClick={handleAvatarClick}
              disabled={avatarLoading}
            >
              {avatarLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </Button>
          </div>
          <div className="pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              {user.fullName}
              <Badge variant={role === "manager" ? "manager" : "member"} className="uppercase h-5">
                {role}
              </Badge>
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {user.isEmailVerified ? "Verified Account" : "Unverified Account"}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <User className="h-4 w-4 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your contact and account details.</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary font-bold hover:bg-primary/5"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="mr-2 h-3.5 w-3.5" /> Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Full Name</p>
                <p className="text-sm font-medium">{user.fullName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Email Address</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Phone Number</p>
                <p className="text-sm font-medium">{user.phone || "Not provided"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Permanent Address</p>
                <p className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  {user.address || "Not provided"}
                </p>
              </div>
              {user.bio && (
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Bio</p>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{user.bio}&quot;</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Lock className="h-4 w-4 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs font-bold hover:bg-primary/5 border-primary/10"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </Button>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <p className="text-xs font-bold capitalize">{user.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-500/20 bg-rose-500/5 overflow-hidden">
            <CardContent>
              <Button 
                variant="ghost" 
                className="w-full justify-start rounded-none text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold transition-all px-6"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal 
        user={user} 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
      />
      <ChangePasswordModal 
        open={isPasswordModalOpen} 
        onOpenChange={setIsPasswordModalOpen} 
      />
    </div>
  );
}
