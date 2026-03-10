export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecord?: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
}
