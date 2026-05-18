import {
  HomeRounded,
  ChatBubbleOutlineRounded,
  FolderOpenRounded,
  PsychologyRounded,
  GavelRounded,
  NotificationsOutlined,
  PersonOutlineRounded,
  SettingsOutlined,
  LockOutlined,
  InboxRounded,
} from "@mui/icons-material";

export interface SearchRoute {
  label: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

export const citizenRoutes: SearchRoute[] = [
  { label: "Início", href: "/dashboard", icon: HomeRounded, description: "Página principal" },
  { label: "Chat", href: "/dashboard/casos/novo", icon: ChatBubbleOutlineRounded, description: "Iniciar novo caso com IA" },
  { label: "Meus Casos", href: "/dashboard/casos", icon: FolderOpenRounded, description: "Histórico de casos" },
  { label: "Simulador", href: "/dashboard/simulador", icon: PsychologyRounded, description: "Simular audiência com IA" },
  { label: "Advogados", href: "/dashboard/advogados", icon: GavelRounded, description: "Encontrar advogados" },
  { label: "Notificações", href: "/dashboard/notificacoes", icon: NotificationsOutlined, description: "Suas notificações" },
  { label: "Perfil", href: "/dashboard/perfil", icon: PersonOutlineRounded, description: "Seus dados pessoais" },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: SettingsOutlined, description: "Preferências da conta" },
  { label: "Alterar Senha", href: "/dashboard/configuracoes/alterar-senha", icon: LockOutlined, description: "Mudar sua senha" },
];

export const lawyerRoutes: SearchRoute[] = [
  { label: "Dashboard", href: "/advogado", icon: HomeRounded, description: "Página principal" },
  { label: "Solicitações", href: "/advogado/solicitacoes", icon: InboxRounded, description: "Casos pendentes de clientes" },
  { label: "Notificações", href: "/advogado/notificacoes", icon: NotificationsOutlined, description: "Suas notificações" },
  { label: "Perfil", href: "/advogado/perfil", icon: PersonOutlineRounded, description: "Seus dados profissionais" },
  { label: "Configurações", href: "/advogado/configuracoes", icon: SettingsOutlined, description: "Preferências da conta" },
  { label: "Alterar Senha", href: "/advogado/configuracoes/alterar-senha", icon: LockOutlined, description: "Mudar sua senha" },
];
