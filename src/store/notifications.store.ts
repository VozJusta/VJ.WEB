import { create } from 'zustand';

export const useNotificationsStore = create<{
  unreadCount: number;
  setUnreadCount: (n: number) => void;
}>((set) => ({
  unreadCount: 0,
  setUnreadCount: (unreadCount) => set({ unreadCount }),
}));
