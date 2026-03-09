import type { CaseStatus } from "@/components/ui/case-card/case-card.types";

export type TimelineStepStatus = "done" | "active" | "pending";

export type TimelineStep = {
  title: string;
  subtitle: string;
  status: TimelineStepStatus;
};

export type CaseDocument = {
  id: string;
  filename: string;
  meta: string; // e.g. "PDF • 2.4 MB"
  mimeType: "application/pdf" | "image/jpeg" | "image/png";
};

export type CaseDetail = {
  id: string;
  title: string;
  protocol: string;
  status: CaseStatus;
  statusBanner: {
    label: string;
    description: string;
  };
  timeline: TimelineStep[];
  report: string;
  documents: CaseDocument[];
};

export const CASES_DATA: CaseDetail[] = [
  {
    id: "29384",
    title: "Ação Trabalhista - XPTO Tecnologia",
    protocol: "#29384-BR",
    status: "analysis",
    statusBanner: {
      label: "Em Análise pela IA",
      description:
        "Nossa inteligência artificial está processando as provas anexadas.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "12 Out, 2023 · 14:30", status: "done" },
      { title: "Provas Validadas", subtitle: "14 Out, 2023 · 09:15", status: "done" },
      { title: "Análise Técnica", subtitle: "Em processamento...", status: "active" },
      { title: "Parecer Jurídico", subtitle: "Aguardando análise", status: "pending" },
    ],
    report:
      '"Fui demitido sem justa causa da empresa XPTO Tecnologia após 3 anos de serviço. Reclamo o não pagamento de horas extras acumuladas nos últimos 6 meses e irregularidades no depósito do FGTS..."',
    documents: [
      { id: "d1", filename: "Contrato_Trabalho.pdf", meta: "PDF • 2.4 MB", mimeType: "application/pdf" },
      { id: "d2", filename: "Screenshot_Ponto.png", meta: "PNG • 840 KB", mimeType: "image/png" },
      { id: "d3", filename: "Holerites_2023.pdf", meta: "PDF • 1.1 MB", mimeType: "application/pdf" },
      { id: "d4", filename: "FGTS_Extrato.pdf", meta: "PDF • 560 KB", mimeType: "application/pdf" },
    ],
  },
  {
    id: "11045",
    title: "Indenização por Danos Morais - Voo Latam",
    protocol: "#11045-BR",
    status: "concluded",
    statusBanner: {
      label: "Concluído",
      description: "O processo foi finalizado com êxito. Indenização garantida.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "03 Mar, 2024 · 10:00", status: "done" },
      { title: "Provas Validadas", subtitle: "05 Mar, 2024 · 08:30", status: "done" },
      { title: "Análise Técnica", subtitle: "10 Mar, 2024 · 14:00", status: "done" },
      { title: "Parecer Jurídico", subtitle: "Finalizado em 15/05/2024", status: "done" },
    ],
    report:
      '"Tive meu voo cancelado sem aviso prévio pela Latam, perdi compromisso profissional importante e não recebi assistência adequada no aeroporto. Busco indenização pelos danos sofridos..."',
    documents: [
      { id: "d1", filename: "Bilhete_Aereo.pdf", meta: "PDF • 320 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "Comprovante_Evento.png", meta: "PNG • 1.2 MB", mimeType: "image/png" },
    ],
  },
  {
    id: "34521",
    title: "Divórcio Consensual",
    protocol: "#34521-BR",
    status: "pending",
    statusBanner: {
      label: "Aguardando Advogado",
      description: "Seu processo foi recebido e aguarda atribuição de advogado especializado.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "10 Jun, 2024 · 11:00", status: "done" },
      { title: "Documentos Recebidos", subtitle: "11 Jun, 2024 · 09:00", status: "done" },
      { title: "Atribuição de Advogado", subtitle: "Em andamento...", status: "active" },
      { title: "Audiência Inicial", subtitle: "A agendar", status: "pending" },
    ],
    report:
      '"Acordo mútuo entre as partes para dissolução do vínculo matrimonial. Necessidade de partilha de bens adquiridos após 2018 e definição de guarda compartilhada dos filhos menores..."',
    documents: [
      { id: "d1", filename: "Certidao_Casamento.pdf", meta: "PDF • 410 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "RG_Conjuge.png", meta: "PNG • 950 KB", mimeType: "image/png" },
    ],
  },
  {
    id: "44912",
    title: "Revisão de Contrato Imobiliário",
    protocol: "#44912-BR",
    status: "analysis",
    statusBanner: {
      label: "Em Análise pela IA",
      description: "O contrato está sendo analisado por nossa inteligência artificial.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "01 Set, 2024 · 15:00", status: "done" },
      { title: "Contrato Recebido", subtitle: "02 Set, 2024 · 10:20", status: "done" },
      { title: "Análise de Cláusulas", subtitle: "Em processamento...", status: "active" },
      { title: "Relatório Final", subtitle: "Aguardando análise", status: "pending" },
    ],
    report:
      '"Identifico cláusulas abusivas no contrato de compra e venda do imóvel adquirido. Há cobrança indevida de taxa de evolução de obra e juros acima do permitido pela legislação..."',
    documents: [
      { id: "d1", filename: "Contrato_Imovel.pdf", meta: "PDF • 3.8 MB", mimeType: "application/pdf" },
      { id: "d2", filename: "Comprovante_Pgto.pdf", meta: "PDF • 220 KB", mimeType: "application/pdf" },
    ],
  },
  {
    id: "18228",
    title: "Pensão Alimentícia",
    protocol: "#18228-BR",
    status: "concluded",
    statusBanner: {
      label: "Concluído",
      description: "Acordo homologado. Pensão alimentícia fixada com sucesso.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "10 Jan, 2024 · 09:00", status: "done" },
      { title: "Provas Validadas", subtitle: "12 Jan, 2024 · 14:00", status: "done" },
      { title: "Análise Técnica", subtitle: "18 Jan, 2024 · 11:30", status: "done" },
      { title: "Acordo Homologado", subtitle: "Finalizado em 02/02/2024", status: "done" },
    ],
    report:
      '"Solicito revisão do valor da pensão alimentícia vigente, considerando a alteração da renda do alimentante e o aumento das necessidades da criança com o crescimento escolar..."',
    documents: [
      { id: "d1", filename: "Sentenca_Pensao.pdf", meta: "PDF • 780 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "Comprovante_Renda.pdf", meta: "PDF • 430 KB", mimeType: "application/pdf" },
    ],
  },
  {
    id: "55103",
    title: "Ação de Cobrança - Serviços Prestados",
    protocol: "#55103-BR",
    status: "analysis",
    statusBanner: {
      label: "Em Análise pela IA",
      description: "Os documentos de cobrança estão sendo verificados.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "05 Nov, 2024 · 08:00", status: "done" },
      { title: "Documentos Recebidos", subtitle: "06 Nov, 2024 · 10:00", status: "done" },
      { title: "Análise Técnica", subtitle: "Em processamento...", status: "active" },
    ],
    report:
      '"Prestei serviços de consultoria por 4 meses para empresa XYZ e não recebi o pagamento combinado de R$ 24.000,00. Existem contratos assinados e comprovantes de entrega dos relatórios..."',
    documents: [
      { id: "d1", filename: "Contrato_Servicos.pdf", meta: "PDF • 650 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "NF_Servicos.pdf", meta: "PDF • 190 KB", mimeType: "application/pdf" },
      { id: "d3", filename: "Email_Confirmacao.png", meta: "PNG • 720 KB", mimeType: "image/png" },
    ],
  },
  {
    id: "62874",
    title: "Inventário e Partilha de Bens",
    protocol: "#62874-BR",
    status: "pending",
    statusBanner: {
      label: "Aguardando Advogado",
      description: "Processo de inventário recebido e em fila para atribuição.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "22 Jul, 2024 · 16:00", status: "done" },
      { title: "Atribuição de Advogado", subtitle: "Em andamento...", status: "active" },
      { title: "Abertura do Inventário", subtitle: "A agendar", status: "pending" },
    ],
    report:
      '"Necessito realizar inventário extrajudicial do espólio de meu pai falecido. Há imóvel, veículo e conta bancária a partilhar entre dois herdeiros de maneira igualitária..."',
    documents: [
      { id: "d1", filename: "Certidao_Obito.pdf", meta: "PDF • 290 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "Matricula_Imovel.pdf", meta: "PDF • 1.4 MB", mimeType: "application/pdf" },
    ],
  },
  {
    id: "71390",
    title: "Rescisão Contratual - Locação Comercial",
    protocol: "#71390-BR",
    status: "archived",
    statusBanner: {
      label: "Arquivado",
      description: "Este caso foi encerrado e arquivado.",
    },
    timeline: [
      { title: "Relato Enviado", subtitle: "01 Ago, 2023 · 09:00", status: "done" },
      { title: "Análise Concluída", subtitle: "15 Ago, 2023 · 17:00", status: "done" },
      { title: "Caso Arquivado", subtitle: "Arquivado em 30/11/2023", status: "done" },
    ],
    report:
      '"Locatário comercial descumpriu cláusulas contratuais ao sublocar espaço sem autorização e acumulou 3 meses de inadimplência. Busco rescisão com perdas e danos..."',
    documents: [
      { id: "d1", filename: "Contrato_Locacao.pdf", meta: "PDF • 870 KB", mimeType: "application/pdf" },
      { id: "d2", filename: "Notificacao_Extrajud.pdf", meta: "PDF • 340 KB", mimeType: "application/pdf" },
    ],
  },
];

export function getCaseById(id: string): CaseDetail | undefined {
  return CASES_DATA.find((c) => c.id === id);
}
