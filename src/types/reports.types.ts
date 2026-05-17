export type TCaseStatus = "Pending" | "Accepted" | "Refused";

export type ReportRole = "citizen" | "lawyer" | "Citizen" | "Lawyer";

export interface IPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IReport {
  id: string;
  category_detected: string;
  status: TCaseStatus;
  created_at: string;
}

export interface IGetReportsResponse {
  role: ReportRole;
  user: {
    data: IReport[];
  };
  pagination: IPagination;
}

export interface ILawyerInformations {
  full_name: string;
  bio: string;
  phone: string;
  email: string;
}

export interface IReportDetails {
  id: string;
  transcription: string;
  simplified_explanation: string;
  legal_analysis: string;
  category_detected: string;
  status: string;
  evidence: string[];
  lawyer: ILawyerInformations;
}

export interface IGetReportDetailsResponse {
  role: ReportRole;
  user: {
    report: IReportDetails;
  };
}
