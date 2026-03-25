export type CaseDocCardProps = {
  filename: string;
  meta: string;
  mimeType: "application/pdf" | "image/jpeg" | "image/png";
  onDownload?: (filename: string) => void;
  onPreview?: (filename: string) => void;
};
