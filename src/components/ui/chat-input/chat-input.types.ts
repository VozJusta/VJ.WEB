export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecord?: () => void;
  onFileAttach?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
  isRecording?: boolean;
  isTranscribing?: boolean;
  isUploading?: boolean;
}
