import type { TeamMemberProps } from "@/components/ui/team-member-card/team-member-card.types";

export interface TeamCategory {
  id: string;
  title: string;
  members: TeamMemberProps[];
}

export const teamMembers: TeamCategory[] = [
  {
    id: "frontend",
    title: "Desenvolvimento Front-End Web",
    members: [
      {
        name: "Pedro Henrique Moreira Sales",
        role: "Frontend Developer",
        description:
          "Especialista em React e Next.js, focado em criar interfaces modernas, performáticas e acessíveis. Apaixonado por design systems e arquitetura front-end escalável.",
        initials: "PS",
      },
    ],
  },
  {
    id: "backend",
    title: "Desenvolvimento Back-End",
    members: [
      {
        name: "Cauã Alves Bezerra",
        role: "Backend Engineer",
        description:
          "Arquiteto de soluções robustas e escaláveis. Especialista em APIs REST, microsserviços e otimização de bancos de dados para alto desempenho.",
        initials: "CA",
      },
      {
        name: "Rafael Santana Rosa",
        role: "Backend Engineer",
        description:
          "Desenvolvedor full stack com foco em infraestrutura e segurança. Mestre em integração de sistemas e automação de processos complexos.",
        initials: "RR",
      },
    ],
  },
  {
    id: "mobile",
    title: "Desenvolvimento Mobile React Native",
    members: [
      {
        name: "Thiago Menezes de Oliveira",
        role: "Mobile Developer",
        description:
          "Especialista em React Native com foco em experiências mobile nativas. Domina otimização de performance e integração com APIs complexas.",
        initials: "TM",
      },
      {
        name: "Felipe Vieira da Silva",
        role: "Mobile Developer",
        description:
          "Desenvolvedor mobile versátil com expertise em UX para dispositivos móveis. Focado em criar aplicações fluidas e intuitivas para iOS e Android.",
        initials: "FV",
      },
    ],
  },
  {
    id: "design",
    title: "Design UI & UX",
    members: [
      {
        name: "Bruno Barreto Cruz",
        role: "UI/UX Designer",
        description:
          "Designer visionário especializado em criar experiências digitais memoráveis. Combina estética moderna com usabilidade impecável.",
        initials: "BC",
      },
      {
        name: "Thiago Menezes da Silva",
        role: "UX Designer",
        description:
          "Especialista em pesquisa de usuário e design thinking. Transforma insights em soluções de design centradas no usuário.",
        initials: "TS",
      },
      {
        name: "Pedro Henrique Moreira Sales",
        role: "UI Designer",
        description:
          "Designer técnico que une código e design. Especialista em sistemas de design e prototipagem funcional de alta fidelidade.",
        initials: "PS",
      },
      {
        name: "Rafael Santana Rosa",
        role: "UX Researcher",
        description:
          "Analista de experiência do usuário com foco em dados e métricas. Especialista em testes de usabilidade e otimização de conversão.",
        initials: "RR",
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentação & Processos",
    members: [
      {
        name: "Felipe Vieira da Silva",
        role: "Technical Writer",
        description:
          "Especialista em documentação técnica clara e acessível. Transforma complexidade técnica em conteúdo compreensível para todos os públicos.",
        initials: "FV",
      },
      {
        name: "Pedro Henrique Moreira Sales",
        role: "Documentation Lead",
        description:
          "Líder de documentação com visão estratégica. Garante que todo conhecimento técnico seja registrado e compartilhado de forma eficiente.",
        initials: "PS",
      },
    ],
  },
];
