"use client";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { DesignSelector } from "@/components/design-selector";

export default function Design2Page() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <Hero playbackRate={1} designVariant="curved" videoSrc="/images/b5_v.mp4" />
      
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
            디자인 2
          </h2>
          <p
            className="text-lg text-gray-300"
            style={{
              fontFamily: 'GMarketSans, sans-serif',
              fontWeight: 400,
            }}
          >
            모래 위에 펼쳐지는 무한한 가능성, 당신의 이야기를 담아냅니다.
          </p>
        </div>
      </section>

      {/* 디자인 선택 섹션 */}
      <DesignSelector currentDesignId={2} />
    </main>
  );
}

