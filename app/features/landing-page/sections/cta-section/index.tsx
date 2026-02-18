import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { CTASectionProps } from "./cta-section.types";
import { ctaStats, ctaContent } from "./cta-section.data";

export function CTASection({
  title = ctaContent.title,
  description = ctaContent.description,
  ctaText = ctaContent.ctaText,
  ctaHref = ctaContent.ctaHref,
  stats = ctaStats,
}: CTASectionProps = {}) {
  return (
    <section
      className={`
        relative
        w-full
        items-center
        justify-center
        flex
      `}
      aria-labelledby="cta-section-title"
    >
      <div
        className="
          bg-[#0C1622]
          p-8 lg:p-12
          rounded-3xl
          w-full
          border border-blue-500/20
          backdrop-blur-sm
          flex flex-col lg:flex-row
          gap-12 lg:gap-20
          justify-center
          items-center
          text-center lg:text-left
          max-w-480
        "
      >

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h2
              id="cta-section-title"
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
            >
              {title}
            </h2>

            <p className="text-base lg:text-lg text-slate-400  hover:text-white transition-colors duration-300 leading-relaxed max-w-xl">
              {description}
            </p>

              <Button
                href={ctaHref}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-center mt-2"
                aria-label={ctaText}
              >
                {ctaText}
              </Button>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.id}
                value={stat.value}
                label={stat.label}
                valueColor={stat.valueColor}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
