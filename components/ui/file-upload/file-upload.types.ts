export type UploadState = "idle" | "dragging" | "uploading" | "success" | "error";

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  state: Exclude<UploadState, "idle" | "dragging">;
  previewUrl?: string;
}

export interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesAccepted?: (files: File[]) => void;
  onFileRemove?: (id: string) => void;
  className?: string;
  "aria-labelledby"?: string;
}
