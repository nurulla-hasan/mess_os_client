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
    // Manager panel pages
    if (pathname.startsWith("/manager") || pathname === "/docs/manager")
      return managerContext;

    // Member/dashboard pages
    if (pathname.startsWith("/dashboard") || pathname === "/docs/user")
      return userContext;

    // Docs pages (overview)
    if (pathname.startsWith("/docs")) return overviewContext;

    // Root or any other page — general overview
    return undefined;
  };

  return <DocsChatWidget context={getContext()} />;
}
