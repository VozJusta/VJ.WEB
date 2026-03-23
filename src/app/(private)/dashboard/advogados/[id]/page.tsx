import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LawyerProfileFeature } from "@/features/dashboard/lawyers/lawyer-profile-feature";
import { getLawyerById } from "@/features/dashboard/lawyers/lawyers.data";

interface LawyerProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: LawyerProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const lawyer = getLawyerById(id);

  if (!lawyer) {
    return {
      title: "Advogado não encontrado | Voz Justa",
    };
  }

  return {
    title: `${lawyer.name} - ${lawyer.specialization} | Voz Justa`,
    description: lawyer.description,
  };
}

export default async function LawyerProfilePage({ params }: LawyerProfilePageProps) {
  const { id } = await params;
  const lawyer = getLawyerById(id);

  if (!lawyer) {
    notFound();
  }

  return <LawyerProfileFeature lawyer={lawyer} />;
}
