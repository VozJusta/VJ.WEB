import { Badge } from "@/components/ui/badge";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { PrivacySectionProps } from "./privacy-section.types";
import {
  securityBadges,
  featuredTestimonial,
  privacyContent,
} from "./privacy-section.data";

export function PrivacySection({
  title = privacyContent.title,
  description = privacyContent.description,
  badges = securityBadges,
  testimonial = featuredTestimonial,
  className = "",
}: PrivacySectionProps = {}) {
  return (
    <section
      className={`
        relative
        py-20 lg:py-32
        px-6 lg:px-8
        bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900
        ${className}
      `}
      aria-labelledby="privacy-section-title"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <Badge
                  key={badge.id}
                  text={badge.text}
                  icon={badge.icon}
                  variant={badge.variant}
                />
              ))}
            </div>

            <h2
              id="privacy-section-title"
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              {title}
            </h2>

            <p className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <TestimonialCard
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorRole={testimonial.authorRole}
              authorInitials={testimonial.authorInitials}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
