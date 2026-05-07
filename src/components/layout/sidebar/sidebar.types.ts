export type SidebarNavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  className?: string;
  homeHref?: string;
  mainNav?: SidebarNavItem[];
  bottomNav?: SidebarNavItem[];
};
