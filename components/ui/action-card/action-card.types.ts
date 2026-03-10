export type ActionCardVariant = "primary" | "secondary";

export type ActionCardAction = {
  label: string;
  href: string;
  variant: ActionCardVariant;
};

export type ActionCardProps = {
  icon: React.ReactNode;
  decorativeIcon?: React.ReactNode;
  title: string;
  description: string;
  action: ActionCardAction;
  className?: string;
};
