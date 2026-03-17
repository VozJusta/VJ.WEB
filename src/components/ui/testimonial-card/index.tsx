import Image from "next/image";
import { TestimonialCardProps } from "./testimonial-card.types";
import {
  testimonialCardBaseStyles,
  quoteStyles,
  avatarStyles,
  authorNameStyles,
  authorRoleStyles,
} from "./testimonial-card.styles";

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorInitials,
  authorAvatar,
  className = "",
}: TestimonialCardProps) {
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
      <blockquote className={quoteStyles}>{quote}</blockquote>

      <footer className="flex items-center gap-4">
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

        <div className="flex flex-col gap-1">
          <cite className={`${authorNameStyles} not-italic`}>{authorName}</cite>
          <p className={authorRoleStyles}>{authorRole}</p>
        </div>
      </footer>
    </article>
  );
}
