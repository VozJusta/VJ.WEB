import { FeatureCard } from "@/components/ui/feature-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { featureCardsData } from "./feature-section.cards";

export function FeaturesSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-background items-center flex flex-col gap-12"
      aria-labelledby="features-section-heading"
    >
      <h2
        id="features-section-heading"
        className="mb-4 text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl lg:text-5xl"
      >
        Funcionalidades
      </h2>

      <div className="w-20">
        <GradientDivider height="h-1" />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8 lg:gap-12 w-full max-w-7xl px-4 items-center">
        {
          featureCardsData.map((card, index) => (
            <FeatureCard key={index} {...card} animated/>
          ))
        }
      </div>
    </section>
  );
}
