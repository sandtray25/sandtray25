"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { EthicsContent } from "./EthicsContent";
import { ResearchEthicsContent } from "./ResearchEthicsContent";
import { RulesHtmlViewer } from "./RulesHtmlViewer";

// 자격규정 콘텐츠 (r3.pdf - 19페이지)
function QualificationContent() {
  return (
    <div className="prose prose-gray max-w-none space-y-8" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
      <section className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-2xl font-bold mb-4 text-gray-800">한국모래상자치료학회 모래상자 상담사 인간자격관리운영규정</h4>
        <p className="text-sm text-gray-600">(최근 개정일: 2015년 01월 01일)</p>
      </section>

      {/* 제1장 총칙 */}
      <section className="mb-8">
        <h4 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">제1장 총칙</h4>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제1조(목적)</h5>
            <p className="text-gray-700 leading-relaxed">본 규정은 한국모래상자치료학회 (이하 본 학회라 칭한다) 정관 제4조 3항에 명시된 회원을 대상으로 한 모래상자 상담사 자격검정에 필요한 자격 관리에 관한 사항을 규정함을 목적으로 한다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제2조(정의)</h5>
            <p className="text-gray-700 leading-relaxed">모래상자 상담사라 함은 본 학회의 정회원 또는 준회원으로서 본 학회가 요구하는 소정의 수련과정을 이수하고 자격시험에 합격한 후 자격심사를 거쳐 본 학회가 발급하는 자격증을 부여받은 자를 말한다.</p>
          </div>
        </div>
      </section>

      {/* 제2장 자격 등급 및 역할 */}
      <section className="mb-8">
        <h4 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">제2장 자격 등급 및 역할</h4>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제3조(자격구분)</h5>
            <p className="text-gray-700 mb-3">자격은 다음과 같이 구분한다:</p>
            <ul className="list-decimal list-inside space-y-2 pl-4 text-gray-700">
              <li>모래상자상담 전문가</li>
              <li>모래상자상담사 1급</li>
              <li>모래상자상담사 2급</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제4조(모래상자상담 전문가)</h5>
            <p className="text-gray-700 mb-3">모래상자상담 전문가는 다음에 해당하는 자로서 본 학회 자격관리위원회의 인준을 거쳐 본 학회가 발급하는 자격증을 부여받은 자로 한다.</p>
            <div className="space-y-2 pl-4">
              <p className="text-gray-700">1. 본 학회 정회원인자</p>
              <p className="text-gray-700">2. 본 학회 모래상자상담사 1급 자격을 취득한 자</p>
              <p className="text-gray-700">3. 본 학회가 인정하는 전문가의 지도하에 학회에서 요구하는 소정의 수련과정을 거친 자</p>
              <p className="text-gray-700">4. 본 학회에서 명시된 과목을 이수하고 본 학회에서 실시하는 모래상자전문가 자격시험에 합격한 자</p>
              <p className="text-gray-700">5. 면접시험에 합격한 자</p>
              <p className="text-gray-700">6. 자격관리위원회의 심의를 거쳐 모래상자상담사 전문가의 자격수준에 상응하는 것으로 인정할 수 있는 상담관련 분야의 전문가 자격증을 취득하고 본 학회 정회원으로서 1년 이상의 활동실적을 가진 자</p>
              <p className="text-gray-700">7. 학회에서 실시한 소정의 윤리교육을 이수한 자</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제5조(모래상자상담사 1급)</h5>
            <p className="text-gray-700 mb-3">모래상자상담사 1급은 다음에 해당하는 자로서 본 학회 자격관리위원회의 인준을 거쳐 본 학회가 발급하는 자격증을 부여받은 자로 한다.</p>
            <div className="space-y-2 pl-4">
              <p className="text-gray-700">1. 본 학회 정회원인자</p>
              <p className="text-gray-700">2. 본 학회 모래상자상담사 2급 자격을 취득하거나 또는 학사를 졸업한 후 현장경력 2년 이상인 자 (대학원 재학생 및 석사학위 소지자)</p>
              <p className="text-gray-700">3. 본 학회가 인정하는 수련기관(교육인증기관)에서 모래상자상담 교육분석가 및 전문가의 지도하에 학회에서 요구하는 소정의 수련과정을 거친 자</p>
              <p className="text-gray-700">4. 본 학회에 명시된 과목을 이수하고 본 학회에서 실시하는 모래상자상담사 1급 자격시험에 합격한 자</p>
              <p className="text-gray-700">5. 면접시험에 합격한 자</p>
              <p className="text-gray-700">6. 학회에서 실시한 소정의 윤리교육을 이수한 자</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제6조(모래상자상담사 2급)</h5>
            <p className="text-gray-700 mb-3">모래상자상담사 2급은 다음에 해당하는 자로서 본 학회 자격관리위원회의 인준을 거쳐 본 학회가 발급하는 자격증을 부여받은 자로 한다.</p>
            <div className="space-y-2 pl-4">
              <p className="text-gray-700">1. 본 학회 정회원이며 대학교 및 전문대학교 재학생</p>
              <p className="text-gray-700">2. 학회가 인정하는 수련기관(교육연수 인증기관)에서 모래상자상담 전문가의 지도하에 학회에서 요구하는 소정의 수련과정을 거친 자</p>
              <p className="text-gray-700">3. 대학 또는 본 학회에서 실시하는 모래상자상담사 2급 자격시험에 합격한 자</p>
              <p className="text-gray-700">4. 면접 심사에 합격한 자</p>
              <p className="text-gray-700">5. 학회에서 실시한 소정의 윤리교육을 이수한 자 (모래상자상담사 2급은 자격연수에 윤리교육을 포함할 수 있다)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 안내 문구 */}
      <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-base text-gray-700 leading-relaxed">
          ※ 본 자격규정은 총 19페이지로 구성되어 있으며, 수련과정, 자격검정, 자격의 유지, 필기 및 면접시험, 부정행위자 처리 등의 추가 내용이 포함되어 있습니다.
          <br />전체 내용은 학회 사무국에 문의하시거나 PDF 파일을 다운로드하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

// 편집규정 콘텐츠 (r4.pdf)
function EditorialContent() {
  return (
    <div className="prose prose-gray max-w-none space-y-8" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
      <section className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-2xl font-bold mb-4 text-gray-800">『모래상자치료연구』발간 및 투고규정</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p>제정: 2008.10.10.</p>
          <p>제1차 개정: 2010. 10. 10</p>
          <p>제2차 개정: 2019. 9. 30</p>
          <p>제3차 개정: 2020. 12. 30</p>
        </div>
      </section>

      {/* 학회지 발간 */}
      <section className="mb-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제1조 [학회지의 발간 및 명칭]</h5>
            <p className="text-gray-700 leading-relaxed">한국모래상자치료학회는 국내외 '모래상자치료'를 연구하는 자들의 연구활동과 정보교환을 촉진시키기 위해 정기적인 학술지로서 『모래상자치료연구』(Journal of Sandtray Therapy)를 발간한다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제2조 [학회지의 발행처]</h5>
            <p className="text-gray-700 leading-relaxed">『모래상자치료연구』(Journal of Sandtray Therapy)의 발행처는 본 학회로 하며, 출판 및 인쇄는 본 학회와 계약한 출판사로 한다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제3조 [학회지의 성격]</h5>
            <p className="text-gray-700 leading-relaxed">본 『모래상자치료연구』는 모래상자치료 분야와 관련된 논문 및 비평논문을 게재함을 원칙으로 한다. 단, 학술정보의 빠른 교환을 위해 신간서적에 대한 서평, 최신연구동향 안내, 회원들의 연구업적 보고 및 연구활동의 활성화를 위한 제언 등 모래상자치료 연구에 도움이 된다고 생각되는 내용을 게재할 수 있다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제4조 [발간 횟수와 발간일]</h5>
            <p className="text-gray-700 mb-3">본 『모래상자치료연구』는 연 1회에 정기적으로 발간한다.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">호수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">원고마감일</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">발행일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">매권</td>
                    <td className="border border-gray-300 px-4 py-2">
                      (기존)당해연도 12월 31일<br />
                      (변경)당해연도 5월 30일
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      (기존)당해연도 2월 28일<br />
                      (변경)당해연도 8월 31일
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제5조 [논문의 자격]</h5>
            <p className="text-gray-700 leading-relaxed">본 『모래상자치료연구』에 게재되는 논문(사례연구논문포함)과 다른 출판물에 발표되지 않은 글에 한정한다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">제6조 [논문 투고자격]</h5>
            <p className="text-gray-700 leading-relaxed">투고자는 석사학위 소지자 이상의 한국모래상자치료학회의 회원을 원칙으로 한다. 단, 회원의 추천과 편집위원회의 동의가 있을 경우에는 비회원의 논문도 게재할 수 있다.</p>
          </div>
        </div>
      </section>

      {/* 원고작성 */}
      <section className="mb-8">
        <h4 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">제7조 [원고의 작성 및 투고]</h4>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">Ⅰ. 원고작성</h5>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">1. 투고 논문은 모래상자치료에 관련된 것으로 미발표 논문을 원칙으로 한다.</p>
              <p className="text-gray-700">2. 논문 작성은 한글과 외국어 모두 가능하다.</p>
              <p className="text-gray-700">3. 원고 집필 시 사용하는 워드프로세서는 한글 프로그램으로 작성한다.</p>
              <p className="text-gray-700">4. 논문의 요약을 논문 제목 아래 부분에 400자 이내로 제시한다. (가로 80열, 세로 8행 내외, 휴먼명조 9.5포인트로 한다.)</p>
              <p className="text-gray-700">5. Key Word를 국문과 영문 4~5개어로 제시한다. 예) 모래상자치료(Sandtray Therapy)</p>
              <p className="text-gray-700">6. 원고 분량은 A4(가로 80열 세로 33행) 크기로 20페이지를 원칙으로 초과시엔 별도경비를 징수한다. (휴먼명조 10포인트를 기준으로 함)</p>
              <p className="text-gray-700">7. 논문게재를 희망하는 자는 논문 파일을 본 학회에 제출한다(한글파일 형식).</p>
              <p className="text-gray-700">8. 연구비 지원에 의해 작성된 논문은 논문 첫 페이지 하단에 연구비 지원을 밝힌다. 단, 외부기관 연구비 지원에 의해 수행된 논문의 게재료는 별도로 적용된다.</p>
              <p className="text-gray-700">9. 연구자의 소속과 직위를 첫 페이지 하단에 밝힌다.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-bold mb-3 text-gray-800">Ⅱ. 문단모양</h5>
            <div className="space-y-3 pl-4">
              <div>
                <p className="text-gray-700 font-semibold mb-2">1. 논문의 중간 제목은 다음의 순으로 한다.</p>
                <div className="pl-4 space-y-1 text-gray-700">
                  <p>Ⅰ. . . . .</p>
                  <p>1. . . . . .</p>
                  <p>1.1 . . . . .</p>
                  <p>1.1.1 추가</p>
                </div>
              </div>
              <div>
                <p className="text-gray-700 font-semibold mb-2">2. 본문 기본 서식은 다음과 같다.</p>
                <div className="pl-4 space-y-1 text-gray-700">
                  <p>․ 서 체: 휴먼명조 / ․ 크 기: 10</p>
                  <p>․ 줄간격: 160% / ․ 장 평: 100</p>
                  <p>․ 자 간: 0 / ․ 들여쓰기: 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 심사료 및 게재료 */}
      <section className="mb-8">
        <h4 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">제8조 [심사료 및 게재료]</h4>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 font-semibold mb-2">1. 논문 투고시 연회비 입금안내:</p>
              <div className="pl-4 space-y-1 text-gray-700">
                <p>입회비 10,000 / 연회비 30,000(일반회원인 경우)</p>
                <p>계좌번호: 전북은행 1013-01-0803659, 한국모래상자치료학회 송순</p>
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">심사료: 60,000</p>
              <p className="text-gray-700 pl-4">농협 356-1193-3637-03, 한국모래상자치료학회 이미나</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">게재료: 100,000</p>
              <p className="text-gray-700 pl-4">농협 356-1193-3637-03, 한국모래상자치료학회 이미나</p>
              <p className="text-sm text-gray-600 pl-4 mt-1">(단, 등재후보지 전까지는 게재료에 한하여 학회에서 50% 지원키로 함)</p>
            </div>
            <div>
              <p className="text-gray-700">2. 규정된 원고분량을 초과하는 경우, 저자는 초과매수당 일정액의 비용을 부담해야 한다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 안내 문구 */}
      <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-base text-gray-700 leading-relaxed">
          ※ 본 편집규정에는 논문의 양식, 참고문헌 작성법, 표와 그림 작성법, 심사 절차 등의 상세한 내용이 포함되어 있습니다.
          <br />전체 내용은 학회 사무국에 문의하시거나 PDF 파일을 다운로드하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

export default function RegulationsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "한국모래상자치료학회 윤리규정" },
    { name: "연구윤리규정" },
    { name: "자격규정" },
    { name: "편집규정" },
  ];

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
            규정
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회의 운영 규정 및 윤리 지침
          </motion.p>
        </div>
      </section>

      {/* 탭 및 콘텐츠 섹션 */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* 탭 네비게이션 */}
            <div className="mb-8">
              {/* 데스크톱: 한 줄, 모바일: 두 줄 */}
              <div className="hidden md:flex justify-center gap-4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-200/50'
                        : 'bg-white/30 backdrop-blur-sm text-gray-600 hover:bg-white/50 border border-gray-200/30'
                    }`}
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* 모바일: 두 줄 배치 */}
              <div className="md:hidden space-y-2">
                {/* 첫 번째 줄: 윤리규정, 연구윤리규정 */}
                <div className="flex justify-center gap-2">
                  {[0, 1].map((index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`flex-1 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-200/50'
                          : 'bg-white/30 backdrop-blur-sm text-gray-600 hover:bg-white/50 border border-gray-200/30'
                      }`}
                      style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                    >
                      {tabs[index].name}
                    </button>
                  ))}
                </div>

                {/* 두 번째 줄: 자격규정, 편집규정 */}
                <div className="flex justify-center gap-2">
                  {[2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`flex-1 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-200/50'
                          : 'bg-white/30 backdrop-blur-sm text-gray-600 hover:bg-white/50 border border-gray-200/30'
                      }`}
                      style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                    >
                      {tabs[index].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 콘텐츠 (articles 카드 스타일 반영) */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden">
              {/* 카드 헤더 */}
              <div className="p-5 md:p-6 bg-gray-50/80 border-b border-gray-200/50">
                <h2 className="text-lg md:text-xl font-medium text-gray-800" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                  {tabs[activeTab].name} 전문
                </h2>
              </div>
              {/* 카드 본문 */}
              <div className="p-6 md:p-8 text-gray-800" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                <div className="space-y-12 leading-7 text-[15px] md:text-base">
                  {activeTab === 0 && <EthicsContent />}
                  {activeTab === 1 && <ResearchEthicsContent />}
                  {activeTab === 2 && (
                    <RulesHtmlViewer src="/rules/r3.html" title="자격규정 (r3.html)" />
                  )}
                  {activeTab === 3 && (
                    <RulesHtmlViewer src="/rules/r4.html" title="편집규정 (r4.html)" />
                  )}
                </div>
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
