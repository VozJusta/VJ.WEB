"use client";

import Link from "next/link";
import { OpenInNewRounded } from "@mui/icons-material";

export default function LawyerPlanoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">Meu Plano</h1>
        <p className="text-white/50 text-sm max-w-sm">
          Gerencie sua assinatura e confira os planos disponíveis na página inicial.
        </p>
      </div>
      <Link
        href="/#planos"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
      >
        Ver Planos Disponíveis
        <OpenInNewRounded sx={{ fontSize: 16 }} aria-hidden />
      </Link>
    </div>
  );
}
