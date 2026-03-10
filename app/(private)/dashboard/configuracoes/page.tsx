import type { Metadata } from "next";
import { SettingsFeature } from "@/features/dashboard/settings";

export const metadata: Metadata = {
  title: "Configurações | Voz Justa",
  description: "Gerencie as preferências da sua conta",
};

export default function ConfiguracoesPage() {
  return <SettingsFeature />;
}
