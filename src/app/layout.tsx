import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SerwistProvider } from "@serwist/turbopack/react";
import { ChatWidgetProvider } from "@/components/docs/chat-widget-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const APP_NAME = "Mess Manager OS";
const APP_DEFAULT_TITLE = "Mess Manager - Simplified Mess Management";
const APP_TITLE_TEMPLATE = "%s - Mess OS";
const APP_DESCRIPTION = "Efficiently manage your mess meals, expenses, and deposits with Mess Manager.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased font-sans max-w-480 mx-auto`}
        suppressHydrationWarning
      >
        <SerwistProvider swUrl="/serwist/sw.js">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[
            "light",
            "dark",
            "theme-teal",
            "theme-teal-dark",
            "theme-rose",
            "theme-rose-dark",
            "theme-blue",
            "theme-blue-dark",
            "theme-orange",
            "theme-orange-dark",
            "theme-green",
            "theme-green-dark",
          ]}
        >
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <Toaster richColors theme="system"/>
          {children}
          <ChatWidgetProvider />
        </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
