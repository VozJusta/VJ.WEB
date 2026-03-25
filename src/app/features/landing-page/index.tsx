import { Badge } from "@/src/components/ui/badge";
import { FeaturesSection } from "@/app/features/landing-page/sections/feature-section/index";
import { HeroSection } from "@/app/features/landing-page/sections/hero-section";
import { SimulatorSection } from "./sections/simulator-section";
import { CTASection } from "./sections/cta-section";
import { PricingSection } from "./sections/pricing-section";
import { PrivacySection } from "./sections/privacy-section";
import { FaqSection } from "./sections/faq-section";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-20 px-8 max-w-7xl">
      <HeroSection />
      <FeaturesSection />
      <SimulatorSection />
      <PricingSection />
      <PrivacySection />
      <CTASection />
      <FaqSection />
    </main>
  );
}
