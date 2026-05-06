export type DashboardUser = {
  name: string;
  avatarUrl?: string;
  role: string;
};

export type DashboardHeaderProps = {
  user: DashboardUser;
  onMenuToggle?: () => void;
  notificationsHref?: string;
};
