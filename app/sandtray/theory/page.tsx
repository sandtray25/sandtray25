"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SandtrayTheoryPage() {
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
            모래상자 치료 이론
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            융, 로웬펠드, 칼프의 관점을 중심으로 정리합니다.
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
            {/* 융과 모래상자치료 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-4" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                융과 모래상자치료
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  융은 인간의 개성화 과정을 강조하며, 개인이 자신의 전체성을 실현하여 인격을 이루는 이상에 도달하기 위해 일상 전체를 통해 자기를 찾아가는 과정이라고 보았습니다. 개성화 과정은 자기에 도달하기 위해 의식과 무의식의 통합을 지향하는 인간의 정신 작용이라고 설명합니다.
                </p>
                <div className="bg-white/40 dark:bg-zinc-900/20 rounded-lg p-4 border border-white/30 dark:border-white/10">
                  <p className="font-medium text-gray-800 mb-2">개성화 과정의 단계</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>그림자와의 만남 단계</li>
                    <li>영혼의 심상(아니마/아니무스)과의 만남 단계</li>
                    <li>자기(Self) 원형과의 만남 단계</li>
                  </ul>
                </div>
                <p className="leading-relaxed">
                  개성화 과정은 인간의 여러 정신적 요소를 통합하는 정신 작용이며, 각성의 체험을 통해 인격을 변화시키고 인격 발달을 지속시키는 과정입니다.
                </p>
                <p className="leading-relaxed">
                  결론적으로 개성화는 인간의 정신 요소를 이루는 수많은 대극쌍을 재통합하여, 의식과 무의식을 아우르는 전일적 인간으로 나아가는 자기 실현의 과정입니다.
                </p>
              </div>
            </BackgroundGradient>

            {/* 로웬펠드의 모래상자치료 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-4" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                로웬펠드의 모래상자치료
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  로웬펠드는 암울한 어린 시절과 전쟁의 경험을 바탕으로 아동의 불안, 신경증적 증상, 반사회적 행동 등에 관심을 갖게 되었고,
                  세계기법을 개발하여 모래상자에 모래를 담고 소품으로 꾸미는 방법을 처음 제안한 학자입니다.
                </p>
                <p className="leading-relaxed">
                  모래상자는 아동이 1차 사고 체계의 과정을 표현하기에 적절한 기법으로 개발되었으며, 임상 연구를 통해 과학적이고 임상적인 치료 방법임을 확신했습니다.
                </p>
                <p className="leading-relaxed">
                  아동이 놀이를 통해 1차 사고 체계를 충분히 표현하면서 성장하면 자연스럽게 2차 사고 체계가 발달합니다. 반대로 이러한 기회가 없을 경우 1차 과정을 거치지 못한 채 2차 사고 체계로 넘어가 미해결 과제가 신경증적으로 표현될 수 있습니다.
                </p>
                <p className="leading-relaxed">
                  따라서 아동기에 언어적 표현을 논리적으로 이해하기 어려운 시기에는 놀이 매체를 통한 상호작용으로 의사소통을 이해하도록 돕는 것이 발달을 촉진하고 문제를 예방하는 효과적인 방법입니다.
                </p>
              </div>
            </BackgroundGradient>

            {/* 칼프와 모래상자치료 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-4" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                칼프와 모래상자치료
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  도라 칼프는 모래놀이를 창시한 융의 제자로, 로웬펠드의 세계기법에서 영감을 받아 모래놀이를 체계화했습니다. 칼프는 인간의 내적 잠재력을 강조하며, 누구나 안전감과 안정이 보장된 환경에서 자유롭게 표현하는 과정 속에서 자기(Self)의 전체성(wholeness)을 획득할 수 있다고 보았습니다.
                </p>
                <p className="leading-relaxed">
                  신뢰할 수 있는 환경에서 치료의 모자일체성이 회복되며, 이는 지성과 영적 측면을 아우르는 전체적 인격 발달의 원동력이 됩니다.
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
