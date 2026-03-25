import type { DocumentFileItemProps } from "@/src/components/ui/document-file-item/document-file-item.types";

export const recentDocuments: DocumentFileItemProps[] = [
  {
    id: "doc-001",
    filename: "Contrato_Aluguel_Residencial.pdf",
    sizeLabel: "1.2 MB",
    dateLabel: "14 Out 2023",
    mimeType: "application/pdf",
    status: "validated",
  },
  {
    id: "doc-002",
    filename: "Comprovante_Residencia_Set.jpg",
    sizeLabel: "2.4 MB",
    dateLabel: "12 Out 2023",
    mimeType: "image/jpeg",
    status: "analyzing",
  },
  {
    id: "doc-003",
    filename: "Identidade_Frente.pdf",
    sizeLabel: "850 KB",
    dateLabel: "10 Out 2023",
    mimeType: "application/pdf",
    status: "validated",
  },
];

export const allDocuments: DocumentFileItemProps[] = [
  ...recentDocuments,
  {
    id: "doc-004",
    filename: "Identidade_Verso.pdf",
    sizeLabel: "850 KB",
    dateLabel: "10 Out 2023",
    mimeType: "application/pdf",
    status: "validated",
  },
  {
    id: "doc-005",
    filename: "Certidao_Nascimento.pdf",
    sizeLabel: "620 KB",
    dateLabel: "08 Out 2023",
    mimeType: "application/pdf",
    status: "validated",
  },
  {
    id: "doc-006",
    filename: "Comprovante_Renda_Ago.jpg",
    sizeLabel: "1.8 MB",
    dateLabel: "05 Out 2023",
    mimeType: "image/jpeg",
    status: "analyzing",
  },
  {
    id: "doc-007",
    filename: "Contrato_Trabalho.pdf",
    sizeLabel: "3.1 MB",
    dateLabel: "01 Out 2023",
    mimeType: "application/pdf",
    status: "rejected",
  },
];

