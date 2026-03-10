export type SidebarNavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};
