import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DossierSentFeature } from "@/app/features/dashboard/lawyers/dossier-sent-feature";
import { getLawyerById } from "@/app/features/dashboard/lawyers/lawyers.data";

export const metadata: Metadata = {
  title: "Dossiê Enviado | Voz Justa",
  description: "Seu dossiê técnico foi enviado com sucesso",
};

interface DossierSentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DossierSentPage({ params }: DossierSentPageProps) {
  const { id } = await params;
  const lawyer = getLawyerById(id);

  if (!lawyer) {
    notFound();
  }

  return (
    <DossierSentFeature 
      lawyerName={lawyer.name}
      lawyerId={lawyer.id}
    />
  );
}
