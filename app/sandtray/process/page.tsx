"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SandtrayProcessPage() {
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
      {/* 헤더 섹션 */}
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            모래상자치료 과정
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            발전 단계와 치료 과정을 핵심 위주로 정리합니다.
          </motion.p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* 모래상자치료의 발전단계 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자치료의 발전단계
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">치료의 시작은 내담자가 모래상자를 보는 순간입니다.</p>
                <p className="leading-relaxed">심리적 발달 과정은 개인차가 있습니다.</p>
                <p className="leading-relaxed">노이만은 모성적 자기애가 있을 때 전체성의 탄생이 이루어진다고 보았습니다.</p>
                <div className="bg-white/40 dark:bg-zinc-900/20 rounded-lg p-4 border border-white/30 dark:border-white/10">
                  <p className="font-medium text-gray-800 mb-2">노이만의 자아 발달 단계</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>동·식물의 단계</li>
                    <li>투쟁의 단계</li>
                    <li>집단 적응 단계</li>
                  </ul>
                </div>
                <p className="leading-relaxed">종결 시점에는 내담자가 자신을 독립적이며 완성된 개체로 느끼면서 창의적인 장면을 구성합니다.</p>
              </div>
            </BackgroundGradient>

            {/* 모래상자치료의 치료과정 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자치료의 치료과정
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  모래상자치료 과정을 통해 상담사는 자궁과 같은 조건을 마련하여 내담자의 손상된 어머니 심상(mother-image)을 변화시키고, 이를 통해 자기를 활성화하며 부적절한 자아를 치유하여 심리적 재탄생을 돕습니다.
                </p>
                <p className="leading-relaxed">
                  상담사는 친절하고 여유 있게 모래상자치료실을 소개합니다. 내담자가 완성한 모래상자의 세계는 파일로 보존하기 위해 사진을 찍거나 그림으로 기록할 수 있으나, 모든 과정을 기록할 필요는 없습니다. 상담사는 안내자이자 관찰자로서, 기록이 내담자의 자기로의 여행에 도움이 되는 지도 역할을 하도록 합니다.
                </p>
                <p className="leading-relaxed">모래상자치료는 만들기, 자유 연상하기, 질문과 응답, 사진 찍기, 허물기의 단계를 거칩니다.</p>
                <p className="leading-relaxed">칼프는 모래상자치료에서 가장 중요한 것은 내담자 자신이 무엇을 경험하고 있는가라는 사실이라고 강조했습니다.</p>
                <p className="leading-relaxed">충분한 관찰과 함께 작품에 대하여 나누는 시간을 갖도록 합니다.</p>
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}

