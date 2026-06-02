import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LandingPage from "../features/landing-page";

export const metadata: Metadata = {
  title: "VozJusta — Acesso à Justiça com Tecnologia",
  description:
    "A VozJusta usa inteligência artificial para analisar seu caso jurídico e conectar você ao advogado certo. Simples, rápido e acessível para todo o Brasil.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VozJusta — Acesso à Justiça com Tecnologia",
    description:
      "A VozJusta usa inteligência artificial para analisar seu caso jurídico e conectar você ao advogado certo.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
