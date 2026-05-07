"use client";

import { use } from "react";
import { LawyerProfileFeature } from "@/features/dashboard/lawyers/lawyer-profile-feature";
import { useLawyerProfile } from "@/hooks/useLawyerProfile";

interface LawyerProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function LawyerProfilePage({ params }: LawyerProfilePageProps) {
  const { id } = use(params);
  const { lawyer, isLoading, error } = useLawyerProfile(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/8" />
        <div className="h-80 animate-pulse rounded-3xl bg-[#0d1526]" />
        <div className="h-40 animate-pulse rounded-3xl bg-[#0d1526]" />
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-sm text-red-400">{error ?? "Advogado não encontrado."}</p>
      </div>
    );
  }

  return <LawyerProfileFeature lawyer={lawyer} lawyerId={id} />;
}
