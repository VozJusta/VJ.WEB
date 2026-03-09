export interface SidebarNavItem {
  label: string;
  href: string;
  icon: "home" | "documents" | "chat" | "simulator" | "profile" | "settings" | "logout";
}

export const mainNavItems: SidebarNavItem[] = [
  { label: "Início", href: "/dashboard", icon: "home" },
  { label: "Documentos", href: "/documentos", icon: "documents" },
  { label: "Chat", href: "dashboard/casos/novo", icon: "chat" },
  { label: "Simulador", href: "/simulador", icon: "simulator" },
  { label: "Perfil", href: "/perfil", icon: "profile" },
];

export const bottomNavItems: SidebarNavItem[] = [
  { label: "Configurações", href: "/configuracoes", icon: "settings" },
  { label: "Sair", href: "/logout", icon: "logout" },
];
