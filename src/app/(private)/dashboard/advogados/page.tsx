import type { Metadata } from "next";
import { LawyersListFeature } from "@/app/features/dashboard/lawyers";

export const metadata: Metadata = {
  title: "Especialistas | Voz Justa",
  description: "Encontre advogados especializados para seu caso",
};

export default function AdvogadosPage() {
  return <LawyersListFeature />;
}
