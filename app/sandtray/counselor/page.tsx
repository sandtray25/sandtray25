"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SandtrayCounselorPage() {
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
            모래상자치료 상담사
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            상담사의 역할과 전이·역전이를 핵심 위주로 정리합니다.
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
            {/* 모래상자상담사의 역할 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자상담사의 역할
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  모래상자치료에서 상담사의 핵심 역할은 공감적 수용입니다. 상담사의 존재 방식과 태도는 치료의 질을 좌우하므로 무엇보다 중요합니다.
                </p>
                <p className="leading-relaxed">
                  모래상자치료는 심층 수준(matriarchical level)의 퇴행을 격려합니다. 언어 이전 단계의 정서적이고 비합리적인 과정 안에서, 아동의 상징적이고 적극적인 환상 작업이 자유롭고 안정된 공간에서 이루어지도록 돕습니다.
                </p>
                <p className="leading-relaxed">
                  지시하지 않는 대신 모래와 장난감을 활용해 마음 내키는 대로 무엇이든 만들어도 좋다고 안내합니다. 상담사는 조용히 곁에서 내담자의 행동과 반응을 관찰하며, 모래상자에 드러나는 마음의 흐름을 따라갑니다.
                </p>
                <p className="leading-relaxed">
                  상담사는 정보를 제공하거나 특정 방식의 직면과 연상을 강요하지 않습니다. 완성된 장면은 사진으로 기록하되, 작품에 대한 해석을 제공하지 않으며 사진도 보여주지 않습니다. 일련의 과정 속에서 드러나는 회고적 작품으로 바라보는 데에 가치가 있습니다.
                </p>
              </div>
            </BackgroundGradient>

            {/* 모래상자치료의 전이와 역전이 */}
            <BackgroundGradient className="p-8 md:p-10">
              <h2 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                모래상자치료의 전이와 역전이
              </h2>
              <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <p className="leading-relaxed">
                  전이는 내담자가 과거의 중요한 타인에게 느꼈던 감정과 환상을 무의식적으로 상담사에게 이동시키는 현상을 뜻합니다. 치료가 진행되면 아동기의 감정이나 갈등이 무의식으로부터 표면으로 떠오르기 시작하고, 내담자는 정서적으로 퇴행할 수 있습니다.
                </p>
                <p className="leading-relaxed">
                  효과적인 치료를 위해서는 전이 관계를 훈습하는 과정이 필요합니다. 훈습은 무의식의 자료와 방어 기제를 탐색하며, 반복적 해석과 저항의 양상을 살피는 작업을 통해 이루어집니다.
                </p>
                <p className="leading-relaxed">
                  역전이는 상담사가 내담자에게 느끼는 감정과 그에 따른 반응을 말합니다. 융의 관점에서 치료가 깊어질수록 상담사는 내담자의 개성화 과정에 더 깊이 관여하며, 적극적인 역전이 태도로 무의식의 새로운 내용과의 관련을 유지합니다.
                </p>
                <p className="leading-relaxed">
                  모래상자치료에서는 상담사와 내담자 간의 인간적 관계가 공유되고 함께 시행되는 과정으로서, 전이와 역전이는 무의식과의 접촉을 지속시키는 데 유효한 요소로 작용합니다.
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

