"use client";

import React from "react";
import { Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Giant soft orbs */}
      <div className="absolute -top-20 -left-20 w-125 h-125 bg-primary/8 rounded-full animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-150 h-150 bg-primary/6 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/2 w-100 h-100 bg-primary/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating dots with different animations */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            i % 3 === 0 ? "bg-primary/40" : i % 3 === 1 ? "bg-primary/25" : "bg-primary/50"
          )}
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 11) % 70}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      
      {/* Pulsing rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute border border-primary/20 rounded-full"
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${20 + (i * 15) % 60}%`,
            top: `${20 + (i * 12) % 50}%`,
            animation: `ping ${3 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      
      {/* Sparkle icons */}
      <Sparkles className="absolute top-[15%] left-[20%] w-5 h-5 text-primary/30 animate-pulse" style={{ animationDuration: '2s' }} />
      <Star className="absolute top-[25%] right-[15%] w-4 h-4 text-primary/40 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      <Zap className="absolute bottom-[30%] left-[10%] w-4 h-4 text-primary/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-[20%] right-[25%] w-6 h-6 text-primary/25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
      <Star className="absolute top-[40%] left-[5%] w-3 h-3 text-primary/30 animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '1.2s' }} />
      
      {/* Cross sparkles text */}
      <span className="absolute top-[18%] right-[30%] text-primary/30 text-xl animate-pulse" style={{ animationDuration: '2s' }}>✦</span>
      <span className="absolute top-[35%] left-[25%] text-primary/25 text-lg animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}>✦</span>
      <span className="absolute bottom-[25%] right-[10%] text-primary/35 text-2xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>✦</span>
      <span className="absolute top-[60%] right-[5%] text-primary/20 text-base animate-pulse" style={{ animationDuration: '2.3s', animationDelay: '0.4s' }}>✦</span>
      <span className="absolute bottom-[40%] left-[15%] text-primary/30 text-sm animate-pulse" style={{ animationDuration: '2.7s', animationDelay: '0.9s' }}>✦</span>
    </div>
  );
}
