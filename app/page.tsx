import { BentoGridDemo } from "@/components/bento-grid-demo";
import { BackgroundGradientDemo } from "@/components/background-gradient-demo";
import { CommunitySection } from "@/components/community-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SpotlightPreview } from "@/components/ui/spotlight";
import { NowStartPreview } from "@/components/ui/nowstart";
import NumberStats from "@/components/number-stats";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden w-full">
      <Hero playbackRate={0.85} />
      <div
        className="relative pt-[100px] md:pt-[50px]"
        style={{
          background: `linear-gradient(135deg,
            #fdf2f8 0%,
            #fefce8 25%,
            #f0fdf4 50%,
            #e0f2fe 75%,
            #fef7ff 100%)`
        }}
      >
        <SpotlightPreview />
        <BentoGridDemo />
        <NumberStats />
        <NowStartPreview />
        <BackgroundGradientDemo />
        <CommunitySection />
        <Footer />
      </div>
    </main>
  );
}
