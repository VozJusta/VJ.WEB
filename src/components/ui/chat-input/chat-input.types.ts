export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecord?: () => void;
  onFileUpload?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
  isRecording?: boolean;
  isTranscribing?: boolean;
  isProcessingFile?: boolean;
}
