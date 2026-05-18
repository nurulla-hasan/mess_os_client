"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ThemeToggleProps {
  variant?: "ghost" | "outline" | "default" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-lg" | "icon-sm" | "icon-xs";
  className?: string;
}

export function ThemeToggle({
  variant = "ghost",
  size = "icon-sm",
  className
}: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const colorThemes = [
    { id: "teal", label: "Teal", color: "bg-teal-500" },
    { id: "rose", label: "Rose", color: "bg-rose-500" },
    { id: "blue", label: "Blue", color: "bg-blue-500" },
    { id: "orange", label: "Orange", color: "bg-orange-500" },
    { id: "green", label: "Green", color: "bg-emerald-500" },
  ]

  // Extract current color and mode robustly from resolvedTheme or theme string
  const getCurrentThemeInfo = () => {
    const activeTheme = theme === "system" ? resolvedTheme || "light" : theme || resolvedTheme || "light";
    if (activeTheme === "light" || activeTheme === "system") return { color: "teal", mode: "light" };
    if (activeTheme === "dark") return { color: "teal", mode: "dark" };

    const clean = activeTheme.replace("theme-", "");
    const parts = clean.split("-");
    const color = parts[0];
    const mode = parts.includes("dark") ? "dark" : "light";
    
    // Ensure color is one of our valid brand colors or fallback to teal
    const isValidColor = colorThemes.some(t => t.id === color);
    return { color: isValidColor ? color : "teal", mode };
  };

  const { color: currentColor, mode: currentMode } = getCurrentThemeInfo();

  const handleModeChange = (newMode: "light" | "dark") => {
    setTheme(`theme-${currentColor}${newMode === "dark" ? "-dark" : ""}`);
  };

  const handleColorChange = (newColor: string) => {
    setTheme(`theme-${newColor}${currentMode === "dark" ? "-dark" : ""}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("rounded-full cursor-pointer relative", className)}
          aria-label="Toggle Theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 z-50 shadow-lg">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Appearance
        </div>
        <div className="flex flex-col gap-1 px-2 pb-1">
          <DropdownMenuItem
            onClick={() => handleModeChange("light")}
            className={cn("cursor-pointer rounded-md font-medium text-xs uppercase tracking-wider", currentMode === "light" && "bg-accent text-primary font-bold")}
          >
            <Sun className="mr-2 h-4 w-4 shrink-0" />
            <span>Light</span>
            {currentMode === "light" && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleModeChange("dark")}
            className={cn("cursor-pointer rounded-md font-medium text-xs uppercase tracking-wider", currentMode === "dark" && "bg-accent text-primary font-bold")}
          >
            <Moon className="mr-2 h-4 w-4 shrink-0" />
            <span>Dark</span>
            {currentMode === "dark" && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
          </DropdownMenuItem>
        </div>

        <div className="h-px bg-border my-1" />
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Brand Colors
        </div>
        <div className="grid grid-cols-5 gap-1 p-1.5">
          {colorThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleColorChange(t.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 rounded-md transition-all cursor-pointer relative group",
                currentColor === t.id ? "bg-accent ring-2 ring-primary shadow-xs" : "opacity-70 hover:opacity-100 hover:bg-muted"
              )}
              title={t.label}
            >
              <div className={cn("h-4 w-4 rounded-full shadow-sm shrink-0", t.color)} />
              {currentColor === t.id && (
                <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
