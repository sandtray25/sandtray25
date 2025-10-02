"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

export function TestHero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        setInitialLoad(false);
        video.play().catch(console.error);
      };

      const handleError = (e: Event) => {
        console.error('Video loading error:', e);
        setInitialLoad(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Force load the video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 후 짧은 딜레이로 초기 로딩 상태 해제
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/bg_img.png')`,
          opacity: videoLoaded ? 0 : (initialLoad ? 0 : 1),
          transition: initialLoad ? 'none' : 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: initialLoad ? 'none' : 'opacity 0.3s ease-in-out',
          filter: 'blur(1px)'
        }}
        muted
        loop
        playsInline
      >
        <source src="/images/bg_video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Background Layer */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `linear-gradient(135deg,
            #0f1419 0%,
            #1a2332 25%,
            #2d4a6b 50%,
            #4a7c8a 75%,
            #6ba8a0 100%)`
        }}
      />

      {/* Black Opacity Overlay (reduced) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Vignetting Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)`
        }}
      ></div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

      {/* Text Content */}
      <div className="relative z-20 mx-auto -mt-16 max-w-6xl text-center" style={{ marginTop: '120px' }}>
        <div className="flex flex-col items-center gap-6">
          {/* 텍스트 영역 */}
          <motion.div
            className="flex flex-col items-center gap-1 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* 첫 번째 줄 */}
            <motion.h3
              className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] text-center text-white whitespace-nowrap"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                fontWeight: 300,
                marginBottom: '0.25rem'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              내면의 빛을 따라 여행하는
            </motion.h3>

            {/* 두 번째 줄 */}
            <motion.h2
              className="text-[2.25rem] sm:text-[2.75rem] md:text-6xl text-center text-white whitespace-nowrap"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                fontWeight: 700
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              한국모래상자치료학회
            </motion.h2>

            {/* 설명 텍스트 */}
            <motion.p
              className="text-lg sm:text-lg md:text-lg lg:text-xl font-light text-center text-white/90 mt-16 sm:mt-12 max-w-2xl leading-relaxed sm:whitespace-nowrap"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              마음의 치유와 성장을 위한<br className="sm:hidden" />
              전문 치료학회입니다
            </motion.p>
          </motion.div>

          {/* 버튼 영역 */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 md:gap-4 mt-20 md:mt-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.button
              className="flex flex-row justify-center items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/training/instructor')}
            >
              <span className="text-black/100 font-normal text-base" style={{ fontFamily: 'GMarketSans, sans-serif' }}>교육 신청하기</span>
            </motion.button>

            <motion.button
              className="flex flex-row justify-center items-center px-6 py-3 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/resources/analyst')}
            >
              <span className="text-white/100 font-normal text-base" style={{ fontFamily: 'GMarketSans, sans-serif' }}>전문가 찾기</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
