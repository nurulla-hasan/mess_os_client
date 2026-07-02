"use client";

import { usePathname } from "next/navigation";
import { DocsChatWidget } from "./docs-chat-widget";
import {
  overviewContext,
  managerContext,
  userContext,
} from "@/app/docs/docs-context";

export function DocsChatWidgetWrapper() {
  const pathname = usePathname();

  const getContext = () => {
    if (pathname === "/docs/manager") return managerContext;
    if (pathname === "/docs/user") return userContext;
    // Default: /docs or any nested path
    return overviewContext;
  };

  return <DocsChatWidget context={getContext()} />;
}
