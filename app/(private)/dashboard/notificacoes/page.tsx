import { NotificationsList } from "@/app/features/dashboard/notifications";

export const metadata = {
  title: "Notificações | Voz Justa",
  description: "Visualize e gerencie suas notificações",
};

export default function NotificationsPage() {
  return <NotificationsList />;
}
