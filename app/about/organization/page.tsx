"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "조직도", id: "chart" },
    { name: "운영위원회 소개", id: "committee" }
  ];

  // 조직도 데이터
  const organizationData = {
    president: { name: "회장", description: "학회 전체 운영 총괄" },
    vicePresident: { name: "부회장", description: "학회 운영 보좌" },
    left: [
      { name: "모래상자치료교육전문가", description: "교육 프로그램 개발 및 운영" },
      { name: "모래상자치료전문가", description: "전문 치료 과정 관리" },
      { name: "모래상자상담사", description: "상담 업무 총괄" }
    ],
    right: [
      { name: "운영이사", description: "학회 운영 실무" },
      { name: "서기", description: "회의록 작성 및 문서 관리" },
      { name: "감사", description: "학회 운영 감시 및 검토" }
    ]
  };

  // 운영위원회 더미 데이터
  const committeeMembers = [
    {
      name: "김재옥",
      position: "학회장",
      work: "학회 전체 운영 총괄",
      image: "/images/about/h1.png"
    },
    {
      name: "이복순",
      position: "부회장",
      work: "학회 운영 보좌 및 대외 협력",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "김경희",
      position: "교육전문가",
      work: "교육 프로그램 개발 및 운영",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "송순",
      position: "전문가",
      work: "전문 치료 과정 관리 및 자문",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "조미영",
      position: "운영이사",
      work: "학회 운영 실무 및 행정 관리",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "정경숙",
      position: "상담사",
      work: "상담 업무 총괄 및 회원 관리",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    }
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
            조직도
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회의 조직 구조와 운영위원회
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
            <div className="mb-12">
              <div className="flex justify-center gap-4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
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
            </div>

            {/* 조직도 탭 */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  {/* 회장 */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="bg-yellow-500 text-black px-8 py-4 rounded-lg shadow-lg text-center min-w-[200px]">
                        <h3 className="text-lg font-medium mb-1" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                          {organizationData.president.name}
                        </h3>
                        <p className="text-xs text-gray-700 mt-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                          {organizationData.president.description}
                        </p>
                      </div>
                      {/* 수직 라인 */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
                    </div>
                  </div>

                  {/* 부회장 */}
                  <div className="flex justify-center mb-20">
                    <div className="relative">
                      <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg shadow-lg text-center min-w-[200px]">
                        <h3 className="text-lg font-medium mb-1" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                          {organizationData.vicePresident.name}
                        </h3>
                        <p className="text-xs text-gray-700 mt-2" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                          {organizationData.vicePresident.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 연결 라인들 */}
                  <div className="relative mb-8">
                    {/* 부회장에서 내려오는 수직선 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-400 -top-20"></div>

                    {/* 왼쪽으로 가는 L자 라인 */}
                    <div className="absolute left-1/4 transform -translate-x-1/2 w-0.5 h-4 bg-gray-400 -top-4"></div>
                    <div className="absolute left-1/4 -top-4 w-1/4 h-0.5 bg-gray-400"></div>

                    {/* 오른쪽으로 가는 L자 라인 */}
                    <div className="absolute right-1/4 transform translate-x-1/2 w-0.5 h-4 bg-gray-400 -top-4"></div>
                    <div className="absolute right-1/4 -top-4 w-1/4 h-0.5 bg-gray-400"></div>
                  </div>

                  {/* 하위 조직 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-8">
                    {/* 왼쪽 그룹 */}
                    <div className="space-y-4 flex flex-col items-center">
                      {organizationData.left.map((position, index) => (
                        <div key={index} className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg shadow-md max-w-[280px] w-full text-center">
                          <h4 className="text-sm font-medium text-gray-800 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                            {position.name}
                          </h4>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                            {position.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* 오른쪽 그룹 */}
                    <div className="space-y-4 flex flex-col items-center">
                      {organizationData.right.map((position, index) => (
                        <div key={index} className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg shadow-md max-w-[280px] w-full text-center">
                          <h4 className="text-sm font-medium text-gray-800 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                            {position.name}
                          </h4>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                            {position.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 운영위원회 소개 탭 */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {committeeMembers.map((member, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      {/* 프로필 이미지 */}
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full">
                        {member.position === "학회장" ? (
                          <div className="w-full h-full overflow-hidden rounded-full">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // 이미지 로딩 실패 시 플레이스홀더 표시
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                      <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                      </svg>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-md">
                            <svg
                              className="w-12 h-12 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-800 mb-1" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium mb-3" style={{ fontFamily: 'Noto Sans KR, sans-serif', color: '#B8860B' }}>
                          {member.position}
                        </p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                          {member.work}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-medium text-gray-800 mb-4" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                    운영위원회 소개
                  </h3>
                  <div className="space-y-3 text-gray-700" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    <p>
                      한국모래상자치료학회 운영위원회는 학회의 원활한 운영과 발전을 위해 구성된 핵심 조직입니다.
                    </p>
                    <p>
                      각 분야의 전문가들로 구성되어 있으며, 모래상자치료의 학술적 발전과 전문가 양성,
                      그리고 치료 기법의 보급에 힘쓰고 있습니다.
                    </p>
                    <p>
                      정기적인 회의를 통해 학회 운영 방침을 결정하고, 교육 프로그램 개발,
                      학술대회 개최, 자격증 관리 등의 업무를 담당하고 있습니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
