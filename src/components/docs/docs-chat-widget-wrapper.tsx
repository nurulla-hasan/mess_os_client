"use client";

import { usePathname } from "next/navigation";
import { DocsChatWidget } from "./docs-chat-widget";
import { getContextForPath } from "@/app/docs/docs-context";

export function DocsChatWidgetWrapper() {
  const pathname = usePathname();
  const { context, pageTitle } = getContextForPath(pathname);

  return <DocsChatWidget context={context} pageTitle={pageTitle} />;
}
