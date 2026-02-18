import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/features/landing-page/sections/feature-section/index";
import { HeroSection } from "@/features/landing-page/sections/hero-section";
import { SimulatorSection } from "./sections/simulator-section";
import { CTASection } from "./sections/cta-section";

export default function LandingPage() {
  return (
    <main className="flex flex-col py-8 px-8 gap-20">
      <HeroSection />
      <FeaturesSection />
      <SimulatorSection />
      <CTASection/>
    </main>
  );
}