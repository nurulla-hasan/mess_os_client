"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { updateMess } from "@/services/mess.service";
import { IMess } from "@/types/mess.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface OperationalSettingsProps {
  mess: IMess;
}

export function OperationalSettings({ mess }: OperationalSettingsProps) {
  const router = useRouter();
  const [mealCategories, setMealCategories] = useState<string[]>(mess.settings?.mealCategories || []);
  const [equalShareCategories, setEqualShareCategories] = useState<string[]>(mess.settings?.equalShareCategories || []);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await updateMess(mess._id, { 
      settings: { mealCategories, equalShareCategories } 
    });
    if (res.success) {
      SuccessToast("Operational settings updated");
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  const addCategory = (type: "meal" | "expense", value: string) => {
    if (!value.trim()) return;
    if (type === "meal") {
      if (!mealCategories.includes(value)) setMealCategories([...mealCategories, value]);
    } else {
      if (!equalShareCategories.includes(value)) setEqualShareCategories([...equalShareCategories, value]);
    }
  };

  const removeCategory = (type: "meal" | "expense", value: string) => {
    if (type === "meal") {
      setMealCategories(mealCategories.filter(c => c !== value));
    } else {
      setEqualShareCategories(equalShareCategories.filter(c => c !== value));
    }
  };

  return (
    <Card className="md:col-span-2 shadow-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-sm font-bold flex items-center gap-3">
          <Settings className="h-4 w-4 text-primary" />
          Operational Settings
        </CardTitle>
        <CardDescription>Configure meal categories and expense sharing categories.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Meal Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold">Meal Categories</Label>
            <div className="flex gap-2">
               <Input 
                 placeholder="Add category (e.g. Snack)" 
                 className="h-8 w-48 text-xs" 
                 onKeyDown={(e) => {
                   if (e.key === "Enter") {
                     addCategory("meal", e.currentTarget.value);
                     e.currentTarget.value = "";
                   }
                 }}
               />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {mealCategories.map((cat) => (
              <Badge key={cat} variant="outline" className="pl-3 pr-1 py-1 flex gap-2 font-bold bg-primary/5 border-primary/10">
                {cat}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 hover:bg-destructive hover:text-white rounded-full p-0"
                  onClick={() => removeCategory("meal", cat)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Expense Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold">Equal Share Categories</Label>
            <div className="flex gap-2">
               <Input 
                 placeholder="Add (e.g. Internet)" 
                 className="h-8 w-48 text-xs" 
                 onKeyDown={(e) => {
                   if (e.key === "Enter") {
                     addCategory("expense", e.currentTarget.value);
                     e.currentTarget.value = "";
                   }
                 }}
               />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {equalShareCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="pl-3 pr-1 py-1 flex gap-2 font-bold">
                {cat}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 hover:bg-destructive hover:text-white rounded-full p-0"
                  onClick={() => removeCategory("expense", cat)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleUpdate}
            loading={loading}
            loadingText="Saving..."
            className="w-full md:w-auto"
          >
            Save Operational Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
