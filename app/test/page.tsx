import { BentoGridDemo } from "@/components/bento-grid-demo";
import { BackgroundGradientDemo } from "@/components/background-gradient-demo";
import { CommunitySection } from "@/components/community-section";
import { Footer } from "@/components/footer";
import { SpotlightPreview } from "@/components/ui/spotlight";
import { NowStartPreview } from "@/components/ui/nowstart";
import NumberStats from "@/components/number-stats";
import { TestHero } from "@/components/test-hero";

export default function Test() {
  return (
    <main className="relative">
      <TestHero />
      <div
        className="relative pt-[100px] md:pt-[50px]"
        style={{
          background: `linear-gradient(135deg,
            #fef7ff 0%,
            #e0f2fe 25%,
            #f0fdf4 50%,
            #fefce8 75%,
            #fdf2f8 100%)`
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