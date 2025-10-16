"use client";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { DesignSelector } from "@/components/design-selector";

export default function Design1Page() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <Hero playbackRate={1} designVariant="curved" videoSrc="/images/b4_v.mp4" />
      
      {/* 디자인 설명 섹션 */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{
              fontFamily: 'GMarketSans, sans-serif',
              fontWeight: 700,
            }}
          >
            디자인 1
          </h2>
          <p
            className="text-lg text-gray-300"
            style={{
              fontFamily: 'GMarketSans, sans-serif',
              fontWeight: 400,
            }}
          >
            마음의 치유를 향한 여정, 내면의 빛을 따라 함께 걸어갑니다.
          </p>
        </div>
      </section>

      {/* 디자인 선택 섹션 */}
      <DesignSelector currentDesignId={1} />
    </main>
  );
}

