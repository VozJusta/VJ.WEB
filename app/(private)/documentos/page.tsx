import type { Metadata } from "next";
import { AllDocumentsFeature } from "@/features/dashboard/documents/all-documents-feature";

export const metadata: Metadata = {
  title: "Documentos | Voz Justa",
  description: "Gerencie seus documentos jurídicos com segurança",
};

export default function DocumentosPage() {
  return <AllDocumentsFeature />;
}

