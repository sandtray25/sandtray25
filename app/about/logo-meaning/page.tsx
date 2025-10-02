"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default function LogoMeaningPage() {
  return (
    <main 
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, 
          #fafafa 0%, 
          #f8f9fa 20%, 
          #f1f5f9 40%, 
          #e2e8f0 60%, 
          #cbd5e1 80%, 
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
            로고의미
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회 로고의 의미
          </motion.p>
        </div>
      </section>

      {/* 로고 이미지 섹션 */}
      <section className="pt-4 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-full max-w-[24rem] h-48 sm:h-64 mx-auto mb-4 rounded-lg overflow-hidden flex items-center justify-center drop-shadow-lg">
              <Image
                src="/images/about/l1.png"
                alt="한국모래상자치료학회 로고"
                width={384}
                height={256}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 로고 의미 설명 */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >

            <div className="space-y-12 max-w-3xl mx-auto">
              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  모래상자 상징
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  로고는 전체적 그림이 모래상자를 상징하며, 모래상자치료의 핵심 요소를 시각적으로 표현합니다.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  내면의 나
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  동그라미는 우리가 알고 있는 나에서 우리가 모르는 내면의 나를 상징하는 것으로,<br className="hidden lg:block" />
                  크기가 큰 것이 많이 아는 나이고 점차적으로 아는 부분이 적은 것으로 표현하고 있습니다.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  무한의 내면세계
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  전체적으로 무한의 내면세계를 상징하고 있습니다.<br className="hidden lg:block" />
                  이는 모래상자치료를 통해 탐구할 수 있는 인간의 무한한 내면 세계를 나타냅니다.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  치유 과정
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  로고는 모래상자치료의 치유 과정을 상징적으로 표현한 것으로,<br className="hidden lg:block" />
                  내면의 탐구와 치유를 통한 성장과 변화의 여정을 의미합니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
