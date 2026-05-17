export interface EmptyStateProps {
  illustration?: string;
  illustrationAlt?: string;
  /** Inline SVG element to use instead of an image URL */
  illustrationSvg?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  };
}
