"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transferOwnership } from "@/services/mess.service";
import { IMess } from "@/types/mess.type";
import { IMemberOption } from "@/types/member.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

interface DangerZoneSettingsProps {
  mess: IMess;
  members: IMemberOption[];
}

export function DangerZoneSettings({ mess, members }: DangerZoneSettingsProps) {
  const [newManagerId, setNewManagerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!newManagerId) return;
    
    setLoading(true);
    const res = await transferOwnership(mess._id, newManagerId);
    if (res.success) {
      SuccessToast("Ownership transferred successfully");
      window.location.href = "/dashboard";
    } else {
      ErrorToast(res.message);
      setLoading(false);
    }
  };

  return (
    <Card className="md:col-span-2 border-rose-500/20 bg-rose-500/5 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-bold flex items-center gap-3 text-rose-600">
          <ShieldAlert className="h-4 w-4" />
          Danger Zone
        </CardTitle>
        <CardDescription className="text-rose-600/70">Critical administrative actions that cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold">Transfer Ownership</p>
            <p className="text-xs text-muted-foreground max-w-md">Assign a new manager to this mess. You will lose all managerial privileges immediately after transfer.</p>
          </div>
          <div className="flex gap-3 min-w-[250px]">
            <Select value={newManagerId} onValueChange={setNewManagerId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new manager" />
              </SelectTrigger>
              <SelectContent>
                {members.filter(m => m.messRole !== "manager").map((member) => (
                  <SelectItem key={member._id} value={member.userId}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <ConfirmationModal
              title="Transfer Ownership?"
              description="Are you sure you want to transfer management to this member? You will lose all managerial privileges immediately."
              confirmText="Confirm Transfer"
              loadingText="Transferring..."
              variant="destructive"
              isLoading={loading}
              onConfirm={handleTransfer}
              trigger={
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-rose-600 border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all font-bold whitespace-nowrap"
                  disabled={!newManagerId || loading}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
