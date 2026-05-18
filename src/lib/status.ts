export type ApiCaseStatus = "Pending" | "Accepted" | "Refused";

export const SPECIALIZATION_OPTIONS = [
  { label: "Administrativo", value: "Administrative" },
  { label: "Aduaneiro", value: "Customs" },
  { label: "Assessoria Jurídica", value: "Legal_support" },
  { label: "Aeronáutico", value: "Aviation" },
  { label: "Agrário", value: "Agrarian" },
  { label: "Ambiental", value: "Environmental" },
  { label: "Arbitragem", value: "Arbitration" },
  { label: "Direitos Autorais", value: "Copyright" },
  { label: "Bancário e Financeiro", value: "Banking_and_financial" },
  { label: "Biotecnologia", value: "Biotechnology" },
  { label: "Civil", value: "Civil" },
  { label: "Comercial", value: "Commercial" },
  { label: "Comércio Internacional", value: "International_trade" },
  { label: "Concorrencial", value: "Competition" },
  { label: "Constitucional", value: "Constitutional" },
  { label: "Consumidor", value: "Consumer" },
  { label: "Contratos Comerciais", value: "Commercial_contracts" },
  { label: "Desportivo", value: "Sports" },
  { label: "Direito das Águas", value: "Water" },
  { label: "Terceiro Setor", value: "Third_sector" },
  { label: "Econômico", value: "Economic" },
  { label: "Eleitoral", value: "Electoral" },
  { label: "Penal Empresarial", value: "Corporate_criminal" },
  { label: "Energia", value: "Energy" },
  { label: "Falimentar", value: "Bankruptcy" },
  { label: "Família", value: "Family" },
  { label: "Fusões e Aquisições", value: "Mergers" },
  { label: "Imobiliário", value: "Real_estate" },
  { label: "Importação e Exportação", value: "Import_and_export" },
  { label: "Infraestrutura", value: "Infrastructure" },
  { label: "Internacional", value: "International" },
  { label: "Internet e Comércio Eletrônico", value: "Internet_and_ECommerce" },
  { label: "Marítimo", value: "Maritime" },
  { label: "Mercado de Capitais", value: "Capital_markets" },
  { label: "Minerário", value: "Mining" },
  { label: "Operações Financeiras", value: "Financial_operations" },
  { label: "Penal", value: "Criminal" },
  { label: "Óleo e Gás", value: "Oil_and_gas" },
  { label: "Previdenciário", value: "Social_security" },
  { label: "Financiamento de Projetos", value: "Project_finance" },
  { label: "Propriedade Intelectual", value: "Intellectual_property" },
  { label: "Reestruturação Empresarial", value: "Corporate_restructuring" },
  { label: "Regulatório", value: "Regulatory" },
  { label: "Saúde e Sanitário", value: "Health_and_sanitary" },
  { label: "Seguros", value: "Insurance" },
  { label: "Sindical", value: "Labor_union" },
  { label: "Societário", value: "Corporate" },
  { label: "Telecomunicações", value: "Telecommunications" },
  { label: "Trabalhista", value: "Labor_and_employment" },
  { label: "Tributário", value: "Tax" },
] as const;

export function translateStatus(status: string): string {
  switch (status) {
    case "Accepted": return "Aceito";
    case "Pending": return "Pendente";
    case "Refused": return "Recusado";
    default: return status;
  }
}

export interface StatusClasses {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export function getStatusClasses(status: string): StatusClasses {
  switch (status) {
    case "Accepted":
      return {
        bg: "bg-emerald-400/10",
        text: "text-emerald-400",
        border: "border-emerald-400/20",
        dot: "bg-emerald-400",
      };
    case "Refused":
      return {
        bg: "bg-red-400/10",
        text: "text-red-400",
        border: "border-red-400/20",
        dot: "bg-red-400",
      };
    case "Pending":
    default:
      return {
        bg: "bg-orange-400/10",
        text: "text-orange-400",
        border: "border-orange-400/20",
        dot: "bg-orange-400",
      };
  }
}

export function getCategoryLabel(value: string): string {
  const option = SPECIALIZATION_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
}

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}
