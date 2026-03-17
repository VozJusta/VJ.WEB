import type { Metadata } from "next";
import { PrivacySettingsFeature } from "@/app/features/dashboard/settings/privacy-settings-feature";

export const metadata: Metadata = {
  title: "Privacidade | Voz Justa",
  description: "Gerencie suas configurações de privacidade e compartilhamento de dados",
};

export default function PrivacidadePage() {
  return <PrivacySettingsFeature />;
}
