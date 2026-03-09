export interface EmptyStateProps {
  illustration: string;
  illustrationAlt: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  };
}
