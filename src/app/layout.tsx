import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mess Manager - Simplified Mess Management",
  description:
    "Efficiently manage your mess meals, expenses, and deposits with Mess Manager.",
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
      >
        <Toaster richColors/>
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
