import type { PriorityLevel } from "@/components/ui/viability-card";

export type RequestDetailData = {
  id: string;
  protocol: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  area: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  viability: {
    matchPercentage: number;
    description: string;
    priority: PriorityLevel;
  };
  matchReasons: string[];
  strengths: string[];
  risks: string[];
  documents: Array<{
    id: string;
    name: string;
    size: string;
    uploadedAt: string;
  }>;
};

export const MOCK_REQUEST_DETAIL: RequestDetailData = {
  id: "req-001",
  protocol: "REP-2024-891",
  citizenName: "Carlos Souza",
  citizenPhone: "(11) 98765-4321",
  citizenEmail: "carlos.souza@email.com",
  area: "Direito Trabalhista",
  status: "pending",
  createdAt: "20/03/2024",
  viability: {
    matchPercentage: 85,
    description:
      "Este caso apresenta alta compatibilidade com sua área de atuação e histórico de casos similares. A documentação fornecida está completa e as chances de êxito são favoráveis.",
    priority: "high",
  },
  matchReasons: [
    "Especialização em Direito Trabalhista com 8 anos de experiência",
    "Histórico de 12 casos similares com 83% de êxito",
    "Disponibilidade de atendimento na região do cliente",
    "Documentação completa e bem organizada pelo cidadão",
  ],
  strengths: [
    "Documentação trabalhista completa (CTPS, contracheques, rescisão)",
    "Testemunhas disponíveis para corroborar as alegações",
    "Precedentes jurídicos favoráveis em casos similares",
    "Prazo de prescrição respeitado",
  ],
  risks: [
    "Ausência de registro de horas extras em ponto eletrônico",
    "Possível contestação sobre caracterização de assédio moral",
    "Empresa possui histórico de recursos em instâncias superiores",
  ],
  documents: [
    {
      id: "doc-1",
      name: "Carteira de Trabalho.pdf",
      size: "2.4 MB",
      uploadedAt: "20/03/2024",
    },
    {
      id: "doc-2",
      name: "Contracheques_2023.pdf",
      size: "1.8 MB",
      uploadedAt: "20/03/2024",
    },
    {
      id: "doc-3",
      name: "Rescisao_Contratual.pdf",
      size: "856 KB",
      uploadedAt: "20/03/2024",
    },
    {
      id: "doc-4",
      name: "Emails_Corporativos.pdf",
      size: "3.2 MB",
      uploadedAt: "20/03/2024",
    },
  ],
};
