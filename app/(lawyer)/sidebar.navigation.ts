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
  { label: "Dashboard", href: "/lawyer/dashboard", icon: HomeRounded },
  { label: "Solicitações", href: "/lawyer/dashboard/requests", icon: GavelRounded },
  { label: "Clientes", href: "/lawyer/dashboard/clients", icon: PeopleOutlineRounded },
  { label: "Relatórios", href: "/lawyer/dashboard/reports", icon: AssessmentOutlined },
  { label: "Perfil", href: "/lawyer/dashboard/profile", icon: PersonOutlineRounded },
];

export const lawyerSidebarBottomNav: SidebarNavItem[] = [
  { label: "Configurações", href: "/lawyer/dashboard/settings", icon: SettingsOutlined },
  { label: "Sair", href: "/logout", icon: LogoutRounded },
];
