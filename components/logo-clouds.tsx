"use client";
import React from "react";
import Image from "next/image";

export function LogoClouds() {
  const partners = [
    { logo: "/images/logo/l1.png", url: "http://junginstitute.net/" },
    { logo: "/images/logo/l2.png", url: "http://www.carljung.or.kr/" },
    { logo: "/images/logo/l3.png", url: "https://www.childkorea.or.kr/" },
    { logo: "/images/logo/l4.png", url: "http://www.playtherapykorea.or.kr/" },
    { logo: "/images/logo/l5.png", url: "http://korean-arttherapy.or.kr/" },
    { logo: "/images/logo/l6.png", url: "https://www.koreanpsychology.or.kr/" },
    { logo: "/images/logo/l7.png", url: "https://krcpa.or.kr/" }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 mt-32">
          <h2
            className="text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 bg-opacity-50 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
          >
            협력 기관
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          >
            전문적인 모래상자치료 교육을 위해 다양한 기관과 협력하고 있습니다
          </p>
        </div>

        {/* 모바일: 2개씩 4줄, 데스크톱: 위 4개, 아래 3개(지그재그) */}
        <div className="md:hidden space-y-6">
          {/* 모바일: 2개씩 배치 */}
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 gap-8 items-center justify-items-center">
              {partners.slice(rowIndex * 2, rowIndex * 2 + 2).map((partner, index) => (
                <a
                  key={rowIndex * 2 + index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 rounded-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <Image
                    src={partner.logo}
                    alt={`협력기관 로고 ${rowIndex * 2 + index + 1}`}
                    width={120}
                    height={120}
                    className="object-contain transition-all duration-500"
                    style={{
                      filter: 'grayscale(100%) brightness(0.95)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%) brightness(1.05) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%) brightness(0.95)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* 데스크톱: 지그재그 배치 */}
        <div className="hidden md:block space-y-8">
          {/* 첫 번째 줄: 4개 */}
          <div className="grid grid-cols-4 gap-8 items-center justify-items-center">
            {partners.slice(0, 4).map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <Image
                  src={partner.logo}
                  alt={`협력기관 로고 ${index + 1}`}
                  width={120}
                  height={120}
                  className="object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(100%) brightness(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(1.05) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) brightness(0.95)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>
            ))}
          </div>

          {/* 두 번째 줄: 3개 (지그재그 오프셋) */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex justify-between items-center px-8">
              {/* 첫 번째 로고: 1-2 사이 */}
              <a
                href={partners[4].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{ marginLeft: '6%' }}
              >
                <Image
                  src={partners[4].logo}
                  alt="협력기관 로고 5"
                  width={120}
                  height={120}
                  className="object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(100%) brightness(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(1.05) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) brightness(0.95)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>

              {/* 두 번째 로고: 2-3 사이 */}
              <a
                href={partners[5].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <Image
                  src={partners[5].logo}
                  alt="협력기관 로고 6"
                  width={120}
                  height={120}
                  className="object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(100%) brightness(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(1.05) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) brightness(0.95)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>

              {/* 세 번째 로고: 3-4 사이 */}
              <a
                href={partners[6].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{ marginRight: '6%' }}
              >
                <Image
                  src={partners[6].logo}
                  alt="협력기관 로고 7"
                  width={120}
                  height={120}
                  className="object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(100%) brightness(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(1.05) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) brightness(0.95)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
