import type { Metadata } from "next";
import { LoginFeature } from "@/features/auth/login";

export const metadata: Metadata = {
  title: "Login | VozJusta",
  description:
    "Acesse sua conta na VozJusta para continuar sua jornada jurídica com clareza e tecnologia.",
};

export default function LoginPage() {
  return <LoginFeature />;
}
