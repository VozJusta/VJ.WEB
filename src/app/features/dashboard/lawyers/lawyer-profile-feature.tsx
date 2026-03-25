"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowBackRounded,
  StarRounded,
  VerifiedRounded,
  WorkRounded,
  SchoolRounded,
  LocationOnRounded,
  EmailRounded,
  PhoneRounded,
  CalendarTodayRounded,
} from "@mui/icons-material";
import { Button } from "@/src/components/ui/button";
import type { Lawyer } from "@/src/types/lawyer.types";

interface LawyerProfileFeatureProps {
  lawyer: Lawyer & {
    bio: string;
    email: string;
    phone: string;
    location: string;
    oab: string;
    education: string[];
    availability: string;
  };
}

export function LawyerProfileFeature({ lawyer }: LawyerProfileFeatureProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleContact = () => {
    router.push(`/dashboard/advogados/${lawyer.id}/enviar`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarRounded
        key={index}
        sx={{ fontSize: 20 }}
        className={index < Math.floor(lawyer.rating.score) ? "text-yellow-400" : "text-white/15"}
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
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
          Perfil do Especialista
        </h1>
      </header>

      <article className="bg-[#0d1526] border border-[#1B2233] rounded-3xl overflow-hidden">
        <header className="relative bg-linear-to-b from-[#2585F4]/10 to-transparent p-8 pb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <figure className="relative">
              <Image
                src={lawyer.avatar}
                alt={`Foto de ${lawyer.name}`}
                width={120}
                height={120}
                className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-[#0d1526]"
              />
              {lawyer.isOnline && (
                <span
                  className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-4 border-[#0d1526] rounded-full"
                  aria-label="Online agora"
                />
              )}
            </figure>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {lawyer.name}
                </h2>
                <VerifiedRounded 
                  className="text-[#2585F4]" 
                  sx={{ fontSize: 20 }}
                  aria-label="Perfil verificado"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                {renderStars()}
                <span className="ml-1 text-sm font-semibold text-white">
                  {lawyer.rating.score.toFixed(1)}
                </span>
                <span className="text-sm text-white/50">
                  ({lawyer.rating.totalReviews} avaliações)
                </span>
              </div>

              <p className="text-sm text-white/70 mb-4">
                {lawyer.bio}
              </p>

              <ul className="flex items-center gap-2 flex-wrap" role="list">
                {lawyer.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex px-3 py-1.5 text-xs font-semibold bg-[#2585F4]/15 text-[#2585F4] rounded-lg border border-[#2585F4]/30">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <section className="p-8 space-y-8" aria-labelledby="lawyer-details-heading">
          <h3 id="lawyer-details-heading" className="sr-only">
            Informações detalhadas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2585F4]/15 shrink-0">
                <WorkRounded fontSize="small" className="text-[#2585F4]" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                  Especialização
                </h4>
                <p className="text-sm font-medium text-white">
                  {lawyer.specialization}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/15 shrink-0">
                <CalendarTodayRounded fontSize="small" className="text-orange-400" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                  Experiência
                </h4>
                <p className="text-sm font-medium text-white">
                  {lawyer.yearsOfExperience} anos de advocacia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/15 shrink-0">
                <VerifiedRounded fontSize="small" className="text-green-400" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                  OAB
                </h4>
                <p className="text-sm font-medium text-white">
                  {lawyer.oab}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/15 shrink-0">
                <LocationOnRounded fontSize="small" className="text-purple-400" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                  Localização
                </h4>
                <p className="text-sm font-medium text-white">
                  {lawyer.location}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1B2233] pt-6">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
              <SchoolRounded fontSize="small" className="text-[#2585F4]" aria-hidden />
              Formação Acadêmica
            </h4>
            <ul className="space-y-2" role="list">
              {lawyer.education.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2585F4] shrink-0" aria-hidden />
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#1B2233] pt-6">
            <h4 className="text-sm font-semibold text-white mb-4">
              Informações de Contato
            </h4>
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-3">
                <EmailRounded fontSize="small" className="text-white/40" aria-hidden />
                <a 
                  href={`mailto:${lawyer.email}`}
                  className="text-sm text-[#2585F4] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] rounded"
                >
                  {lawyer.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneRounded fontSize="small" className="text-white/40" aria-hidden />
                <a 
                  href={`tel:${lawyer.phone}`}
                  className="text-sm text-[#2585F4] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] rounded"
                >
                  {lawyer.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-[#111c30] border border-[#1B2233] rounded-xl p-4">
            <p className="text-xs text-white/50 text-center">
              <strong className="text-white/70">Disponibilidade:</strong> {lawyer.availability}
            </p>
          </div>
        </section>

        <footer className="border-t border-[#1B2233] p-8 bg-[#0a0f1a]/50">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContact}
          >
            Entrar em Contato
          </Button>
        </footer>
      </article>
    </div>
  );
}
