"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  ShieldCheck, 
  Camera, 
  Lock, 
  LogOut,
  Edit,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function ProfileView({ role }: { role: "manager" | "member" }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header / Avatar Section */}
      <div className="relative group">
        <div className="h-32 w-full bg-linear-to-r from-primary/20 via-primary/10 to-background rounded-3xl" />
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage src="" />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">GH</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg border border-border">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="pb-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              Golap Hasan
              <Badge variant={role === "manager" ? "manager" : "member"} className="uppercase tracking-tighter h-5">
                {role}
              </Badge>
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Verified Account
            </p>
          </div>
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your contact and account details.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">
              <Edit className="mr-2 h-3.5 w-3.5" /> Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Full Name</p>
                <p className="text-sm font-medium">Golap Hasan</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Email Address</p>
                <p className="text-sm font-medium">golap.hasan@example.com</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Phone Number</p>
                <p className="text-sm font-medium">+880 1712-345678</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Permanent Address</p>
                <p className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                Change Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                Two-Factor Auth
              </Button>
            </CardContent>
          </Card>

          <Card className="border-rose-500/20 bg-rose-500/5">
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold transition-all">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
