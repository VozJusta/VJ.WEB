import Image from "next/image";
import { TestimonialCardProps } from "./testimonial-card.types";
import {
  testimonialCardBaseStyles,
  quoteStyles,
  avatarStyles,
  authorNameStyles,
  authorRoleStyles,
} from "./testimonial-card.styles";

/**
 * TestimonialCard Component
 *
 * Card de depoimento/feedback de cliente reutilizável.
 *
 * **Características:**
 * - Quote com aspas automáticas
 * - Avatar com iniciais ou imagem
 * - Nome e cargo do autor
 * - Hover effects suaves
 * - Design escuro elegante
 *
 * **Por que Server Component?**
 * - Sem interatividade (apenas visual)
 * - Dados estáticos
 * - SEO: Depoimentos indexáveis
 * - Performance máxima
 *
 * @example
 * ```tsx
 * <TestimonialCard
 *   quote="O VozJusta me deu segurança..."
 *   authorName="João P."
 *   authorRole="MICROEMPREENDEDOR (MEI)"
 *   authorInitials="JP"
 * />
 * ```
 *
 * @component
 */
export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorInitials,
  authorAvatar,
  className = "",
}: TestimonialCardProps) {
  // Extrai iniciais se não fornecidas
  const initials =
    authorInitials ||
    authorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <article
      className={`
        ${testimonialCardBaseStyles}
        ${className}
      `}
      role="article"
      aria-label={`Depoimento de ${authorName}`}
    >
      {/* Quote/Depoimento */}
      <blockquote className={quoteStyles}>{quote}</blockquote>

      {/* Author Info */}
      <footer className="flex items-center gap-4">
        {/* Avatar */}
        {authorAvatar ? (
          <Image
            src={authorAvatar}
            alt={`Foto de ${authorName}`}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className={avatarStyles} aria-label={`Avatar de ${authorName}`}>
            {initials}
          </div>
        )}

        {/* Nome e Cargo */}
        <div className="flex flex-col gap-1">
          <cite className={`${authorNameStyles} not-italic`}>{authorName}</cite>
          <p className={authorRoleStyles}>{authorRole}</p>
        </div>
      </footer>
    </article>
  );
}
