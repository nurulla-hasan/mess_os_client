"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, RefreshCw, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { regenerateInviteCode } from "@/services/mess.service";
import { IMess } from "@/types/mess.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface InviteCodeSettingsProps {
  mess: IMess;
}

export function InviteCodeSettings({ mess }: InviteCodeSettingsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegenerate = async () => {
    setLoading(true);
    const res = await regenerateInviteCode(mess._id);
    if (res.success) {
      SuccessToast("Invite code regenerated");
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(mess.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    SuccessToast("Invite code copied");
  };

  return (
    <Card className="shadow-sm border-primary/10">
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
            <div className="flex-1 bg-accent/50 rounded-md border border-dashed border-primary/30 flex items-center justify-center font-mono font-bold tracking-widest text-lg p-2 h-11">
              {mess.inviteCode}
            </div>
            <Button variant="outline" size="icon" onClick={copyCode} className="h-11 w-11 transition-all">
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full font-bold hover:bg-primary/5 border-primary/20"
            onClick={handleRegenerate}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Regenerate New Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
