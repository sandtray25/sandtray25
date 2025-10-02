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
  const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
  const logoSrc = r2BucketUrl 
    ? `${r2BucketUrl}/images/logo.png`
    : "/images/logo.png"; // fallback to local path

  return (
    <Link
      href="/"
      className={cn(
        "font-normal flex items-center gap-2 text-sm px-2 py-1 relative z-20",
        visible ? "mr-16" : "mr-4"
      )}
    >
      <Image
        src={logoSrc}
        alt="한국모래상자치료학회 로고"
        width={50}
        height={29}
        className="object-contain block"
      />
      {!visible && !isMobile && (
        <span
          className={cn(
            "text-base font-bold leading-none",
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
            "text-base font-bold leading-none",
            isTestPage ? "text-white" : isMainPage ? "text-white" : "text-black dark:text-white"
          )}
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
      {visible && !isMobile && (
        <span
          className="text-base font-bold text-black dark:text-white leading-none"
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
      {visible && isMobile && (
        <span
          className="text-base font-bold text-black dark:text-white leading-none"
          style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}
        >
          한국모래상자치료학회
        </span>
      )}
    </Link>
  );
};
