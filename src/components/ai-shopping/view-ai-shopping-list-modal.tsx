"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IAiShoppingList } from "@/types/ai-shopping.type";
import { Eye, Package, ShoppingCart } from "lucide-react";
import React from "react";
import { format } from "date-fns";

interface ViewAiShoppingListModalProps {
  list: IAiShoppingList;
}

export function ViewAiShoppingListModal({ list }: ViewAiShoppingListModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="AI Shopping List"
      description={`Generated for ${format(new Date(list.targetDate), "PPP")}.`}
      showClose
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="p-6 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={list.status === "converted" ? "success" : list.status === "rejected" ? "rejected" : list.status === "approved" ? "info" : "pending"}>
            {list.status}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <ShoppingCart className="h-3 w-3" /> {list.items.length} items
          </Badge>
        </div>

        <ScrollArea className="max-h-96 pr-3">
          <div className="space-y-2">
            {list.items.map((item, index) => (
              <div key={item._id || `${item.name}-${index}`} className="flex items-start justify-between gap-3 rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-md bg-background border flex items-center justify-center text-muted-foreground shrink-0">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">{item.quantity}</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ModalWrapper>
  );
}
