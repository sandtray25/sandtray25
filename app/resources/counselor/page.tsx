"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function CounselorResourcePage() {
  const years = [
    "전체",
    "2014",
    "2016",
    "2017",
    "2018(갱신)",
    "2018",
    "2019",
    "2020",
    "2021(갱신)",
    "2022",
    "2023",
    "2024",
  ] as const;
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
            상담사
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="md:hidden">
              모래상자상담사 1급·2급
              <br className="block md:hidden" />
              명단 및 갱신 안내
            </span>
            <span className="hidden md:inline">모래상자상담사 1급·2급 명단 및 갱신 안내</span>
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
            {/* 상담사 1급 카드 */}
            <div className="flex justify-center w-full">
              <div className="max-w-4xl w-full">
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px] shadow-[0_8px_16px_rgba(0,0,0,0.06)] p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                    상담사 1급
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" ? "모래상자상담사 1급 명단" : `${active} 안내`}
                  </p>
                  <div className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" && (
                      <div className="space-y-6 text-left">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-center text-gray-800">전체 1급 명단</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2014년 이전</p>
                              <p>김화평, 이형선, 김복진, 권계순, 목진아, 정민희, 이영희, 문기임1, 이효숙, 문기임2, 김영아, 김연숙, 홍수현, 송지영, 정미영, 정은주, 민경현, 선지혜, 손미애, 심순애, 안진아, 장보경, 장창현덕, 고현주, 노민자, 김은정, 신화숙, 이춘지, 박은선, 노슬기, 맹현숙, 박순희, 이상희, 장청아, 김금단, 김은영, 박순희, 박미라, 정혜영, 차운화, 신화숙, 최갑덕, 최현희, 오은영, 김정선, 최애라, 김민하, 박미희, 용현화, 이혜영, 정 운, 손경순</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2014년</p>
                              <p>강미영, 김연옥, 김용선, 박소현(전주), 반평자, 윤행란, 이리다, 정승연, 조정진</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2016년</p>
                              <p>김정희, 지명자</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2017년</p>
                              <p>나명희, 손연실, 오현옥, 윤지혜, 장해윤, 진봉희</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2018년(갱신)</p>
                              <p>김정희, 박미희, 박은선, 손연실, 한지혜, 이은정, 최경숙, 김은숙, 강미영, 공민아, 김금희, 박소현(전주), 염경자, 박순복, 박지현, 반평자, 서신자, 오현옥, 이유진, 장해윤, 정어진, 조정진, 최 옥, 진봉희, 한진희, 김동수, 김연옥, 김영림, 김용선, 김해정, 나명희 박천웅, 염경자, 윤지혜, 이영애, 이은주, 정승연, 안소연</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2018년</p>
                              <p>임성희, 조 옥, 박선숙, 박은영</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2020년</p>
                              <p>강명임, 백종운, 황순덕</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2021년(갱신)</p>
                              <p>한진희, 박천웅, 김동수, 김해정, 박순복, 반평자, 이영애, 오인경, 김금희, 이은주, 이유진, 임성희, 나명희</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2022년</p>
                              <p>강민정, 김미희, 김영선, 김정원, 김현진, 나승희, 박향란, 백영남, 선미란, 양선희, 윤혜향, 이재경, 이지숙, 정진희</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2023년</p>
                              <p>이주영, 정현선, 현준영</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2024년</p>
                              <p>김영아, 김종호, 박서은, 박희정</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {active === "2014" && (
                      <p>강미영, 김연옥, 김용선, 박소현(전주), 반평자, 윤행란, 이리다, 정승연, 조정진 (2017년 12월까지 자격유지자)</p>
                    )}
                    {active === "2016" && <p>김정희, 지명자 (2019년 12월까지 자격유지자)</p>}
                    {active === "2017" && <p>나명희, 손연실, 오현옥, 윤지혜, 장해윤, 진봉희 (2020년 12월까지 자격유지자)</p>}
                    {active === "2018(갱신)" && (
                      <p>
                        김정희, 박미희, 박은선, 손연실, 한지혜, 이은정, 최경숙, 김은숙, 강미영, 공민아, 김금희, 박소현(전주),
                        염경자, 박순복, 박지현, 반평자, 서신자, 오현옥, 이유진, 장해윤, 정어진, 조정진, 최 옥, 진봉희, 한진희,
                        김동수, 김연옥, 김영림, 김용선, 김해정, 나명희 박천웅, 염경자, 윤지혜, 이영애, 이은주, 정승연, 안소연
                        (2021년 2월까지 자격유지자)
                      </p>
                    )}
                    {active === "2018" && <p>임성희, 조 옥, 박선숙, 박은영 (2021년 12월까지 자격유지자)</p>}
                    {active === "2020" && <p>강명임, 백종운, 황순덕 (2023년 12월 4일까지 자격유지자)</p>}
                    {active === "2021(갱신)" && (
                      <p>
                        한진희, 박천웅, 김동수, 김해정, 박순복, 반평자, 이영애, 오인경, 김금희, 이은주, 이유진, 임성희, 나명희
                        (2024년 2월까지 자격유지자)
                      </p>
                    )}
                    {active === "2022" && (
                      <p>
                        강민정, 김미희, 김영선, 김정원, 김현진, 나승희, 박향란, 백영남, 선미란, 양선희, 윤혜향, 이재경, 이지숙, 정진희
                        (2025년 12월까지 자격유지자)
                      </p>
                    )}
                    {active === "2023" && <p>이주영, 정현선, 현준영 (2026년 12월까지 자격유지자)</p>}
                    {active === "2024" && <p>김영아, 김종호, 박서은, 박희정 (2027년 12월까지 자격유지자)</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 상담사 2급 카드 */}
            <div className="flex justify-center w-full">
              <div className="max-w-4xl w-full">
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px] shadow-[0_8px_16px_rgba(0,0,0,0.06)] p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                    상담사 2급
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" ? "모래상자상담사 2급 명단" : `${active} 안내`}
                  </p>
                  <div className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {active === "전체" && (
                      <div className="space-y-6 text-left">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-center text-gray-800">전체 2급 명단</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2014년</p>
                              <p>강경주, 손지연, 이지혜, 심재원, 임채랑, 이애린, 정해정, 구수정</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2016년</p>
                              <p>김정원, 원하현, 이은주, 이재영, 정다솜, 정운화, 정혜지, 강찬휘, 김수원, 김유진, 문효정, 박성수, 백민정, 손원영, 신유나, 이신원, 이윤주, 전민정, 조윤남, 최혜린, 표단비, 현설연, 김민영, 박은서, 이재준, 서미혜, 경세은, 김예림, 차경희, 임소희, 박민지, 윤혜리, 이하나, 정은순, 박현화, 김래영</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2017년</p>
                              <p>강병우, 강송연, 김란, 김민지, 김소형, 김온아, 김지수, 반지수, 안조연, 윤수림, 이슬, 이수현, 임혁진, 장선미, 정현선, 현민주</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2018년(갱신)</p>
                              <p>강찬휘, 김정원, 문점숙, 문정희, 이난영, 이은주, 이재영, 원하현, 정다솜, 정수연, 정운화, 정지영, 정혜지, 최원정, 강송연, 경세은, 김경안, 김소형, 김온아, 김유진, 박세희, 백혜숙, 서소민, 손원영, 장선미, 정현선, 최영란, 최유진, 허인행, 이여정, 박성수, 오우아, 유혜인, 이지희</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2018년</p>
                              <p>권경인, 김보민, 김보혜, 김용하, 최형길, 김유라, 김이정, 김지헌, 박경희, 조아라, 진하늘</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2019년</p>
                              <p>강윤정, 민연기, 이솔미, 최성원, 최희나, 최용은, 너세와투, 탕묘, 김도윤, 김혜영, 이은옥, 권경인, 김유라, 진하늘, 박소현</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2020년</p>
                              <p>김혜린, 신주하, 장인하</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2021년(갱신)</p>
                              <p>고수빈, 김은총, 김일주, 김혜란, 박영선, 왕정연, 이효비, 정선아</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2022년</p>
                              <p>김진아, 김현, 노윤숙, 이수정, 이찬희, 임채용, 정옥순, 진주현, 최용은</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2023년</p>
                              <p>김채연, 박미정, 박지문, 손덕분, 송기남, 이정희</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-gray-800">2024년</p>
                              <p>김현주, 박나미, 이은경, 정경</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {active === "2014" && (
                      <p>강경주, 손지연, 이지혜, 심재원, 임채랑, 이애린, 정해정, 구수정 (2017년 11월까지 자격유지자)</p>
                    )}
                    {active === "2016" && (
                      <p>
                        김정원, 원하현, 이은주, 이재영, 정다솜, 정운화, 정혜지, 강찬휘, 김수원, 김유진, 문효정, 박성수, 백민정,
                        손원영, 신유나, 이신원, 이윤주, 전민정, 조윤남, 최혜린, 표단비, 현설연, 김민영, 박은서, 이재준,
                        서미혜, 경세은, 김예림, 차경희, 임소희, 박민지, 윤혜리, 이하나, 정은순, 박현화, 김래영 (2019년 11월까지)
                      </p>
                    )}
                    {active === "2017" && (
                      <p>
                        강병우, 강송연, 김란, 김민지, 김소형, 김온아, 김지수, 반지수, 안조연, 윤수림, 이슬, 이수현, 임혁진,
                        장선미, 정현선, 현민주 (2020년 11월까지 자격유지자)
                      </p>
                    )}
                    {active === "2018(갱신)" && (
                      <p>
                        강찬휘, 김정원, 문점숙, 문정희, 이난영, 이은주, 이재영, 원하현, 정다솜, 정수연, 정운화, 정지영, 정혜지,
                        최원정, 강송연, 경세은, 김경안, 김소형, 김온아, 김유진, 박세희, 백혜숙, 서소민, 손원영, 장선미, 정현선,
                        최영란, 최유진, 허인행, 이여정, 박성수, 오우아, 유혜인, 이지희 (2021년 2월까지 자격유지자)
                      </p>
                    )}
                    {active === "2018" && (
                      <p>
                        권경인, 김보민, 김보혜, 김용하, 최형길, 김유라, 김이정, 김지헌, 박경희, 조아라, 진하늘 (2021년 11월까지)
                      </p>
                    )}
                    {active === "2019" && (
                      <p>
                        강윤정, 민연기, 이솔미, 최성원, 최희나, 최용은, 너세와투, 탕묘, 김도윤, 김혜영, 이은옥, 권경인, 김유라,
                        진하늘, 박소현 (2022년 11월까지 자격유지자)
                      </p>
                    )}
                    {active === "2020" && <p>김혜린, 신주하, 장인하 (2023년 12월까지 자격유지자)</p>}
                    {active === "2021(갱신)" && (
                      <p>고수빈, 김은총, 김일주, 김혜란, 박영선, 왕정연, 이효비, 정선아 (2024년 12월까지 자격유지자)</p>
                    )}
                    {active === "2022" && (
                      <p>김진아, 김현, 노윤숙, 이수정, 이찬희, 임채용, 정옥순, 진주현, 최용은 (2025년 12월까지 자격유지자)</p>
                    )}
                    {active === "2023" && <p>김채연, 박미정, 박지문, 손덕분, 송기남, 이정희 (2026년 12월까지 자격유지자)</p>}
                    {active === "2024" && <p>김현주, 박나미, 이은경, 정경 (2027년 12월까지 자격유지자)</p>}
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
