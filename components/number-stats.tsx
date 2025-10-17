"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// 카운트업 훅
function useCountUp(end: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [started, end, duration, delay]);

  return { count, start: () => setStarted(true) };
}

// 개별 통계 항목 컴포넌트
function StatItem({
  number,
  suffix = "",
  label,
  delay = 0,
  icon,
  iconColor,
  textColor,
  labelColor
}: {
  number: number;
  suffix?: string;
  label: string;
  delay?: number;
  icon: React.ReactNode;
  iconColor: string;
  textColor: string;
  labelColor: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count, start } = useCountUp(number, 2000, delay);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <motion.div
        className="mb-4"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: (delay / 1000) + 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: 'Noto Sans KR, sans-serif', color: textColor }}
      >
        {count}{suffix}
      </motion.div>
      <div
        className="text-sm md:text-base text-center"
        style={{ fontFamily: 'Noto Sans KR, sans-serif', color: labelColor }}
      >
        {label}
      </div>
    </motion.div>
  );
}


export default function NumberStats() {
  const stats = [
    { number: 15, suffix: "년", label: "역사", icon: <img src="/images/n1.png" alt="역사" className="w-25 h-25 opacity-80" style={{ width: '100px', height: '100px' }} />, iconColor: '#3b82f6', textColor: '#2563eb', labelColor: '#1d4ed8' },
    { number: 3000, suffix: "+", label: "수료생", icon: <img src="/images/n2.png" alt="수료생" className="w-25 h-25 opacity-80" style={{ width: '100px', height: '100px' }} />, iconColor: '#10b981', textColor: '#059669', labelColor: '#047857' },
    { number: 98, suffix: "%", label: "만족도", icon: <img src="/images/n3.png" alt="만족도" className="w-25 h-25 opacity-80" style={{ width: '100px', height: '100px' }} />, iconColor: '#f59e0b', textColor: '#d97706', labelColor: '#b45309' },
    { number: 200, suffix: "+", label: "강사진", icon: <img src="/images/n4.png" alt="강사진" className="w-25 h-25 opacity-80" style={{ width: '100px', height: '100px' }} />, iconColor: '#ef4444', textColor: '#dc2626', labelColor: '#b91c1c' }
  ];

  return (
    <section className="relative pt-48 pb-16 px-4 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 제목 */}
        <motion.h1
          className="text-3xl md:text-6xl text-center mb-30 relative z-20 mt-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 bg-opacity-50"
          style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          숫자로 보는 학회의 성장
        </motion.h1>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
              icon={stat.icon}
              iconColor={stat.iconColor}
              textColor={stat.textColor}
              labelColor={stat.labelColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}