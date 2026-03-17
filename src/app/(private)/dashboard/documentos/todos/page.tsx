import type { Metadata } from "next";
import { AllDocumentsFeature } from "@/app/features/dashboard/documents/all-documents-feature";

export const metadata: Metadata = {
  title: "Todos os Documentos | Voz Justa",
  description: "Lista completa dos seus documentos jurídicos",
};

export default function TodosDocumentosPage() {
  return <AllDocumentsFeature />;
}
