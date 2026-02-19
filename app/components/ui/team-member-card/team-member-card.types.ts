export interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image?: string;
  initials?: string;
  className?: string;
  style?: React.CSSProperties;
}
