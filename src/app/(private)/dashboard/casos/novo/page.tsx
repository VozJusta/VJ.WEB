import type { Metadata } from "next";
import { NewCaseFeature } from "@/app/features/dashboard/cases/new-case-feature";

export const metadata: Metadata = {
  title: "Relatar Novo Caso | Voz Justa",
};

export default function NovoCasoPage() {
  return <NewCaseFeature />;
}
