"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type BGGProps = {
  className?: string;
  containerClassName?: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description?: string;
  buttonText?: string;
  priceLabel?: string; // e.g. "$100"
  onClick?: () => void;
};

export function BGG({
  className,
  containerClassName,
  imageSrc,
  imageAlt = "",
  title,
  description,
  buttonText = "Buy now",
  priceLabel,
  onClick,
}: BGGProps) {
  return (
    <div className={cn(containerClassName)}>
      <BackgroundGradient className={cn(
        "rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900",
        className
      )}>
        <img
          src={imageSrc}
          alt={imageAlt || title}
          height={400}
          width={400}
          className="object-contain mx-auto"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        {description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}

        <button
          type="button"
          onClick={onClick}
          className={cn(
            "rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1",
            "bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
          )}
        >
          <span>{buttonText}</span>
          {priceLabel && (
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              {priceLabel}
            </span>
          )}
        </button>
      </BackgroundGradient>
    </div>
  );
}

// Minimal demo, optional usage example
export function BGGDemo() {
  return (
    <BGG
      imageSrc="/jordans.webp"
      title="Air Jordan 4 Retro Reimagined"
      description="The Air Jordan 4 Retro Reimagined Bred will release on Saturday, February 17, 2024. Your best opportunity to get these right now is by entering raffles and waiting for the official releases."
      buttonText="Buy now"
      priceLabel="$100"
    />
  );
}

