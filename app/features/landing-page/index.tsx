import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/features/landing-page/sections/feature-section/index";
import { HeroSection } from "@/features/landing-page/sections/hero-section";
import { SimulatorSection } from "./sections/simulator-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SimulatorSection />
    </>
  );
}