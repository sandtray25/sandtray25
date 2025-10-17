"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  playbackRate?: number;
  designVariant?: 'curved' | 'straight';
  videoSrc?: string;
}

export function Hero({ playbackRate = 1, designVariant = 'curved', videoSrc = '/images/b9_v.mp4' }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        video.playbackRate = playbackRate;
        video.play().catch((err) => {
          console.log('Autoplay prevented, user interaction needed:', err);
        });
      };
      
      const handleError = (e: Event) => {
        const target = e.target as HTMLVideoElement;
        const error = target.error;
        
        if (error) {
          console.log('Video error details:', {
            code: error.code,
            message: error.message,
            src: videoSrc
          });
        }
        
        // 에러 발생 시에도 비디오를 표시하도록 설정
        setVideoLoaded(true);
      };
      
      const handleLoadedData = () => {
        setVideoLoaded(true);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // Force load the video
      video.load();
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [playbackRate, videoSrc]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000000',
        background: '#000000'
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          opacity: videoLoaded ? 1 : 0
        }}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* SVG Mask for Curved Effect */}
      {designVariant === 'curved' && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            {/* 데스크탑용 곡선 */}
            <clipPath id="curvedMaskDesktop" clipPathUnits="objectBoundingBox">
              <path d="
                M 0,0 L 1,0 L 1,0.78
                A 0.55,0.30 0 0 1 0,0.78
                Z" />
            </clipPath>
            {/* 모바일용 곡선 (더 완만함) */}
            <clipPath id="curvedMaskMobile" clipPathUnits="objectBoundingBox">
              <path d="
                M 0,0 L 1,0 L 1,0.90
                A 0.55,0.12 0 0 1 0,0.90
                Z" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Glass Effect Layer with Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[80%]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 95%, transparent 100%)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          ...(designVariant === 'curved' ? { 
            clipPath: isMobile ? 'url(#curvedMaskMobile)' : 'url(#curvedMaskDesktop)' 
          } : {})
        }}
      ></div>

      {/* Text Content */}
      <div className="relative z-20 mx-auto max-w-6xl text-center mt-[-50px] md:mt-[-120px]">
        <div className="flex flex-col items-center gap-6">
          {/* 텍스트 영역 */}
          <motion.div
            className="flex flex-col items-center gap-0 md:gap-1 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* 첫 번째 줄 */}
            <motion.h3
              className="text-[1.5rem] sm:text-[2.25rem] md:text-[2.5rem] text-center sm:whitespace-nowrap mb-0 md:mb-1 px-4"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                fontWeight: 300,
                color: '#E7E7E7',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              내면의 빛을 따라 여행하는
            </motion.h3>

            {/* 두 번째 줄 */}
            <motion.h2
              className="text-[1.85rem] sm:text-[2.75rem] md:text-6xl text-center sm:whitespace-nowrap px-4"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                fontWeight: 700,
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              한국모래상자치료학회
            </motion.h2>

            {/* 설명 텍스트 */}
            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl font-medium text-center mt-6 sm:mt-8 max-w-2xl leading-relaxed sm:whitespace-nowrap mb-4"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                fontWeight: 500,
                color: '#CFCFCF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              마음의 치유와 성장을 위한<br className="sm:hidden" /> 전문 치료학회입니다
            </motion.p>

            {/* 버튼 */}
            <motion.button
              className="mt-12 md:mt-12 px-6 py-2.5 text-white font-medium text-sm relative z-10 cursor-pointer"
              style={{
                fontFamily: 'GMarketSans, sans-serif',
                position: 'relative',
                background: 'rgba(255,255,255,0.21)',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 32px rgba(31,38,135,0.2), inset 0 4px 20px rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px) saturate(170%)',
                WebkitBackdropFilter: 'blur(8px) saturate(170%)',
                overflow: 'hidden'
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              onClick={() => {
                const element = document.getElementById('about-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>더 알아보기</span>
              <div
                style={{
                  content: '',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.10)',
                  borderRadius: '2rem',
                  boxShadow: 'inset -10px -8px 0px -11px rgba(255,255,255,1), inset 0px -9px 0px -8px rgba(255,255,255,1)',
                  opacity: 0.6,
                  zIndex: 0,
                  pointerEvents: 'none',
                  filter: 'blur(2px) brightness(1.07)'
                }}
              />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
