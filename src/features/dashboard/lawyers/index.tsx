"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBackRounded } from "@mui/icons-material";
import { LawyerCard } from "@/components/ui/lawyer-card";
import { useLawyersList } from "@/hooks/useLawyersList";
import { getCategoryLabel } from "@/lib/status";

export function LawyersListFeature() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId") ?? "";
  const { lawyers, isLoading, error } = useLawyersList();

  const handleBack = () => router.back();

  const handleViewLawyerDetails = (lawyerId: string) => {
    const query = caseId ? `?caseId=${caseId}` : "";
    router.push(`/dashboard/advogados/${lawyerId}${query}`);
  };

  const sortedLawyers = [...lawyers].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <div className="flex flex-col gap-3 w-full max-w-5xl mx-auto px-4 py-1 md:px-6 md:py-2">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] cursor-pointer"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </button>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Especialistas Encontrados
        </h1>
      </header>

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

        {!isLoading && sortedLawyers.length === 0 && !error && (
          <p className="text-sm text-white/40">Nenhum advogado encontrado.</p>
        )}

        {!isLoading && sortedLawyers.length > 0 && (
          <ul role="list" className="flex flex-col gap-3">
            {sortedLawyers.map((lawyer) => (
              <li key={lawyer.id}>
                <LawyerCard
                  lawyer={{
                    id: lawyer.id,
                    name: lawyer.full_name,
                    avatar: lawyer.avatar_image ?? '',
                    isOnline: false,
                    rating: { score: lawyer.rating ?? 0, totalReviews: 0 },
                    yearsOfExperience: 0,
                    specialization: getCategoryLabel(lawyer.specialization),
                    description: '',
                    tags: [],
                  }}
                  onViewDetails={handleViewLawyerDetails}
                />
              </li>
            ))}
          </ul>
        )}

        {!isLoading && sortedLawyers.length > 0 && (
          <footer className="mt-4 text-center">
            <p className="text-xs font-medium tracking-wider uppercase text-white/25">
              {sortedLawyers.length} especialista{sortedLawyers.length !== 1 ? "s" : ""} disponíve{sortedLawyers.length !== 1 ? "is" : "l"}
            </p>
          </footer>
        )}
      </section>
    </div>
  );
}
