export type TimelineStepStatus = "done" | "active" | "pending";

export type TimelineItemProps = {
  title: string;
  subtitle: string;
  status: TimelineStepStatus;
  isLast?: boolean;
};
