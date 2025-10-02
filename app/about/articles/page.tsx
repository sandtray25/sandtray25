"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function ArticlesPage() {
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
            학회정관
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회 정관 및 운영 규정
          </motion.p>
        </div>
      </section>

      {/* 본문 섹션 (개인정보 페이지 스타일 적용) */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
          >
            {/* 카드 헤더 */}
            <div className="p-5 md:p-6 bg-gray-50/80 border-b border-gray-200/50">
              <h2 className="text-lg md:text-xl font-medium text-gray-800" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                학회정관 전문
              </h2>
            </div>

            {/* 카드 본문 */}
            <div className="p-6 md:p-8 text-gray-800" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <div className="space-y-12 leading-7 text-[15px] md:text-base">
            {/* 제1장 총칙 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제1장 총칙
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제1조 (명칭)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회는 한국모래상자치료학회라고 칭한다. (Korean Sandtray Therapy Association: KSTA)
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제2조 (목적)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회는 심리적 손상과 신체화증상으로 고통을 경험하고 있는 분들의 치유와 예방을 위해 모래상자를 활용한 심리치료의 연구와 교육을 실시하여 모래상자치료의 활성화를 도모하는데 그 목적을 둔다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제3조 (위치)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 사무국은 회장이 재직하고 있는 기관에 둠을 원칙으로 한다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제2장 사업 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제2장 사업
              </h2>

              <div>
                <h3
                  className="text-lg font-medium text-gray-800 mb-2"
                  style={{ fontFamily: 'GMarketSans, sans-serif' }}
                >
                  제4조 (사업)
                </h3>
                <p
                  className="text-gray-700 leading-relaxed mb-3"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  본 회는 제2조의 목적을 달성하기 위하여 다음과 같은 사업을 한다.
                </p>
                <ol
                  className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  <li>모래상자를 활용한 심리진단 및 치료연구</li>
                  <li>학술 대회 및 연구사례 발표회</li>
                  <li>학회지 및 기타 연구지의 발간</li>
                  <li>모래상자치료 연수회 개최</li>
                  <li>저서 및 논문 등의 학술상 수여</li>
                  <li>모래상자치료 전문가 양성</li>
                  <li>기타 본 회 목적달성을 위해 필요한 사항</li>
                </ol>
              </div>
            </div>

            {/* 제3장 회원 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제3장 회원
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제5조 (자격)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 회원은 본 회의 목적에 찬성하는 자로서 다음 각 호에 해당하는 자로 한다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>대학 또는 대학원에서 아동학, 유아교육학, 교육학, 사회복지학, 심리학 등 관련 학문을 전공한 자(정회원)</li>
                    <li>아동학, 유아교육학, 교육학, 사회복지학, 심리학 등의 분야에서 1년 이상의 모래상자치료 경험을 가진 자 또는 운영이사회에서 연구실적을 인정받은 자(정회원)</li>
                    <li>모래상자치료분야에 관심이 많아 본 회의 사업에 적극 참여하는 자로서 운영이사회의 승인을 받은 자(준회원)</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제6조 (권리)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    회원은 모래상자치료학회의 모든 행사의 참여권과 발표권을 갖는다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제7조 (의무)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    회원은 회비를 납부해야 하며, 본 회의 회칙 및 결의사항을 준수해야 한다. 모래상자치료전문가는 이사의 의무를 준수해야 한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제8조 (징계)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 목적에 위배되거나 명예를 손상시킨 행위를 하였을 경우 운영이사회의 결의에 따라 징계 할 수 있다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제4장 총회 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제4장 총회
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제9조 (종류)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    총회는 정기총회와 임시총회로 나눈다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제10조 (개최)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    정기총회는 매년 12월에 개최하고 임시총회는 이사회의 결의나 회원 3분의 1 이상의 요청이 있을 때 소집요구일로 부터 30일 이내에 회장이 소집한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제11조 (소집)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    총회의 소집은 서면으로 통지해야 한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제12조 (의결사항)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    총회는 다음 사항을 의결한다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>회칙개정</li>
                    <li>사업계획 및 예산</li>
                    <li>사업보고 및 결산승인</li>
                    <li>회비</li>
                    <li>기타 중요사항</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제13조 (정족수)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    총회의 출석 회원으로 개회하고 출석회원 과반수의 찬성으로 의결하며, 가부동수인 경우에는 의장이 결정한다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제5장 임원 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제5장 임원
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제14조 (임원)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회에는 다음의 임원을 둔다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>회장 1인</li>
                    <li>부회장 2인</li>
                    <li>운영이사 약간명</li>
                    <li>감사 2인</li>
                    <li>서기 및 간사보 약간명</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제15조 (선출)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    회장은 운영이사회에서 선출하여 총회의 인준을 얻는다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제16조 (임무)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회 임원의 임무는 다음과 같다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>회장은 본 회를 대표하고 회의 임무를 총괄하며 총회와 이사회의 의장이 된다.</li>
                    <li>부회장은 회장을 보좌하고 회장 유고시 그 임무를 대행한다.</li>
                    <li>이사는 총회의 위임 사항을 처리한다.</li>
                    <li>감사는 본 회의 사업과 회계를 매년 1회이상 감사하고 그 결과를 이사회 및 총회에 보고한다.</li>
                    <li>간사 및 간사보는 서기의 사무를 보좌한다.</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제17조 (임기)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회 임원의 임기는 2년으로 하되 연임할 수 있다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제18조 (보선)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 임원중 결원이 생길 때에는 운영이사회에서 보선하되 그 임기는 전임자의 잔임 기간으로 한다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제6장 운영이사회 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제6장 운영이사회
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제19조 (운영이사)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 운영이사는 고문, 명예회장, 임원으로 구성한다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>본 회의 고문은 학회에 자문역할을 해주시는 분으로 운영이사의 승인을 받은 자이다.</li>
                    <li>본 회의 명예회장은 회장 임기만료 후 운영이사들의 동의를 받아 추대된 자이다.</li>
                    <li>본 회의 임원은 회장의 추천을 받은 자이다.</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제20조 (운영이사회의 소집)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    회장이 선출한 임원을 운영이사회라 칭한다. 운영이사회는 회장이 필요하다고 인정될 때 또는 재적이사 3분의1이상의 요구가 있을 때에 회장이 소집한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제21조 (운영이사회의 의결사항)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    운영이사회는 다음 사항을 의결한다.
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed ml-4"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    <li>제4조 본 회 사업에 관한 사항</li>
                    <li>사업 및 결산에 관한 사항</li>
                    <li>사업계획 및 예산에 관한 사항</li>
                    <li>제 규정의 제정과 개폐에 관한 사항</li>
                    <li>학회 기금의 조성 및 관리에 관한 사항</li>
                    <li>회원의 입회 및 포상과 징계에 관한 사항</li>
                    <li>학회가 인정하는 학회부설 모래상자치료실 허가에 관한 사항</li>
                  </ol>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제22조 (운영이사회 정족수)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    운영이사회는 재적이사의 과반수로 개회하고 출석이사 과반수의 찬성으로 의결한다. 가부동수인 경우에는 회장이 결정한다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제7장 지회 및 모래상자치료실 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제7장 지회 및 모래상자치료실
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제23조 (지회)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회는 지역에 따라 지회를 둘 수 있다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제24조 (모래상자치료실)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회가 인정하는 모래상자치료실을 지역에 따라 허가하여 개설할 수 있다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제8장 재정 및 회계 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제8장 재정 및 회계
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제25조 (경비)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 경비는 다음의 수입으로 충당한다.
                  </p>
                  <div className="ml-4 space-y-3">
                    <div>
                      <p className="text-gray-700 font-medium mb-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        1. 회비
                      </p>
                      <div className="ml-4 space-y-1 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        <p>1-1 입회비 2만원, 연회비 3만원</p>
                        <p>1-2 전문가 연회비 10만원을 별도 납부한다.</p>
                        <p>1-3 이사회비 10만원을 별도 납부한다.</p>
                        <p className="text-sm text-gray-600">(전문가 연회비와 이사 연회비는 중복 납부하지 아니한다.)</p>
                      </div>
                    </div>
                    <p className="text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>2. 보조금</p>
                    <p className="text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>3. 기부금</p>
                    <p className="text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>4. 기타수입금</p>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제26조 (회계연도)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 회의 회계연도는 정기총회부터 다음해 정기총회까지로 한다.
                  </p>
                </div>
              </div>
            </div>

            {/* 제9장 편집위원회 규정 */}
            <div className="text-left">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                제9장 편집위원회 규정
              </h2>

              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  1. 편집위원은 학술지의 관련 업무 담당자, 저자, 심사위원들 간의 이해갈등과 무관하게 논문의 질적 수준과 투고 규정에 근거하여 공평하게 처리해야 한다.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  2. 편집위원은 심사 과정의 진실성을 확인하고, 편집과정 참여자를 관리 감독한다.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  3. 편집위원은 출판이 결정된 후 해당 모든 논문을 출판해야 할 의무가 있다. (단, 중요한 실수나 윤리적인 문제점이 밝혀진 것은 제외된다.)
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  4. 편집위원은 논문 심사 과정을 명확하게 공개해야 하며 모든 과정에 대해 정당한 이유를 설명할 수 있어야 한다.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  5. 편집위원은 심사위원이 자신의 신원을 공개하는 것을 허락한 경우를 제외하고, 모든 심사위원의 익명성을 보장한다.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  6. 편집위원은 특별한 사유가 없는 한 2년을 임기로 한다.
                </p>
              </div>
            </div>

            {/* 부칙 - 학술상 규정 */}
            <div className="text-left border-t pt-8">
              <h2
                className="text-2xl font-medium text-gray-800 mb-6"
                style={{ fontFamily: 'GMarketSans, sans-serif' }}
              >
                부칙 - 학술상 규정
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제1조 (명칭)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 자격의 명칭을 모래상자상담사라고 칭한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제2조 (목적)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 자격은 한국모래상자치료의 자격규정에 따라 모래상자상담사 과정을 이수하도록 하여 모래상자상담사 자격을 수여함을 목적으로 한다.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium text-gray-800 mb-2"
                    style={{ fontFamily: 'GMarketSans, sans-serif' }}
                  >
                    제3조 (자격)
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed mb-3"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    본 학회 자격단계는 모래상자상담사 2급, 모래상자상담사 1급, 모래상자치료 전문가, 모래상자치료 교육분석가, 교육강사, 수퍼바이저 등이다.
                  </p>

                  <div className="space-y-4 ml-4">
                    <div>
                      <p className="font-medium text-gray-800 mb-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        1. 모래상자상담사는 1급과 2급으로 구분한다.
                      </p>
                      <div className="ml-4 space-y-2 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        <p>1-1. 모래상자상담사 2급은 학부 재학생으로서 모래상자상담사 교육과 본 회의 자격규정에 따라 훈련을 받은 자이다.</p>
                        <p>1-2. 모래상자상담사 1급은 석사과정 이상으로 모래상자상담사 교육과 본 학회의 자격규정에 따라 훈련을 받은 자이다.</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 mb-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        2. 모래상자치료 전문가는 석사과정 이상으로 모래상자치료 전문가 교육과 본 학회의 자격규정에 따라 훈련을 받은 자이다. 모래상자치료 1급 수퍼바이저, 모래상자상담사 1급 교육강사로 구분한다.
                      </p>
                      <div className="ml-4 space-y-2 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        <p>2-1. 모래상자치료 1급 수퍼바이저는 모래상자치료 전문가로서 수퍼바이저 훈련과정을 이수한자이다.</p>
                        <p>2-2. 모래상자치료 1급 교육강사는 모래상자치료 전문가로서 교육강사 훈련과정을 이수한자이다.</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 mb-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        3. 모래상자치료 교육분석가는 석사과정 이상으로 모래상자치료 교육분석가 교육과 본 학회의 자격규정에 따라 훈련을 받은 자이다. 모래상자치료 전문가 수퍼바이저, 모래상자치료전문가 교육강사로 구분한다.
                      </p>
                      <div className="ml-4 space-y-2 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        <p>3-1. 모래상자치료 전문가 수퍼바이저는 모래상자치료 교육분석가로서 수퍼바이저 훈련과정을 이수한자이다.</p>
                        <p>3-2. 모래상자치료 전문가 교육강사는 모래상자치료 교육분석가로서 교육강사 훈련과정을 이수한자이다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t space-y-3">
                <p
                  className="text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  본 규정은 2003년 12월 2일부터 효력을 발생한다.
                </p>
                <p
                  className="text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  본 개정 정관은 2015년 12월 9일부터 시행된다.
                </p>
              </div>
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
