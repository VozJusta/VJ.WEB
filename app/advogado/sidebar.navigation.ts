import {
  HomeRounded,
  GavelRounded,
  PeopleOutlineRounded,
  AssessmentOutlined,
  PersonOutlineRounded,
  SettingsOutlined,
  LogoutRounded,
} from "@mui/icons-material";
import type { SidebarNavItem } from "@/components/layout/sidebar/sidebar.types";

export const lawyerSidebarMainNav: SidebarNavItem[] = [
  { label: "Dashboard", href: "/advogado/dashboard", icon: HomeRounded },
  { label: "Solicitações", href: "/advogado/dashboard/requests", icon: GavelRounded },
  { label: "Clientes", href: "/advogado/dashboard/clients", icon: PeopleOutlineRounded },
  { label: "Relatórios", href: "/advogado/dashboard/reports", icon: AssessmentOutlined },
  { label: "Perfil", href: "/advogado/dashboard/profile", icon: PersonOutlineRounded },
];

export const lawyerSidebarBottomNav: SidebarNavItem[] = [
  { label: "Configurações", href: "/advogado/dashboard/settings", icon: SettingsOutlined },
  { label: "Sair", href: "/logout", icon: LogoutRounded },
];
