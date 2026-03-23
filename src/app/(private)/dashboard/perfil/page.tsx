import type { Metadata } from "next";
import { ProfileFeature } from "@/features/dashboard/profile";

export const metadata: Metadata = {
  title: "Perfil | Voz Justa",
  description: "Gerencie as informações do seu perfil",
};

export default function PerfilPage() {
  return <ProfileFeature />;
}
