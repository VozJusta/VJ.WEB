"use client";

import { useState } from "react";
import { PlanCard } from "@/components/ui/plan-card";
import { PricingSectionProps, PlanAudience } from "./pricing-section.types";
import { citizenPlans, lawyerPlans } from "./pricing-section.data";

export function PricingSection({
  title = "Escolha seu plano",
  subtitle,
  className = "",
}: PricingSectionProps = {}) {
  const [activeAudience, setActiveAudience] = useState<PlanAudience>("citizen");

  const currentPlans =
    activeAudience === "citizen" ? citizenPlans : lawyerPlans;

  return (
    <section
      className={`
        relative
        py-20 lg:py-32
        px-6 lg:px-8
        ${className}
      `}
      aria-labelledby="pricing-section-title"
    >
      <div className="relative max-w-7xl mx-auto">
        <h2
          id="pricing-section-title"
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
        >
          {title}
        </h2>

        <div className="flex justify-center mb-12">
          <div
            className="
              inline-flex
              gap-2
              p-2
              bg-slate-800/50
              backdrop-blur-sm
              rounded-full
              border border-slate-700
            "
            role="tablist"
            aria-label="Escolher tipo de plano"
          >
            <button
              onClick={() => setActiveAudience("citizen")}
              className={`
                px-8 py-3
                rounded-full
                font-semibold
                text-sm
                uppercase
                tracking-wide
                transition-all
                duration-300
                ${
                  activeAudience === "citizen"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }
              `}
              role="tab"
              aria-selected={activeAudience === "citizen"}
              aria-controls="citizen-plans"
            >
              Cidadão
            </button>

            <button
              onClick={() => setActiveAudience("lawyer")}
              className={`
                px-8 py-3
                rounded-full
                font-semibold
                text-sm
                uppercase
                tracking-wide
                transition-all
                duration-300
                ${
                  activeAudience === "lawyer"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }
              `}
              role="tab"
              aria-selected={activeAudience === "lawyer"}
              aria-controls="lawyer-plans"
            >
              Advogado
            </button>
          </div>
        </div>

        <div
          id={`${activeAudience}-plans`}
          role="tabpanel"
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
            animate-in
            fade-in
            duration-500
          "
        >
          {currentPlans.map((plan, index) => (
            <div
              key={plan.id}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <PlanCard
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                ctaText={plan.ctaText}
                ctaHref={plan.ctaHref}
                variant={plan.variant}
                recommended={plan.recommended}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
