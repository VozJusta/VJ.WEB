import type { MessageRole, QuickAction } from "@/types/chat.types";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
  onQuickAction?: (action: QuickAction) => void;
}
