import {
  HomeRounded,
  InboxRounded,
  NotificationsOutlined,
  PersonOutlineRounded,
  SettingsOutlined,
  LogoutRounded,
  CardMembershipRounded,
} from "@mui/icons-material";
import type { SidebarNavItem } from "./sidebar.types";

export const lawyerMainNav: SidebarNavItem[] = [
  { label: "Dashboard", href: "/advogado", icon: HomeRounded },
  { label: "Solicitações", href: "/advogado/solicitacoes", icon: InboxRounded },
  { label: "Notificações", href: "/advogado/notificacoes", icon: NotificationsOutlined },
  { label: "Perfil", href: "/advogado/perfil", icon: PersonOutlineRounded },
];

export const lawyerBottomNav: SidebarNavItem[] = [

  { label: "Configurações", href: "/advogado/configuracoes", icon: SettingsOutlined },
  { label: "Sair", href: "/sair", icon: LogoutRounded },
];
