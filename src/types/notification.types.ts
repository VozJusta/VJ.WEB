export type NotificationType = 'info' | 'success' | 'warning' | 'case-update';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
