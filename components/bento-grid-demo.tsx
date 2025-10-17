"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/button";
import NoticeTableDemo from "@/components/notice-table";
import GalleryCarousel from "@/components/gallery-carousel";
import Link from "next/link";

export function BentoGridDemo() {
  return (
    <div className="relative z-10 pt-2 pb-0 md:py-4 px-4">
      <BentoGrid className="max-w-4xl mx-auto auto-rows-[18rem] md:auto-rows-[20rem]">
        {items.map((item, i) => {
          return (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              action={item.action}
            />
          );
        })}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "학회소개",
    description: "새로운 치유와 성장이 시작되는 공간",
    header: (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl"
        style={{
          backgroundImage: "url('/images/card1.png')"
        }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 120, 93, 0.1) 0%, rgba(75, 59, 115, 0.15) 50%, rgba(139, 120, 93, 0.1) 100%)'
          }}
        ></div>
      </div>
    ),
    className: "md:col-span-2 relative overflow-hidden bg-gradient-to-br from-amber-50/30 to-purple-50/30 border border-amber-100/30",
    action: (
      <Link href="/about/greeting">
        <Button
          as="button"
          variant="primary"
          className="bg-white/90 hover:bg-white text-black text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2 hover:-translate-y-1 transition-all duration-200 shadow-lg"
          style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
        >
          알아보기
        </Button>
      </Link>
    ),
  },
  {
    title: "",
    description: "",
    header: (
      <div className="absolute inset-0 flex flex-col w-full h-full rounded-xl">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 243, 219, 0.95) 0%, rgba(243, 232, 255, 0.95) 100%)',
            backdropFilter: 'blur(8px)'
          }}
        ></div>
        <div className="relative z-10 flex flex-col h-full p-4">
          <div className="mb-3 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <h3 className="font-bold text-base md:text-lg lg:text-xl text-neutral-800" style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontWeight: 700
              }}>
                최신소식
              </h3>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <NoticeTableDemo />
          </div>
        </div>
      </div>
    ),
    className: "md:col-span-1 relative overflow-hidden bg-gradient-to-br from-amber-50/40 to-purple-50/40 border border-amber-100/50 shadow-md hover:shadow-lg transition-all duration-300",
  },
  {
    title: "자격증 정보",
    description: "전문가 과정 안내",
    header: (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat rounded-t-xl"
        style={{
          backgroundImage: "url('/images/card3.png')"
        }}
      >
        <div
          className="absolute inset-0 rounded-t-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 120, 93, 0.1) 0%, rgba(75, 59, 115, 0.15) 50%, rgba(139, 120, 93, 0.1) 100%)'
          }}
        ></div>
      </div>
    ),
    className: "md:col-span-1 bg-gradient-to-br from-amber-50/30 to-purple-50/30 border border-amber-100/30 relative overflow-hidden",
    action: (
      <Link href="/certification/process">
        <Button
          as="button"
          variant="primary"
          className="bg-white/90 hover:bg-white text-black text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2 hover:-translate-y-1 transition-all duration-200 shadow-lg"
          style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
        >
          알아보기
        </Button>
      </Link>
    ),
  },
  {
    title: "갤러리",
    description: "학회의 아름다운 순간들을 만나보세요",
    header: (
      <div className="absolute inset-0">
        <GalleryCarousel />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 120, 93, 0.3) 0%, rgba(75, 59, 115, 0.4) 50%, rgba(139, 120, 93, 0.3) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
          }}
        ></div>
      </div>
    ),
    className: "md:col-span-2 relative overflow-hidden gallery-card bg-gradient-to-br from-amber-50/30 to-purple-50/30 border border-amber-100/30",
    action: (
      <Link href="/about/history">
        <Button
          as="button"
          variant="primary"
          className="bg-white/90 hover:bg-white text-black text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2 hover:-translate-y-1 transition-all duration-200 shadow-lg"
          style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
        >
          더 보기
        </Button>
      </Link>
    ),
  },
];