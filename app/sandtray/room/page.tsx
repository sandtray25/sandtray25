"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SandtrayRoomPage() {
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
            모래상자치료실
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            치료실 비품과 환경 구성을 핵심 위주로 정리합니다.
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
            {/* 모래상자치료의 비품 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자치료의 비품
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  모래상자치료실은 작은 공간과 비품으로 이루어집니다. 비품에는 모래상자, 소품, 물통, 건축 구조, 카메라, 테이블, 선반 등이 포함됩니다.
                </p>
                <p className="leading-relaxed">
                  모래상자의 크기와 형태는 다양하게 발전해 왔습니다. 로웬펠드와 칼프가 제안한 규격이 널리 사용되며, 내부가 하늘색 또는 물색으로 보이도록 칠해진 나무나 금속 상자를 사용합니다. 표준 크기는 57 × 72 × 7cm입니다. 직사각형 외에도 정사각형, 둥근 모양 등 다양한 형태의 유용한 상자가 있습니다.
                </p>
                <p className="leading-relaxed">
                  모래와 물은 사람과 우주를 연결하는 상징성이 큽니다. 물은 모든 존재와 가능성의 근원이며, 모래는 신체를 구성하는 것으로서 지구를 상징하고 사랑과 다신의 의미, 여성성의 표현으로 볼 수 있습니다.
                </p>
                <p className="leading-relaxed">
                  소품은 내담자의 의식적·무의식적 언어를 상징하여 선택됩니다. 가능한 많은 소품을 탐색하고 선택할 수 있게 하며, 내담자의 개인적·선택적·문화적·영적·신체적 영역에서 최고의 표상으로 기능하도록 구성합니다.
                </p>
              </div>
            </BackgroundGradient>

            {/* 모래상자치료의 환경 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자치료의 환경
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  모래상자와 소품을 위해 분리된 공간을 제공하는 것이 좋습니다. 모래상자 공간이 놀이치료실과 분리되어 눈에 잘 띄는 곳에 위치한다면, 내담자는 자연스럽게 관심을 보이며 모래상자에 관해 상담사에게 질문할 수 있습니다.
                </p>
                <p className="leading-relaxed">
                  카메라는 장면을 촬영할 수 있도록 물과 모래에서 떨어진 곳에 둡니다. 치료실의 작업 공간은 항상 깔끔하고 정돈되어 있어야 합니다.
                </p>
                <p className="leading-relaxed">
                  소품을 진열할 때 여러 개의 선반을 사용하는 경우 일부는 닫아 두거나 가려 두고, 한 번에 상담사가 감당할 수 있는 폭만큼만 열어 두는 것이 좋습니다. 선반은 4–12"의 깊이와 6–3"의 너비가 적당하며, 주로 나무와 플라스틱 소재를 사용합니다.
                </p>
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

