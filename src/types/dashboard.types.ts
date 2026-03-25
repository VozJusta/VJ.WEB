export type StatCardData = {
  label: string;
  value: number | string;
  change: number;
  isPositive: boolean;
  unit?: string;
};

export type ChartDataPoint = {
  date: string;
  value: number;
};

export type OperationalStatus = {
  label: string;
  value: number;
  color: string;
};

export type PriorityLevel = "urgent" | "high" | "medium" | "low";

export type RequestStatus = "pending" | "in_progress" | "completed" | "rejected";

export type PriorityRequest = {
  id: string;
  score: number;
  title: string;
  description: string;
  status: RequestStatus;
  priority: PriorityLevel;
  date: string;
  category: string;
};
