import type { MessageRole, QuickAction } from "@/types/chat.types";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp: Date;
  attachment?: { name: string; type: 'pdf' | 'image'; previewUrl?: string };
  quickActions?: QuickAction[];
  onQuickAction?: (action: QuickAction) => void;
}
