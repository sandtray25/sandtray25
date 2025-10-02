"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = false,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <div
        className={cn(
          "relative z-[1] rounded-2xl",
          // Pure glassmorphism (no gradients)
          "bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px]",
          "border border-white/40 dark:border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.06)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
