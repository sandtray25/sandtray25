"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function AnalystPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    console.log('Card clicked:', index); // 디버깅용
    setActiveCard(prev => prev === index ? null : index);
  };

  const analysts = [
    {
      name: "조미영",
      role: "모래상자치료 교육분석가",
      email: "morae015@hanmail.net",
      affiliation: "그레이트심리상담연구소",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "1급 수퍼바이저 & 교육강사",
        "심리상담 15년 경력"
      ]
    },
    {
      name: "이희자",
      role: "모래상자치료 교육분석가",
      email: "gracehjlee@hanmail.net",
      affiliation: "연세우리가족상담센터",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "전문가 수퍼바이저 & 교육강사",
        "가족상담 전문가",
        "심리상담 20년 경력"
      ]
    },
    {
      name: "김경희",
      role: "모래상자치료 교육분석가",
      email: "kkhrosa@hanmail.net",
      affiliation: "한국모래상자치료융연구원",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "전문가 수퍼바이저 & 교육강사",
        "융 심리학 전문가",
        "심리상담 18년 경력"
      ]
    },
    {
      name: "김재옥",
      role: "모래상자치료 교육분석가",
      email: "kjo1125@hanmail.net",
      affiliation: "발달심리지원센터",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "1급 수퍼바이저 & 교육강사",
        "아동발달 전문가",
        "심리상담 16년 경력"
      ]
    },
    {
      name: "정경숙",
      role: "모래상자치료 교육분석가",
      email: "jungks714@naver.com",
      affiliation: "둥근마음 상담연구소",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "1급 수퍼바이저 & 교육강사",
        "상담심리 전문가",
        "심리상담 17년 경력"
      ]
    },
    {
      name: "이복순",
      role: "모래상자치료 교육분석가",
      email: "field2000@hanmail.net",
      affiliation: "길벗심리상담연구소",
      experience: [
        "모래상자치료 교육분석가",
        "모래상자치료 전문가",
        "1급 수퍼바이저 & 교육강사",
        "학회 회장 역임",
        "심리상담 22년 경력"
      ]
    },
    {
      name: "김경희",
      role: "모래상자치료 전문가과정 강사 & 슈퍼바이저",
      email: "kkhrosa@hanmail.net",
      affiliation: "한국모래상자치료융연구원",
      experience: [
        "모래상자치료 전문가과정 강사",
        "모래상자치료 수퍼바이저",
        "융 심리학 연구자",
        "상담 슈퍼비전 전문가",
        "연구 및 교육 15년 경력"
      ]
    },
    {
      name: "이희자",
      role: "모래상자치료 전문가과정 강사 & 슈퍼바이저",
      email: "gracehjlee@hanmail.net",
      affiliation: "연세우리가족상담센터",
      experience: [
        "모래상자치료 전문가과정 강사",
        "모래상자치료 수퍼바이저",
        "가족치료 전문가",
        "상담 교육 전문가",
        "교육 및 슈퍼비전 18년 경력"
      ]
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg,
          #e2e8f0 0%,
          #f1f5f9 15%,
          #f8f9fa 30%,
          #fafafa 45%,
          #f8f9fa 60%,
          #f1f5f9 75%,
          #cbd5e1 90%,
          #94a3b8 100%)`
      }}
    >
      {/* 헤더 */}
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            교육분석가
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="md:hidden">
              모래상자치료 교육분석가 및 전문가과정
              <br className="block md:hidden" />
              강사/수퍼바이저 소개
            </span>
            <span className="hidden md:inline">모래상자치료 교육분석가 및 전문가과정 강사/수퍼바이저 소개</span>
          </motion.p>
        </div>
      </section>

      {/* 본문 */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {analysts.map((analyst, index) => {
              const isFlipped = activeCard === index;

              return (
                <motion.div
                  key={`${analyst.name}-${analyst.role}-${index}`}
                  className="h-80 cursor-pointer group"
                  style={{ perspective: "1500px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCardClick(index);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      WebkitTransformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)"
                    }}
                  >
                    {/* 앞면 */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border border-white/50 bg-white/80 group-hover:bg-gray-100/80 dark:bg-zinc-900/40 dark:group-hover:bg-zinc-800/40 backdrop-blur-[12px] shadow-xl p-6 flex flex-col items-center text-center transition-colors duration-200"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                    >
                      {/* 프로필 사진 */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mb-4 shadow-md">
                        <svg
                          className="w-10 h-10 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>

                      {/* 여백을 위한 플렉스 공간 */}
                      <div className="flex-grow"></div>

                      {/* 하단 정보 */}
                      <div className="mt-auto space-y-2">
                        <h3 className="text-xl font-medium text-gray-800" style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}>
                          {analyst.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                          {analyst.role}
                        </p>
                        <p className="text-xs text-gray-500 break-all" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                          {analyst.email}
                        </p>
                      </div>

                    </div>

                    {/* 뒷면 */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border border-gray-300/50 bg-gray-400/90 dark:bg-gray-700/90 backdrop-blur-[12px] shadow-xl p-6 flex flex-col"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                    >
                      <div className="text-center mb-6">
                        <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg p-4 border border-gray-300 shadow-lg">
                          <h3 className="text-xl font-medium text-gray-700 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}>
                            {analyst.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                            {analyst.affiliation}
                          </p>
                        </div>
                      </div>

                      <div className="flex-grow flex flex-col justify-start text-center overflow-hidden">
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-100 mb-3" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                            전문 경력
                          </h4>
                          <ul className="space-y-1.5 max-h-32 overflow-y-auto">
                            {analyst.experience.map((exp, expIndex) => (
                              <li key={expIndex} className="text-xs text-gray-200 flex items-start justify-center px-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                                <span className="w-1 h-1 bg-white rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                <span className="leading-relaxed text-left break-words">{exp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
