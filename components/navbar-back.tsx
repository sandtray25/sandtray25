"use client";
import React, { useState, useEffect } from "react";

export function NavbarBack() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤이 시작되면 (10px 이상) 사라지게 함
      if (currentScrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 처음부터 자연스러운 그라데이션 */}
      <div
        className="w-full h-16 md:h-18"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.4) 72%, rgba(0, 0, 0, 0.35) 78%, rgba(0, 0, 0, 0.3) 83%, rgba(0, 0, 0, 0.25) 87%, rgba(0, 0, 0, 0.2) 90%, rgba(0, 0, 0, 0.15) 93%, rgba(0, 0, 0, 0.1) 95%, rgba(0, 0, 0, 0.05) 97%, rgba(0, 0, 0, 0.02) 98%, rgba(0, 0, 0, 0.01) 99%, rgba(0, 0, 0, 0) 100%)'
        }}
      />
    </div>
  );
}