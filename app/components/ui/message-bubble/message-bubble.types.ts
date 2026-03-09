import type { MessageRole, QuickAction } from "@/app/types/chat.types";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
  onQuickAction?: (action: QuickAction) => void;
}
