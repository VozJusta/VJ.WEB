import type { Lawyer } from "@/app/types/lawyer.types";

export type LawyerWithDetails = Lawyer & {
  bio: string;
  email: string;
  phone: string;
  location: string;
  oab: string;
  education: string[];
  availability: string;
};

export const LAWYERS_DATA: LawyerWithDetails[] = [
  {
    id: "1",
    name: "Dra. Beatriz Mendes",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
    rating: { score: 4.0, totalReviews: 215 },
    yearsOfExperience: 5,
    specialization: "Direito do Consumidor",
    description: "Especialista em Direito do Consumidor e Crimes Virtuais.",
    tags: ["Fraude", "Crimes Digitais"],
    bio: "Advogada atuante há 5 anos com foco em casos de Direito do Consumidor e proteção digital. Reconhecida por sua abordagem humanizada e resultados consistentes.",
    email: "beatriz.mendes@vozjusta.com.br",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    oab: "OAB/SP 123.456",
    education: [
      "Bacharel em Direito - USP (2018)",
      "Pós-graduação em Direito Digital - FGV (2020)",
      "Especialização em Crimes Cibernéticos - PUC-SP (2021)",
    ],
    availability: "Segunda a Sexta, 9h às 18h",
  },
  {
    id: "2",
    name: "Dr. Marcos Oliveira",
    avatar: "https://i.pravatar.cc/150?img=12",
    isOnline: false,
    rating: { score: 4.1, totalReviews: 42 },
    yearsOfExperience: 15,
    specialization: "Direito Civil",
    description: "Especialista em casos de saúde e responsabilidade civil.",
    tags: ["Saúde", "Medicina"],
    bio: "Com 15 anos de experiência, atua principalmente em casos de responsabilidade civil médica e questões relacionadas à saúde. Possui histórico comprovado de vitórias em processos complexos.",
    email: "marcos.oliveira@vozjusta.com.br",
    phone: "(11) 97654-3210",
    location: "São Paulo, SP",
    oab: "OAB/SP 234.567",
    education: [
      "Bacharel em Direito - PUC-SP (2008)",
      "Mestrado em Direito Civil - USP (2011)",
      "Especialização em Direito Médico - AASP (2013)",
    ],
    availability: "Atendimento sob agendamento",
  },
  {
    id: "3",
    name: "Dra. Aline Santos",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: true,
    rating: { score: 5.0, totalReviews: 88 },
    yearsOfExperience: 8,
    specialization: "Direito do Consumidor",
    description: "Focada em danos morais e proteção ao consumidor.",
    tags: ["Danos Morais", "E-commerce"],
    bio: "Especialista em danos morais e proteção ao consumidor com 8 anos de experiência. Reconhecida pelo alto índice de satisfação dos clientes e resolução ágil de conflitos.",
    email: "aline.santos@vozjusta.com.br",
    phone: "(11) 96543-2109",
    location: "São Paulo, SP",
    oab: "OAB/SP 345.678",
    education: [
      "Bacharel em Direito - Mackenzie (2015)",
      "Pós-graduação em Direito do Consumidor - FGV (2017)",
      "MBA em Direito Empresarial - USP/Esalq (2019)",
    ],
    availability: "Segunda a Sexta, 8h às 19h",
  },
];

export function getLawyerById(id: string): LawyerWithDetails | undefined {
  return LAWYERS_DATA.find((lawyer) => lawyer.id === id);
}
