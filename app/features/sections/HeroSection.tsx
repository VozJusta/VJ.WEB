import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImage from "@/../public/illustrations/hero-section-chat.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-48 md:pb-32 flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl hover:text-white text-gray-500 transition-colors duration-300 ease-in-out">
        Justiça não precisa ser difícil.
      </h1>
      <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-primary hover:text-white transition-colors duration-300 ease-in-out">
        A gente traduz para você.
      </h2>

      <p className="mt-6 max-w-2xl text-lg text-gray-500 md:text-xl hover:text-white transition-colors duration-300 ease-in-out">
        Use nossa IA para entender direitos, organizar provas e conectar-se ao
        advogado ideal. Sem juridiquês, sem barreiras.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          className="rounded-full px-8 text-lg shadow-lg hover:shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          Sou cidadão
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full bg-[#171717] px-8 text-lg text-white hover:bg-[#2a2a2a] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 dark:bg-white/10 dark:hover:bg-white/20"
        >
          Sou advogado
        </Button>
      </div>

      <Image
        src={heroImage}
        alt="Interface da VozJusta demonstrando uma conversa simplificada com a assistente jurídica IA"
        width={1920}
        height={1080}
        quality={100}
        priority
        className="w-full h-auto mt-12 hover:rotate-6 hover:scale-105 transition-all duration-300"
      />

      <div className="absolute -inset-0.5 -z-10 bg-linear-to-br from-primary/30 to-purple-600/30 opacity-40 blur-3xl rounded-3xl" />
    </section>
  );
}
