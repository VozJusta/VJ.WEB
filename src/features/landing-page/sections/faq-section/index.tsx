import { FaqItem } from "@/components/ui/faq-item";
import type { FaqSectionProps } from "./faq-section.types";
import { faqData } from "./faq-section.data";

export function FaqSection({ className = "" }: FaqSectionProps) {
  return (
    <section
      id="faq-section"
      className={`flex flex-col gap-12 ${className} py-20`}
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col items-center gap-4">
        <h2
          id="faq-heading"
          className="text-4xl md:text-5xl font-bold text-white bg-clip-text"
        >
          Perguntas Frequentes
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Tire suas dúvidas sobre como nossa tecnologia pode te ajudar a
          resolver questões jurídicas de forma rápida e segura.
        </p>
      </div>

      <div className="flex flex-col gap-4 mx-auto w-full">
        {faqData.map((faq, index) => (
          <FaqItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            defaultOpen={index === 0}
            className="animate-fade-in-up"
            style={
              {
                animationDelay: `${index * 100}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </section>
  );
}
