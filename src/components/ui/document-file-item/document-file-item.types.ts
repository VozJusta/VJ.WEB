export type DocumentStatus = "validated" | "analyzing" | "rejected";

export interface DocumentFileItemProps {
  id: string;
  filename: string;
  sizeLabel: string;
  dateLabel: string;
  mimeType: "application/pdf" | "image/jpeg" | "image/png";
  status: DocumentStatus;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
}
