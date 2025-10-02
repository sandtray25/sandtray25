"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SandtrayIntroductionPage() {
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
            모래상자 치료 소개
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="md:hidden">
              개념과 이해를 중심으로
              <br className="block md:hidden" />
              모래상자 치료의 핵심을 소개합니다.
            </span>
            <span className="hidden md:inline">
              개념과 이해를 중심으로 한 모래상자 치료의 핵심을 소개합니다.
            </span>
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
            {/* 모래상자 치료의 개념 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자 치료의 개념
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  일정한 크기의 모래상자를 활용하여 상자 안을 꾸미거나, 내담자에 따라 상자 밖에서 소품을 가지고 놀이를 하기도 하는 방법을 말합니다.
                </p>
                <p className="leading-relaxed">
                  즉, 모래상자를 제공하여 상자를 꾸미거나 혹은 상자 안의 모래를 사용하여 놀이를 하거나 작품을 만드는 내담자의 심리적 관점에 초점을 둡니다.
                </p>
                <p className="leading-relaxed">
                  모래놀이치료는 모래가 있는 곳에서 놀이를 하는 것으로, 로저스의 인간중심상담기법을 중요시합니다.
                </p>
              </div>
            </BackgroundGradient>

            {/* 모래상자 치료의 이해 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자 치료의 이해
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  모래상자치료는 내담자의 자기치유력을 기초로 하며, 안전과 자유가 보장된 공간에서 변화가 가능하다고 봅니다.
                </p>
                <p className="leading-relaxed">
                  치료 작업은 표현을 강조하고, 모래놀이는 직접적인 경험을 중시합니다.
                </p>
                <p className="leading-relaxed">
                  로웬펠드는 모래상자 놀이치료가 언어로 표현하기 어려운 내면의 무의식을 드러내게 한다고 보았습니다.
                </p>
                <p className="leading-relaxed">
                  칼프는 모래상자 놀이치료에서 가장 중요한 것은 내담자 자신이 무엇을 경험하고 있는가라는 사실이라고 강조했습니다.
                </p>
                <p className="leading-relaxed">
                  모래상자의 준비물에는 모래상자, 모래, 물, 다양한 소품과 소품장이 포함됩니다.
                </p>
                <p className="leading-relaxed">
                  또한 모래상자치료는 상담사와 내담자 간의 모자일체성을 중요시하며, 신뢰와 안전을 토대로 진행됩니다.
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
