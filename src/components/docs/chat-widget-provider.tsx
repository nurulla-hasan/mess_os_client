"use client";

import dynamic from "next/dynamic";

const DocsChatWidgetWrapper = dynamic(
  () =>
    import("@/components/docs/docs-chat-widget-wrapper").then(
      (mod) => mod.DocsChatWidgetWrapper
    ),
  { ssr: false }
);

export function ChatWidgetProvider() {
  return <DocsChatWidgetWrapper />;
}
