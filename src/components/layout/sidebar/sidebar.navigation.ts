import {
  HomeRounded,
  ChatBubbleOutlineRounded,
  PsychologyRounded,
  NotificationsOutlined,
  PersonOutlineRounded,
  SettingsOutlined,
  LogoutRounded,
} from "@mui/icons-material";
import type { SidebarNavItem } from "./sidebar.types";

export const sidebarMainNav: SidebarNavItem[] = [
  { label: "Início", href: "/dashboard", icon: HomeRounded },
  { label: "Chat", href: "/dashboard/casos/novo", icon: ChatBubbleOutlineRounded },
  { label: "Simulador", href: "/dashboard/simulador", icon: PsychologyRounded },
  { label: "Notificações", href: "/dashboard/notificacoes", icon: NotificationsOutlined },
  { label: "Perfil", href: "/dashboard/perfil", icon: PersonOutlineRounded },
];

export const sidebarBottomNav: SidebarNavItem[] = [
  { label: "Configurações", href: "/dashboard/configuracoes", icon: SettingsOutlined },
  { label: "Sair", href: "/sair", icon: LogoutRounded },
];
