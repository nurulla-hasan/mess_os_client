"use client";

import React from "react";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IUser } from "@/types/user.type";

interface UserDetailsModalProps {
  user: IUser;
}

export function UserDetailsModal({ user }: UserDetailsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="User Details"
      description={`Viewing full profile for ${user.fullName}.`}
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {user.fullName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{user.fullName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{user.phone || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
              <Badge variant={user.status === "active" ? "success" : "rejected"} className="h-5 px-1.5 text-[10px]">
                {user.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Role</p>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] capitalize">
                {user.globalRole.replace("_", " ")}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Registered</p>
              <p className="text-sm font-medium">{format(new Date(user.createdAt), "MMM dd, yyyy")}</p>
            </div>
          </div>

          {user.address && (
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Address</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{user.address}</p>
            </div>
          )}

          {user.bio && (
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bio</p>
              <p className="text-sm text-muted-foreground italic leading-relaxed">&quot;{user.bio}&quot;</p>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-bold flex items-center gap-2">
            Mess Memberships
            <Badge variant="outline" className="h-5 px-1 font-mono">{user.memberships?.length || 0}</Badge>
          </h4>

          {user.memberships && user.memberships.length > 0 ? (
            <div className="space-y-3">
              {user.memberships.map((membership) => {
                const mess = membership.messId;
                const messName = typeof mess === "string" ? "Unknown Mess" : mess?.name;
                const role = membership.messRole || membership.role;

                return (
                  <div key={membership._id} className="p-3 rounded-xl border bg-muted flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold truncate">{messName}</span>
                      <Badge variant={membership.status === "active" || membership.status === "approved" ? "success" : "rejected"} className="h-4 px-1 text-[9px] uppercase">
                        {membership.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 capitalize">
                        Role: <span className="text-foreground">{role}</span>
                      </span>
                      {membership.joinedAt && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                          Joined: {format(new Date(membership.joinedAt), "MMM dd, yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center border-2 border-dashed rounded-2xl">
              <p className="text-xs text-muted-foreground font-medium">No memberships found for this user.</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-muted border-t flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
    </ModalWrapper>
  );
}
