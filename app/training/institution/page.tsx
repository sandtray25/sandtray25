"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type Center = {
  name: string;
  address: string;
  contact: string;
  managerLabel: string;
  region: string;
};

export default function TrainingInstitutionPage() {
  const [active, setActive] = useState("전체");
  const institutions: Center[] = [
    {
      name: "둥근마음 상담연구소",
      address: "서울특별시 동작구 현충로 75 소태산기념관 9층 905호",
      contact: "02)824-4438",
      managerLabel: "소 장 : 정 경 숙(모래상자상담사 전문가/교육분석가/1급 수퍼바이저&교육강사)",
      region: "서울",
    },
    {
      name: "한국모래상자치료융연구원",
      address: "서울특별시 용산구 용산동 2가 5-7",
      contact: "02)790-7655",
      managerLabel: "원장: 김경희 (모래상자상담사 전문가/교육분석가/전문가수퍼바이저&교육강사)",
      region: "서울",
    },
    {
      name: "연세우리가족상담센터",
      address: "경기도 고양시 덕양구 화정로 65. 1216호 (화정동 965번지, 한화오벨리스크) 화정역 4번출구",
      contact: "070-7612-9387",
      managerLabel: "고문: 이희자 (모래상자상담사 전문가/교육분석가/전문가수퍼바이저&교육강사)",
      region: "경기",
    },
    {
      name: "발달심리지원센터",
      address: "목포시 영산로 325 가톨릭문화회관 502호 발달심리지원센터",
      contact: "061)277-8765 / 010-9553-4695",
      managerLabel: "센터장: 김재옥 (모래상자상담사 전문가/교육분석가/1급 수퍼바이저&교육강사)",
      region: "전남",
    },
    {
      name: "마음놀이코칭상담센터",
      address: "전라남도 목포시 원산로 145번 안길 12 2층",
      contact: "061)278-0076 / 010-5613-6102",
      managerLabel: "센터장: 주현주(모래상자상담사 전문가/1급수퍼바이저&교육강사)",
      region: "전남",
    },
    {
      name: "오지아심리상담센터",
      address: "전라남도 목포시 용당로 331번길 88 상가동 202호",
      contact: "010-8450-2845",
      managerLabel: "센터장: 오지아 (모래상자상담사 전문가/1급수퍼바이저&교육강사)",
      region: "전남",
    },
    {
      name: "익산시 모래상자 상담 연구소",
      address: "전라북도 익산시 익산대로 17길 16. 101동 1403호",
      contact: "010-4650-8356",
      managerLabel: "소장: 송순 (모래상자상담사 전문가/1급수퍼바이저&교육강사)",
      region: "전북",
    },
    {
      name: "길벗심리상담연구소",
      address: "광주광역시 서구 풍암동 1076-8",
      contact: "062)234-2986 / 010-2680-2986",
      managerLabel: "소장: 이복순 (모래상자상담사 전문가/교육분석가/1급 수퍼바이저&교육강사)",
      region: "광주",
    },
    {
      name: "그레이트심리상담연구소",
      address: "광주광역시 서구 대남대로 469번길 10",
      contact: "062)369-8575",
      managerLabel: "소장 : 조미영 (모래상자상담사 전문가/1급수퍼바이저&교육강사)",
      region: "광주",
    },
    {
      name: "사)청소년가족복지상담협회",
      address: "광주광역시 서구 금화로 278, 국민생활관 2층 (213~215 염주체육관내)",
      contact: "010-3628-4300",
      managerLabel: "송원대학교 상담심리학과 교수: 김수경 (모래상자상담사 전문가/1급수퍼바이저&교육강사)",
      region: "광주",
    },
  ];

  const tabs = ["전체", "서울", "경기", "전남", "전북", "광주"];

  const getFilteredInstitutions = () => {
    if (active === "전체") {
      return institutions;
    }
    return institutions.filter(institution => institution.region === active);
  };

  const getRegionTagColor = (region: string) => {
    const colors = {
      "경기": "#f9edf0", // Blush
      "전남": "#e6c8b7", // Champagne
      "전북": "#c3955b", // Cognac
      "광주": "#ba6a36", // Amber
      "서울": "#1c3934"  // Emerald
    };
    return colors[region as keyof typeof colors] || "#261311"; // Espresso as default
  };

  const getTextColor = (region: string) => {
    // 밝은 색상에는 어두운 텍스트, 어두운 색상에는 밝은 텍스트
    const darkRegions = ["서울", "광주", "전북"];
    return darkRegions.includes(region) ? "text-white" : "text-gray-800";
  };

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
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            수련기관
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            지도에서 수련기관 위치를 확인하세요.
          </motion.p>
        </div>
      </section>

      {/* 본문 */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 탭 메뉴 */}
          <BackgroundGradient className="p-2">
            <div className="flex flex-wrap gap-2 justify-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={
                    "px-4 py-2 rounded-full text-sm md:text-base transition-colors " +
                    (active === t
                      ? "bg-slate-800 text-white"
                      : "bg-white/70 dark:bg-zinc-900/40 text-gray-700 dark:text-gray-200 border border-white/40 dark:border-white/10 hover:bg-white")
                  }
                >
                  {t === "전체" ? "전체" : `${t}지역`}
                </button>
              ))}
            </div>
          </BackgroundGradient>

          {/* 센터 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredInstitutions().map((institution, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-lg dark:shadow-gray-900 hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
              >
                {/* 지역 태그 */}
                <div className="flex justify-center items-center mb-3">
                  <span
                    className={`${getTextColor(institution.region)} text-xs px-3 py-1 rounded-full font-medium`}
                    style={{ backgroundColor: getRegionTagColor(institution.region) }}
                  >
                    {institution.region}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
                  {institution.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-center">
                  <p>
                    <span className="font-medium text-gray-800 dark:text-gray-200">주소:</span>{" "}
                    {institution.address}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-gray-200">연락처:</span>{" "}
                    {institution.contact}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                    {institution.managerLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
