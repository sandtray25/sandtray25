"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default function PurposePage() {
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
            설립목적
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회의 설립 목적과 비전
          </motion.p>
        </div>
      </section>

      {/* 이미지 섹션 */}
      <section className="pt-4 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-full max-w-[32rem] h-64 sm:h-80 mx-auto mb-4 rounded-lg overflow-hidden flex items-center justify-center drop-shadow-lg">
              <Image
                src="/images/about/st.png"
                alt="모래상자치료"
                width={512}
                height={384}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 설립목적 내용 */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2
              className="text-3xl font-medium text-gray-800 mb-12 text-center"
              style={{ fontFamily: 'GMarketSans, sans-serif' }}
            >
              설립 목적
            </h2>

            <div className="space-y-12 max-w-3xl mx-auto">
              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  개인의 행복한 삶
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  개인의 행복한 삶을 유지하고 발전시키기 위하여<br className="hidden lg:block" />
                  자신을 이해하는데 도움을 주는 모래상자치료법을 적용하고자 한다.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  전문가 양성
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  본 학회는 아동기에서 노년기에 이르는 대상에게 도움을 주고자<br className="hidden lg:block" />
                  모래상자치료전문가를 배출하고 모래상자치료를 위한 상품을 개발한다.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  한국적 토착화
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  본 학회에서는 우리나라의 문화에 적합한 소품을 보급하며<br className="hidden lg:block" />
                  모래상자치료의 한국적 토착화를 도모하고자 한다.
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