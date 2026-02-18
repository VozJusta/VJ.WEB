import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/features/landing-page/sections/feature-section/index";
import { HeroSection } from "@/features/landing-page/sections/hero-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Badge text="New Feature" variant="blue"  />
    </>
  );
}