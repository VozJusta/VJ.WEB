export type ApiNotificationType =
  | "CASE_UPDATED"
  | "CASE_ACCEPTED"
  | "CASE_REFUSED"
  | "NEW_REQUEST"
  | "MESSAGE"
  | string;

export interface ApiNotification {
  id: string;
  title: string;
  body: string;
  type: ApiNotificationType;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  data: ApiNotification[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface DeleteAllResponse {
  ok: boolean;
  deleted: number;
}

export interface MarkReadResponse {
  ok: boolean;
  updated: number;
}
