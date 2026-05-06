import { Metadata } from "next";
import { DashboardFeature } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | VozJusta",
  description: "Seu painel jurídico pessoal. Acompanhe seus casos, documentos e simulações.",
};

export default function DashboardPage() {
  return <DashboardFeature />;
}
