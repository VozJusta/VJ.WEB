import Image from "next/image";
import { cn } from "@/lib/utils";
import { teamMemberCardStyles } from "./team-member-card.styles";
import type { TeamMemberProps } from "./team-member-card.types";

export function TeamMemberCard({
  name,
  role,
  description,
  image,
  initials,
  className,
  style,
}: TeamMemberProps) {
  const displayInitials =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <article
      className={cn(teamMemberCardStyles.container, className)}
      style={style}
    >
      <div className={teamMemberCardStyles.avatarWrapper}>
        {image ? (
          <Image
            src={image}
            alt={`Foto de ${name}`}
            width={80}
            height={80}
            className={teamMemberCardStyles.avatar}
          />
        ) : (
          <div className={teamMemberCardStyles.fallbackAvatar}>
            {displayInitials}
          </div>
        )}
      </div>

      <h3 className={teamMemberCardStyles.name}>{name}</h3>
      <p className={teamMemberCardStyles.role}>{role}</p>
      <p className={teamMemberCardStyles.description}>{description}</p>
    </article>
  );
}
