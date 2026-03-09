export type MessageRole = 'user' | 'assistant';

export interface QuickAction {
  id: string;
  label: string;
  value: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

export interface ChatSession {
  id: string;
  caseId?: string;
  messages: Message[];
  progress?: number;
  stage?: string;
}
