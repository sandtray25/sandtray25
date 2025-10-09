"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  visible?: boolean;
  isMobile?: boolean;
  isMainPage?: boolean;
  isTestPage?: boolean;
}

export const Logo = ({ visible = false, isMobile = false, isMainPage = true, isTestPage = false }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "font-normal flex items-center gap-2 text-sm px-2 py-1 relative z-20",
        visible ? "mr-16" : isMobile ? "mr-0 w-full" : "mr-4"
      )}
    >
      <Image
        src="/images/logo.png"
        alt="한국모래상자치료학회 로고"
        width={isMobile ? 45 : 50}
        height={isMobile ? 26 : 29}
        className="object-contain block"
        priority
      />
      {!visible && !isMobile && (
        <span
          className={cn(
            "text-sm lg:text-base font-bold leading-none translate-y-0.5 whitespace-nowrap",
            isTestPage ? "text-white" : isMainPage ? "text-white" : "text-black dark:text-white"
          )}
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
      {!visible && isMobile && (
        <span
          className={cn(
            "text-base sm:text-lg md:text-xl font-bold leading-none self-center translate-y-0.5 whitespace-nowrap",
            isTestPage ? "text-white" : isMainPage ? "text-white" : "text-black dark:text-white"
          )}
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
      {visible && !isMobile && (
        <span
          className="text-xs lg:text-sm xl:text-base font-bold text-black dark:text-white leading-none translate-y-0.5 whitespace-nowrap"
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
      {visible && isMobile && (
        <span
          className="text-sm sm:text-base md:text-lg font-bold text-black dark:text-white leading-none self-center translate-y-0.5 whitespace-nowrap"
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
    </Link>
  );
};
