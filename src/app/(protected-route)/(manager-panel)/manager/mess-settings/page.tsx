"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  Key, 
  Settings, 
  Users, 
  ShieldAlert, 
  RefreshCw, 
  Copy,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ManagerMessSettingsPage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Mess Settings"
        description="Manage your mess profile, member access codes, and administrative settings."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mess Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <Building className="h-4 w-4 text-primary" />
              Mess Profile
            </CardTitle>
            <CardDescription>Update your mess name and location info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mess-name">Mess Name</Label>
              <Input id="mess-name" defaultValue="Green House Mess" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Sector 10, Uttara, Dhaka" />
            </div>
            <Button size="sm">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Invite Code */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <Key className="h-4 w-4 text-primary" />
              Member Access
            </CardTitle>
            <CardDescription>Use this code to invite new members to your mess.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Invite Code</Label>
              <div className="flex gap-3">
                <div className="flex-1 bg-accent/50 rounded-md border border-dashed border-primary/30 flex items-center justify-center font-mono font-bold tracking-widest text-lg p-2">
                  MESS-XYZ-789
                </div>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing & Categories Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <Settings className="h-4 w-4 text-primary" />
              Operational Settings
            </CardTitle>
            <CardDescription>Configure meal categories and billing preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Auto-Archive Bills</span>
              <Button variant="ghost" size="sm" className="text-primary font-bold">Enabled</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Meal Modification Deadline</span>
              <span className="text-muted-foreground">9:00 PM</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">Advanced Settings</Button>
          </CardContent>
        </Card>

        {/* Ownership & Danger Zone */}
        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3 text-rose-600">
              <ShieldAlert className="h-4 w-4" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible administrative actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-bold">Transfer Ownership</p>
                <p className="text-xs text-muted-foreground">Assign a new manager to this mess.</p>
              </div>
              <Button variant="outline" size="sm" className="text-rose-600 border-rose-500/20">
                <Users className="mr-2 h-4 w-4" /> Transfer
              </Button>
            </div>
            <Separator className="bg-rose-500/10" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-rose-600">Delete Mess</p>
                <p className="text-xs text-muted-foreground">Permanently delete all mess data.</p>
              </div>
              <Button variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

