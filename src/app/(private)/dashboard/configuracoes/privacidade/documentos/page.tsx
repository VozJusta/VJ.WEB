import type { Metadata } from "next";
import { ManageDocumentsFeature } from "@/features/dashboard/settings/manage-documents-feature";

export const metadata: Metadata = {
  title: "Gerenciar Documentos | Voz Justa",
  description: "Controle quais documentos podem ser acessados por advogados",
};

export default function GerenciarDocumentosPage() {
  return <ManageDocumentsFeature />;
}
