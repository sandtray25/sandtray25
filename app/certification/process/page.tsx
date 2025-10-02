"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function CertificationProcessPage() {
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
      {/* 헤더 */}
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            자격증과정
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회 자격과정을 한눈에 살펴봅니다.
          </motion.p>
        </div>
      </section>

      {/* 본문 (Apple specs 스타일 비교표) */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <BackgroundGradient className="p-0">
            <div className="overflow-x-auto" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <table className="w-full table-fixed text-sm md:text-base">
                <colgroup>
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "27%" }} />
                  <col style={{ width: "27%" }} />
                  <col style={{ width: "27%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-left px-4 py-5 align-bottom">항목</th>
                    <th className="text-center px-4 py-5 align-bottom">모래상자상담사 2급</th>
                    <th className="text-center px-4 py-5 align-bottom">모래상자상담사 1급</th>
                    <th className="text-center px-4 py-5 align-bottom">모래상자상담 전문가</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/60">
                  {/* 자격신청기준 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">자격신청기준</td>
                    <td className="px-4 py-5 text-center">관련학과 전문학사<br/>이상 소지자</td>
                    <td className="px-4 py-5 text-center">모래상자상담사 2급 후<br/>상담경력 2년 이상<br/>관련학과 학사 이상 소지자</td>
                    <td className="px-4 py-5 text-center">모래상자상담사 1급<br/>석사학위 이상</td>
                  </tr>

                  {/* 워크샵 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">워크샵</td>
                    <td className="px-4 py-5 text-center">20시간 이상</td>
                    <td className="px-4 py-5 text-center">40시간 이상</td>
                    <td className="px-4 py-5 text-center">60시간 이상</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">워크샵 비고</td>
                    <td colSpan={3} className="px-4 py-3 text-center text-gray-700">
                      학회 전문가이면서 학회가 인정한 교육강사가 진행하는 워크샵
                    </td>
                  </tr>

                  {/* 교육분석 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">교육분석</td>
                    <td className="px-4 py-5 text-center">1회</td>
                    <td className="px-4 py-5 text-center">15회</td>
                    <td className="px-4 py-5 text-center">20회</td>
                  </tr>

                  {/* 사례슈퍼비전 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800 align-top">사례슈퍼비전</td>
                    <td className="px-4 py-5 text-center align-top">
                      공개사례발표 1사례<br/>공개사례참관 3사례<br/>
                      <span className="text-xs text-blue-600">※ 1사례당 최소 10회기 이상</span>
                    </td>
                    <td className="px-4 py-5 text-center align-top">
                      공개사례발표 2사례<br/><span className="text-xs">(수퍼바이저 2인)</span><br/>
                      공개사례참관 10사례<br/>
                      <span className="text-xs text-blue-600">※ 1사례당 최소 12회기 이상</span><br/>
                      <span className="text-xs text-blue-600">※ 슈퍼비전 10시간(개인)</span>
                    </td>
                    <td className="px-4 py-5 text-center align-top">
                      공개사례발표 3사례<br/><span className="text-xs">(수퍼바이저 2인)</span><br/>
                      공개사례참관 10사례<br/>
                      <span className="text-xs text-blue-600">※ 1사례당 최소 12회기 이상</span><br/>
                      <span className="text-xs text-blue-600">※ 슈퍼비전 20시간(개인)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">슈퍼비전 비고</td>
                    <td colSpan={3} className="px-4 py-3 text-center text-gray-700">
                      개인 슈퍼비전: 최소 2사례, 10회기 이상. 학회가 인정하는 교육분석가와 슈퍼바이저가 진행하며, 동일인은 불가. (교육분석가는 전체 회기의 1/3 이하 슈퍼비전 가능)
                    </td>
                  </tr>

                  {/* 교육연수 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">교육연수</td>
                    <td className="px-4 py-5 text-center">20시간 이상</td>
                    <td className="px-4 py-5 text-center">30시간 이상</td>
                    <td className="px-4 py-5 text-center">60시간 이상</td>
                  </tr>

                  {/* 학술대회참가 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">학술대회참가</td>
                    <td className="px-4 py-5 text-center">학술대회 1회 이상 및<br/>포스터 발표 1회</td>
                    <td className="px-4 py-5 text-center">학술대회 1회 이상<br/>논문 1편(100%) 또는<br/>포스터 발표 1회</td>
                    <td className="px-4 py-5 text-center">학술대회 2회 이상<br/>논문 2편(200%) 이상</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">학술대회 비고</td>
                    <td className="px-4 py-3 text-center">—</td>
                    <td className="px-4 py-3 text-center" colSpan={2}>
                      본 학회 학회지 ‘모래상자치료연구’ 논문집에 한함 (논문 1편당 100%, 공동저자 1편당 50%)
                    </td>
                  </tr>

                  {/* 자격시험 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">자격시험</td>
                    <td className="px-4 py-5 text-center">모래상자치료<br/>발달심리</td>
                    <td className="px-4 py-5 text-center">모래상자치료Ⅰ<br/>발달심리 및 평가Ⅰ<br/>정신병리Ⅰ<br/>분석심리Ⅰ</td>
                    <td className="px-4 py-5 text-center">모래상자치료Ⅱ<br/>발달심리 및 평가Ⅱ<br/>정신병리Ⅱ<br/>분석심리Ⅱ</td>
                  </tr>

                  {/* 수련(모래실습) */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">수련(모래실습)</td>
                    <td className="px-4 py-5 text-center text-red-600">100시간</td>
                    <td className="px-4 py-5 text-center text-red-600" colSpan={2}>40시간</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">실습 비고</td>
                    <td colSpan={3} className="px-4 py-3 text-center text-red-600">
                      모래학회 등록 기관(연회비 납부)에 한해 기관 인증서 발급<br/>
                      자격조건: 전문가 자격 취득 후 5년 이상 임상경험자 한함
                    </td>
                  </tr>

                  {/* 서류심사 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800 align-top">서류심사</td>
                    {/* 2급 전용 */}
                    <td className="px-4 py-5 text-left align-top">
                      1. 자격신청서<br/>
                      2. 워크샵 이수증<br/>
                      3. 교육연수 이수증<br/>
                      4. 교육분석 확인서<br/>
                      5. 공개사례발표 확인서<br/>
                      6. 공개사례발표 참관 확인서<br/>
                      7. 자격시험 합격증<br/>
                      8. 학술대회 참가 확인서<br/>
                      <span className="text-red-600">9. 전문가 추천서</span><br/>
                      <span className="text-red-600">10. 재학증명서</span><br/>
                      <span className="text-red-600">11. 서류심사비 납부</span><br/>
                      <span className="text-red-600">12. 입연회비 납부확인서</span><br/>
                      <span className="text-red-600">13. 포스터발표 확인증</span>
                    </td>
                    {/* 1급·전문가 공통 */}
                    <td className="px-4 py-5 text-center align-top" colSpan={2}>
                      <div className="inline-block text-left">
                        1. 자격신청서<br/>
                        2. 워크샵 이수증<br/>
                        3. 교육연수 이수증<br/>
                        4. 교육분석 확인서<br/>
                        5. 공개사례발표 확인서<br/>
                        6. 공개사례발표 참관 확인서<br/>
                        7. 자격시험 합격증<br/>
                        8. 학술대회 참가 확인서<br/>
                        <span className="text-red-600">9. 교육분석가 추천서</span><br/>
                        <span className="text-red-600">10. 실습수료증명서</span><br/>
                        <span className="text-red-600">11. 서류심사비 납부</span><br/>
                        <span className="text-red-600">12. 입연회비 납부확인서</span><br/>
                        <span className="text-red-600">13. 포스터발표 확인증(1급)</span>
                      </div>
                    </td>
                  </tr>

                  {/* 자격갱신 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">자격갱신</td>
                    <td className="px-4 py-5 text-center">3년간<br/>(교육연수 20시간)<br/>사례발표 3회<br/>사례참관 3회<br/>학술대회 1회 참가<br/>연회비</td>
                    <td className="px-4 py-5 text-center">3년간<br/>(교육연수 20시간)<br/>사례발표 3회<br/>사례참관 3회<br/>학술대회 2회 참가<br/>연회비</td>
                    <td className="px-4 py-5 text-center">5년간<br/>(교육연수 40시간)<br/>사례발표 3회 or 연구 1회<br/>사례참관 3회<br/>학술대회 3회 참가<br/>연회비</td>
                  </tr>

                  {/* 면접시험 */}
                  <tr>
                    <td className="px-4 py-5 font-medium text-gray-800">면접시험</td>
                    <td className="px-4 py-5 text-center text-zinc-400">—</td>
                    <td className="px-4 py-5 text-center">자기분석과 상담사례 개념화<br/>각 1문항</td>
                    <td className="px-4 py-5 text-center">연구 설계와 상담슈퍼비전<br/>각 1문항</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BackgroundGradient>
        </div>
      </section>

      <Footer />
    </main>
  );
}

