import {
  HomeRounded,
  InboxRounded,
  FolderOpenRounded,
  PersonOutlineRounded,
  SettingsOutlined,
  LogoutRounded,
} from "@mui/icons-material";
import type { SidebarNavItem } from "./sidebar.types";

export const lawyerMainNav: SidebarNavItem[] = [
  { label: "Dashboard", href: "/advogado", icon: HomeRounded },
  { label: "Solicitações", href: "/advogado/solicitacoes", icon: InboxRounded },
  { label: "Meus Casos", href: "/advogado/casos", icon: FolderOpenRounded },
  { label: "Perfil", href: "/advogado/perfil", icon: PersonOutlineRounded },
];

export const lawyerBottomNav: SidebarNavItem[] = [
  { label: "Configurações", href: "/advogado/configuracoes", icon: SettingsOutlined },
  { label: "Sair", href: "/sair", icon: LogoutRounded },
];
