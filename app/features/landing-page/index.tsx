import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/features/landing-page/sections/feature-section/index";
import { HeroSection } from "@/features/landing-page/sections/hero-section";
import { SimulatorSection } from "./sections/simulator-section";
import { CTASection } from "./sections/cta-section";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-20 px-8 max-w-[1280px]">
      <HeroSection />
      <FeaturesSection />
      <SimulatorSection />
      <CTASection />
    </main>
  );
}
