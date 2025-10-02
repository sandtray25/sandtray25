"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default function GreetingPage() {
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
            학회장 인사말
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회에 오신 것을 환영합니다
          </motion.p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 학회장 사진 */}
            <motion.div
              className="relative flex justify-center lg:justify-center lg:pl-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="w-80 h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/images/about/h1.png"
                    alt="김재옥 학회장"
                    width={320}
                    height={384}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-2xl font-medium text-gray-800 mb-2"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  김재옥 학회장
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  한국모래상자치료학회 6대 학회장
                </p>
              </div>
            </motion.div>

            {/* 인사말 내용 */}
            <motion.div
              className="space-y-6 lg:pr-30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div>
                <div className="prose prose-lg max-w-none">
                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    안녕하십니까?<br />
                    한국모래상자치료학회장을 맡게 된 김재옥입니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    부족한 소인으로 막중한 임무와 학회원 모든 분의 소망에 합당하게 충족되시길 소망하는 마음으로 부족함이 많지만, 맡겨진 소명에 최선을 다하도록 노력하겠습니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    그동안 학회 발전을 위해 수고하신 선임학회장님의 노력으로 학회 위상이 단단하게 성장해 가고 있음에 감사드립니다. 모래상자 학회는 사회적 욕구에 충족하기 위한 책임감이 막중한 시기에 마음이 힘들고 어려운 내담자들을 위해 회원여러분들의 노력이 요구되는 시기에 함께 계십니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    선임학회장님들의 토대를 발판 삼아 회원들의 고견을 경청하며 교육과 연수 기회를 통해 내실 있는 회원님들의 성장을 위해 노력하겠습니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 학회는 초대 회장님이신 김경희 교수님께서 스위스 융 연구소 공인 정신분석가로서 &apos;한국모래상자치료 융 연구원(SANDTRAY THERAPY)&apos;을 개설하시고 전문가를 위한 재교육의 장이 마련되었습니다. 회원의 지성적 발전을 위해 노력하고 계신 가운데 더욱 학회에 힘이 될 것으로 기대됩니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    저는 본 학회장으로서 회원들의 개인적 성장을 위해 사회적 욕구에 필요한 다양한 내용으로 수준 높은 지원이 되도록 임원진들과 함께하겠습니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    회원님들이 제 자리에서 제 몫에 충실하면서 역할 해 갈 수 있도록 힘쓸 것이며 상담자로서 윤리적 의식을 토대로 미래를 향해 성장해 갈 수 있게 하겠습니다.
                  </p>

                  <p
                    className="text-gray-700 leading-relaxed mb-6"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    상담자로서 기본적인 정신을 잊지 않는 모래상자치료학회 회원으로 곁에서 응원해 주시길 부탁드립니다. 함께하는 학회장으로서 다양성 안에서 일치된 모습으로 성장해 가는 모래상자치료학회가 되도록 힘쓰겠습니다.
                  </p>

                  <div className="border-t pt-6 mt-8">
                    <p
                      className="text-right text-gray-800 font-medium"
                      style={{ fontFamily: 'GMarketSans, sans-serif' }}
                    >
                      한국모래상자치료학회 6대 학회장<br />
                      김재옥 올림
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 푸터 */}
      <Footer />
    </main>
  );
}