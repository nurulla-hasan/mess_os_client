"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { NavSection, UserRole } from "./sidebar-constants";
import { SidebarItem } from "./sidebar-item";

interface SidebarSectionProps {
  section: NavSection;
  pathname: string;
  userRole: UserRole;
  prefix: string;
}

export function SidebarSection({ 
  section, 
  pathname, 
  userRole,
  prefix 
}: SidebarSectionProps) {
  // Check if any item in this section is currently active
  const isSectionActive = section.items.some((item) => pathname === item.href);
  const [isOpen, setIsOpen] = useState(true);

  // If section has no title, render items flat
  if (!section.title) {
    return (
      <>
        {section.items.map((item) => (
          <SidebarItem 
            key={item.href} 
            item={item} 
            pathname={pathname}
            userRole={userRole}
            prefix={prefix}
          />
        ))}
      </>
    );
  }

  // Render collapsible section
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200",
          isSectionActive
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <div className="flex items-center text-sm px-2">
          {section.icon && <section.icon className="mr-2 h-4 w-4" />}
          {section.title}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "-rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {section.items.map((item) => (
          <SidebarItem 
            key={item.href} 
            item={item} 
            isSubItem 
            pathname={pathname}
            userRole={userRole}
            prefix={prefix}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
