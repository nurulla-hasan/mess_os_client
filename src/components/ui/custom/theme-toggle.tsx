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
  const { setTheme, theme } = useTheme()

  const colorThemes = [
    { id: "teal", label: "Teal", color: "bg-teal-500" },
    { id: "rose", label: "Rose", color: "bg-rose-500" },
    { id: "blue", label: "Blue", color: "bg-blue-500" },
    { id: "orange", label: "Orange", color: "bg-orange-500" },
    { id: "green", label: "Green", color: "bg-emerald-500" },
  ]

  // Extract current color and mode from theme string
  const getCurrentThemeInfo = () => {
    if (!theme) return { color: "teal", mode: "light" };
    if (theme === "light") return { color: "teal", mode: "light" };
    if (theme === "dark") return { color: "teal", mode: "dark" };

    const parts = theme.replace("theme-", "").split("-");
    const color = parts[0];
    const mode = parts[1] === "dark" ? "dark" : "light";
    return { color, mode };
  };

  const { color: currentColor, mode: currentMode } = getCurrentThemeInfo();

  const handleModeChange = (newMode: "light" | "dark") => {
    if (currentColor === "teal") {
      setTheme(newMode);
    } else {
      setTheme(`theme-${currentColor}${newMode === "dark" ? "-dark" : ""}`);
    }
  };

  const handleColorChange = (newColor: string) => {
    if (newColor === "teal") {
      setTheme(currentMode === "dark" ? "dark" : "theme-teal");
    } else {
      setTheme(`theme-${newColor}${currentMode === "dark" ? "-dark" : ""}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("rounded-full", className)}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Appearance
        </div>
        <div className="flex flex-col gap-1 px-2">
          <DropdownMenuItem
            onClick={() => handleModeChange("light")}
            className={cn(currentMode === "light" && "bg-accent")}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
            {currentMode === "light" && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleModeChange("dark")}
            className={cn(currentMode === "dark" && "bg-accent")}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
            {currentMode === "dark" && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
          </DropdownMenuItem>
        </div>

        <div className="h-px bg-border my-1" />
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Brand Colors
        </div>
        <div className="grid grid-cols-5 gap-1 p-1">
          {colorThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleColorChange(t.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 rounded-md transition-all hover:bg-accent relative group",
                currentColor === t.id ? "bg-accent ring-1 ring-primary" : "opacity-60 hover:opacity-100"
              )}
              title={t.label}
            >
              <div className={cn("h-4 w-4 rounded-full shadow-sm", t.color)} />
              {currentColor === t.id && (
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border-2 border-background" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
