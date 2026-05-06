"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowBackRounded, 
  CloseRounded, 
  AccessTimeRounded, 
  StarRounded, 
  NearMeRounded 
} from "@mui/icons-material";
import { LawyerCard } from "@/components/ui/lawyer-card";
import { cn } from "@/lib/utils";
import { useLawyersList } from "@/hooks/useLawyersList";
import type { LawyerSortOption } from "@/types/lawyer.types";

type SortButton = {
  id: LawyerSortOption;
  label: string;
  icon: React.ElementType;
};

const SORT_OPTIONS: SortButton[] = [
  {
    id: "availability",
    label: "Disponibilidade",
    icon: AccessTimeRounded,
  },
  {
    id: "rating",
    label: "Melhor Avaliação",
    icon: StarRounded,
  },
  {
    id: "proximity",
    label: "Mais Próximo",
    icon: NearMeRounded,
  },
];

export function LawyersListFeature() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<LawyerSortOption>("availability");
  const { lawyers, total, isLoading, error } = useLawyersList();

  const handleBack = () => {
    router.back();
  };

  const handleRemoveCategory = () => {
    setSelectedCategory("");
  };

  const handleViewLawyerDetails = (lawyerId: string) => {
    router.push(`/dashboard/advogados/${lawyerId}`);
  };

  const filteredLawyers = selectedCategory
    ? lawyers.filter((l) => l.specialization === selectedCategory)
    : lawyers;

  const sortedLawyers = [...filteredLawyers].sort((a, b) => {
    if (sortBy === "availability") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return 0;
  });

  const displayedLawyers = sortedLawyers.slice(0, 10);
  const totalAvailable = filteredLawyers.length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </button>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Especialistas Encontrados
        </h1>
      </header>

      {selectedCategory && (
        <section aria-label="Filtro ativo">
          <button
            type="button"
            onClick={handleRemoveCategory}
            className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#2585F4]/15 border border-[#2585F4] rounded-full text-xs font-semibold uppercase tracking-wide text-[#2585F4] hover:bg-[#2585F4]/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#2585F4]"
                aria-hidden="true"
              />
              {selectedCategory}
            </span>
            <CloseRounded sx={{ fontSize: 16 }} aria-hidden="true" />
            <span className="sr-only">Remover filtro</span>
          </button>
        </section>
      )}

      <section aria-labelledby="sort-heading">
        <h2
          id="sort-heading"
          className="text-xs font-semibold tracking-wider uppercase text-white/40 mb-3"
        >
          Ordenar por:
        </h2>

        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Opções de ordenação">
          {SORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = sortBy === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSortBy(option.id)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]",
                  isActive
                    ? "bg-[#2585F4]/15 border border-[#2585F4] text-[#2585F4]"
                    : "bg-[#0d1526] border border-[#1B2233] text-white/50 hover:text-white hover:border-white/20"
                )}
              >
                <Icon sx={{ fontSize: 18 }} aria-hidden="true" />
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="lawyers-heading">
        <h2 id="lawyers-heading" className="sr-only">Lista de advogados</h2>

        {isLoading && (
          <ul role="list" className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="h-24 animate-pulse rounded-xl bg-[#0d1526]" />
            ))}
          </ul>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        {!isLoading && displayedLawyers.length === 0 && !error && (
          <p className="text-sm text-white/40">Nenhum advogado encontrado.</p>
        )}

        {!isLoading && displayedLawyers.length > 0 && (
          <ul role="list" className="flex flex-col gap-3">
            {displayedLawyers.map((lawyer) => (
              <li key={lawyer.id}>
                <LawyerCard
                  lawyer={{
                    id: lawyer.id,
                    name: lawyer.full_name,
                    avatar: lawyer.avatar_image ?? '',
                    isOnline: false,
                    rating: { score: lawyer.rating ?? 0, totalReviews: 0 },
                    yearsOfExperience: 0,
                    specialization: lawyer.specialization,
                    description: '',
                    tags: [],
                  }}
                  onViewDetails={handleViewLawyerDetails}
                />
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-6 text-center">
          <p className="text-xs font-medium tracking-wider uppercase text-white/25">
            Exibindo {displayedLawyers.length} de {totalAvailable} especialistas disponíveis
          </p>
        </footer>
      </section>
    </div>
  );
}
