export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecord?: () => void;
  onFileUpload?: (files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
  isRecording?: boolean;
  isTranscribing?: boolean;
  isProcessingFile?: boolean;
  hasPendingFiles?: boolean;
}
