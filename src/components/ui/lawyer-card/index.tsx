import Image from "next/image";
import { ChevronRightRounded, StarRounded } from "@mui/icons-material";
import type { LawyerCardProps } from "./lawyer-card.types";

export function LawyerCard({ lawyer, onViewDetails }: LawyerCardProps) {
  const { id, name, avatar, isOnline, rating, specialization, description } = lawyer;

  const handleClick = () => {
    if (onViewDetails) onViewDetails(id);
  };

  const hasRating = rating && rating.score > 0;

  const renderStars = () =>
    Array.from({ length: 5 }, (_, index) => (
      <StarRounded
        key={index}
        sx={{ fontSize: 16 }}
        className={index < Math.floor(rating.score) ? "text-yellow-400" : "text-white/15"}
        aria-hidden="true"
      />
    ));

  return (
    <article className="flex items-center gap-4 px-5 py-4 bg-[#0d1526] border border-[#1B2233] rounded-2xl hover:border-[#2585F4]/30 transition-all duration-200 cursor-pointer">
      <figure className="relative shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Foto de ${name}`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full bg-[#2585F4]/20 flex items-center justify-center text-xl font-bold text-[#2585F4]"
            aria-hidden="true"
          >
            {name[0]}
          </div>
        )}
        {isOnline && (
          <span
            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0d1526] rounded-full"
            aria-label="Online"
          />
        )}
      </figure>

      <div className="flex-1 min-w-0">
        <header className="mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-white">{name}</h3>

            {hasRating && (
              <div className="flex items-center gap-1" aria-label={`Avaliação ${rating.score} de 5 estrelas`}>
                {renderStars()}
                <span className="ml-1 text-sm font-medium text-white/60">
                  {rating.score.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </header>

        {description && (
          <p className="text-xs text-white/50 mb-1 line-clamp-1">{description}</p>
        )}

        {specialization && (
          <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#111c30] text-white/70 rounded-lg border border-[#1B2233]">
            {specialization}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleClick}
        aria-label={`Ver detalhes de ${name}`}
        className="shrink-0 flex items-center justify-center w-10 h-10 bg-[#2585F4] hover:bg-[#1a6fd1] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1526] cursor-pointer"
      >
        <ChevronRightRounded className="text-white" aria-hidden="true" />
      </button>
    </article>
  );
}
