"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateMess } from "@/services/mess.service";
import { IMess } from "@/types/mess.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface ProfileSettingsProps {
  mess: IMess;
}

export function ProfileSettings({ mess }: ProfileSettingsProps) {
  const router = useRouter();
  const [name, setName] = useState(mess.name);
  const [address, setAddress] = useState(mess.address);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await updateMess(mess._id, { name, address });
    if (res.success) {
      SuccessToast("Profile updated successfully");
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  return (
    <Card className="shadow-sm border-primary/10">
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
          <Input 
            id="mess-name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter mess name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>
        <Button 
          size="sm" 
          onClick={handleUpdate} 
          disabled={loading}
          className="font-bold"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
}
