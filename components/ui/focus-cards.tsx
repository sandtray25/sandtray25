"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export type FocusCardItem = {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  bgSrc?: string; // optional background image
  bgGradient?: string; // optional CSS gradient background
};

type FocusCardsProps = {
  items?: FocusCardItem[];
  cards?: { title: string; src: string; href?: string }[]; // aceternity api
  className?: string;
  cardClassName?: string;
  cols?: 2 | 3 | 4; // responsive grid columns at md+
  alignCenter?: boolean;
  pastelHover?: boolean; // show pastel gradient overlay on hover
};

export function FocusCards({ items, cards, className, cardClassName, cols = 3, alignCenter = false, pastelHover = true }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const gridCols = useMemo(() => {
    switch (cols) {
      case 2:
        return "md:grid-cols-2";
      case 4:
        return "md:grid-cols-4";
      case 3:
      default:
        return "md:grid-cols-3";
    }
  }, [cols]);

  const normalized: FocusCardItem[] = useMemo(() => {
    if (items && items.length) return items;
    if (cards && cards.length) {
      return cards.map((c) => ({ title: c.title, bgSrc: c.src, href: c.href }));
    }
    return [];
  }, [items, cards]);

  return (
    <div className={cn("grid grid-cols-1 gap-4 justify-center justify-items-center", gridCols, className)}>
      {normalized.map((item, idx) => (
        <FocusCard
          key={idx}
          item={item}
          dimmed={hovered !== null && hovered !== idx}
          onHover={(state) => setHovered(state ? idx : null)}
          className={cardClassName}
          alignCenter={alignCenter}
          pastelHover={pastelHover}
        />)
      )}
    </div>
  );
}

function FocusCard({
  item,
  dimmed,
  onHover,
  className,
  alignCenter,
  pastelHover,
}: {
  item: FocusCardItem;
  dimmed: boolean;
  onHover: (hovered: boolean) => void;
  className?: string;
  alignCenter?: boolean;
  pastelHover?: boolean;
}) {
  // Pastel gradient generator (wide, seamless, organic)
  const gradient = useMemo(() => {
    const make = () => {
      const h = Math.floor(Math.random() * 360);
      const s = 40 + Math.random() * 15; // 40–55%
      const l = 84 + Math.random() * 8;  // 84–92%
      const base = `${h} ${s}% ${l}%`;
      const a = (alpha: number) => `hsl(${base} / ${alpha})`;
      return { a };
    };
    const p1 = make();
    const p2 = make();
    const p3 = make();
    const p4 = make();
    const p5 = make();
    return [
      `linear-gradient(120deg, ${p1.a(0.9)}, ${p2.a(0.9)} 50%, ${p3.a(0.9)})`,
      `radial-gradient(160% 150% at 8% 6%, ${p4.a(0.8)} 0%, ${p4.a(0.0)} 96%)`,
      `radial-gradient(170% 160% at 92% 10%, ${p5.a(0.75)} 0%, ${p5.a(0.0)} 97%)`,
      `radial-gradient(170% 165% at 12% 94%, ${p2.a(0.7)} 0%, ${p2.a(0.0)} 98%)`,
      `radial-gradient(175% 170% at 88% 88%, ${p3.a(0.7)} 0%, ${p3.a(0.0)} 98%)`,
    ].join(", ");
  }, []);

  const content = (
    <motion.div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className={cn(dimmed ? "opacity-60" : "opacity-100", "transition-opacity group relative")}
    >
      {/* Wrap overlay + card together to limit spill */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Hover pastel gradient shadow under the card */}
        {pastelHover && (
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
            style={{
              background: gradient,
              filter: "blur(36px) saturate(1.2) brightness(1.03)",
              transform: "translateY(8px) scale(1.08)",
              borderRadius: 24,
            }}
          />
        )}
        <BackgroundGradient className={cn("relative z-[1] p-0 h-full", className)}>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Content */}
            <div className="relative z-[1] p-5">
              <div className={cn("flex gap-3", alignCenter ? "items-center justify-center" : "items-start") }>
                {item.icon && (
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800/60 flex items-center justify-center text-slate-600">
                  {item.icon}
                  </div>
                )}
                <div className={cn(alignCenter && "text-center") }>
                  <h3 className={cn("text-base md:text-lg font-medium text-gray-800 dark:text-gray-100", alignCenter && "text-center") }>
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className={cn("text-sm mt-0.5 text-gray-500", alignCenter && "text-center")}>{item.subtitle}</p>
                  )}
                </div>
              </div>
              {item.content && (
                <div className={cn("mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200", alignCenter && "text-center") }>
                  {item.content}
                </div>
              )}
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </motion.div>
  );

  if (item.href) {
    return (
      <a href={item.href} onClick={item.onClick} className="block">
        {content}
      </a>
    );
  }
  return content;
}
