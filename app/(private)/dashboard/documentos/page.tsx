import type { Metadata } from "next";
import { DocumentsFeature } from "@/features/dashboard/documents";

export const metadata: Metadata = {
  title: "Documentos | Voz Justa",
  description: "Gerencie seus documentos jurídicos com segurança",
};

export default function DocumentosPage() {
  return <DocumentsFeature />;
}

