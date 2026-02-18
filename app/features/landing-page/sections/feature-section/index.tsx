import { FeatureCard } from "@/components/ui/feature-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { MessageSquare } from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-24 items-center flex flex-col gap-12"
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

      <div className="flex w-full justify-between gap-24">
        <FeatureCard
          icon={<MessageSquare color="#1978E5" />}
          title="Acesso à Justiça"
          description=""
          variant="elevated"
          animated 
        />
        <FeatureCard
          icon={<MessageSquare color="#1978E5" />}
          title="Digital First"
          description="Desabafe em linguagem natural. Nossa IA
                      traduz sua história para termos jurídicos
                      precisos, sem que você precise saber
                      uma única lei."
          variant="elevated"
          animated 
        />
        <FeatureCard
          icon={<MessageSquare color="#1978E5" />}
          title="Acesso à Justiça"
          description="Desabafe em linguagem natural. Nossa IA
                      traduz sua história para termos jurídicos
                      precisos, sem que você precise saber
                      uma única lei."
          variant="elevated"
          animated 
        />
      </div>
    </section>
  );
}
