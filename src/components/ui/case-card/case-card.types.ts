export type CaseStatus = "analysis" | "concluded" | "pending" | "archived";

export type CaseCardProps = {
  id: string;
  title: string;
  status: CaseStatus;
  updatedLabel: string;
  protocol: string;
  href: string;
  className?: string;
};
