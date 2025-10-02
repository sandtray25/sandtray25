"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function SupervisorPage() {
  const years = ["전체", "2016", "2021", "2022"] as const;
  type YearKey = typeof years[number];
  const [active, setActive] = useState<YearKey>("전체");

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
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            1급강사, 수퍼바이저
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="md:hidden">
              모래상자치료 1급 교육강사/수퍼바이저
              <br className="block md:hidden" />
              명단 안내
            </span>
            <span className="hidden md:inline">모래상자치료 1급 교육강사/수퍼바이저 명단 안내</span>
          </motion.p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Year Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActive(y)}
                className={
                  "px-4 py-2 rounded-full text-sm md:text-base transition-colors " +
                  (active === y
                    ? "bg-slate-800 text-white"
                    : "bg-white/70 dark:bg-zinc-900/40 text-gray-700 dark:text-gray-200 border border-white/40 dark:border-white/10 hover:bg-white")
                }
              >
                {y}
              </button>
            ))}
          </div>
          <div className="space-y-6">
            {/* 1급 슈퍼바이저 카드 */}
            <div className="flex justify-center w-full">
              <div className="max-w-4xl w-full">
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px] shadow-[0_8px_16px_rgba(0,0,0,0.06)] p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                    1급 슈퍼바이저
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" ? "모래상자치료 1급과정 슈퍼바이저" : `${active}년 안내`}
                  </p>
                  <div className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" && (
                      <div className="space-y-6 text-left">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-center text-gray-800">전체 1급 슈퍼바이저 명단</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-2 text-gray-800">기본 자격취득자</p>
                              <p>김경희, 이희자, 정경숙, 이복순, 전영희, 김재옥, 이선경, 이경희, 홍은주, 최우영, 채혜정, 이선주, 이무영, 박상희, 구미향, 오숙자, 고희자, 정미라, 선애순, 조미영, 차영희, 주현주, 홍기영, 오지아, 이선희, 안영임, 백현옥, 김수경1, 김은숙, 김미숙, 한재금, 김수경2, 박소현, 이형선, 송순</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2016년</p>
                              <p>임맹자</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2021년</p>
                              <p>우주영, 정영선, 정민, 조정진</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2022년</p>
                              <p>김경희, 이희자, 정경숙, 이복순, 김재옥, 조미영, 주현주, 오지아, 김수경(광주), 송순, 박소현(전주)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {active === "2016" && (
                      <p>임맹자 (2021년 12월까지 자격유지자)</p>
                    )}
                    {active === "2021" && (
                      <p>우주영, 정영선, 정민, 조정진 (2026년 12월까지 자격유지자)</p>
                    )}
                    {active === "2022" && (
                      <p>
                        김경희, 이희자, 정경숙, 이복순, 김재옥, 조미영, 주현주, 오지아, 김수경(광주), 송순,
                        박소현(전주) (2027년 12월까지 자격유지자)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 1급 교육강사 카드 */}
            <div className="flex justify-center w-full">
              <div className="max-w-4xl w-full">
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px] shadow-[0_8px_16px_rgba(0,0,0,0.06)] p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                    1급 교육강사
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" ? "모래상자치료 1급 교육강사" : `${active}년 안내`}
                  </p>
                  <div className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" && (
                      <div className="space-y-6 text-left">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-center text-gray-800">전체 1급 교육강사 명단</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-2 text-gray-800">기본 자격취득자</p>
                              <p>김경희, 이희자, 정경숙, 이복순, 전영희, 김재옥, 이선경, 홍은주, 최우영, 채혜정, 이선주, 이무영, 박상희, 구미향, 오숙자, 고희자, 정미라, 선애순, 조미영, 차영희, 이선희, 안영임, 이형선, 안성민, 송순</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2016년</p>
                              <p>홍기영, 백현옥, 주현주, 오지아, 임맹자, 김수경(광주), 김은숙, 김미숙, 김수경(목포), 박소현(목포), 한재금</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2022년</p>
                              <p>김경희, 이희자, 정경숙, 이복순, 김재옥, 조미영, 주현주, 오지아, 김수경(광주), 송순</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {active === "2016" && (
                      <p>
                        홍기영, 백현옥, 주현주, 오지아, 임맹자, 김수경(광주), 김은숙, 김미숙, 김수경(목포), 박소현(목포),
                        한재금 (2021년 12월까지 자격유지자)
                      </p>
                    )}
                    {active === "2022" && (
                      <p>
                        김경희, 이희자, 정경숙, 이복순, 김재옥, 조미영, 주현주, 오지아, 김수경(광주), 송순 (2027년 12월까지 자격유지자)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
