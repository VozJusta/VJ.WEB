export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

export interface FooterProps {
  className?: string;
}
