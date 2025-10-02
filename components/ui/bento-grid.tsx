"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  action,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) => {
  // 배경 이미지가 있는 카드의 경우 완전히 다른 구조 사용
  if (className?.includes('overflow-hidden')) {
    return (
      <div
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none relative",
          className
        )}
      >
        {header}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10 group-hover/bento:translate-x-2 transition duration-200">
          {icon}
          <div className={cn(
            "font-bold mb-1 md:mb-2 mt-2 text-base md:text-lg lg:text-xl",
            className?.includes('gallery-card') ? "text-white" : "text-white"
          )} style={{
            fontFamily: 'Noto Sans KR, sans-serif',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            {title}
          </div>
          <div className={cn(
            "font-normal text-xs md:text-sm lg:text-base",
            className?.includes('gallery-card') ? "text-white/90" : "text-white/90"
          )} style={{
            fontFamily: 'Noto Sans KR, sans-serif',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            {description}
          </div>
        </div>
        {action && (
          <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 z-20">
            {action}
          </div>
        )}
      </div>
    );
  }

  // 일반 카드의 경우 기존 구조 사용
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col relative overflow-hidden",
        className
      )}
    >
      <div className="flex-1 relative">
        {header}
      </div>
      <div className="p-4 pt-2">
        <div className={cn(
          "group-hover/bento:translate-x-2 transition duration-200",
          action ? "pr-20" : ""
        )}>
          {icon}
          <div className="font-bold mb-2 mt-2 text-lg md:text-xl text-neutral-600 dark:text-neutral-200" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
            {title}
          </div>
          <div className="font-normal text-sm md:text-base text-neutral-600 dark:text-neutral-300" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
            {description}
          </div>
        </div>
        {action && (
          <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 z-20">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
