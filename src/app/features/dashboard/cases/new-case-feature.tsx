"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowBackRounded,
  ShoppingCartRounded,
  WorkRounded,
  MoreHorizRounded,
  HourglassEmptyRounded,
  AutoAwesomeRounded,
} from "@mui/icons-material";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { VoiceRecorder } from "@/src/components/ui/voice-recorder";
import { Checkbox } from "@/src/components/ui/checkbox";

type CategoryId = "trabalhista" | "consumidor" | "outros";

type Category = {
  id: CategoryId;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const CATEGORIES: Category[] = [
  {
    id: "trabalhista",
    label: "Trabalhista",
    description: "Problemas no emprego ou rescisões",
    icon: WorkRounded,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    id: "consumidor",
    label: "Consumidor",
    description: "Compras, serviços ou cobranças indevidas",
    icon: ShoppingCartRounded,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    id: "outros",
    label: "Outros",
    description: "Família, imobiliário ou outros temas",
    icon: MoreHorizRounded,
    iconBg: "bg-white/08",
    iconColor: "text-white/50",
  },
];

export function NewCaseFeature() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [story, setStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setElapsed(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleStartRecording = () => setIsRecording(true);

  const handleStopRecording = () => setIsRecording(false);

  const canSubmit = !!selectedCategory && (story.trim().length > 0 || isRecording);

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    const newCaseId = Math.floor(Math.random() * 90000) + 10000;
    router.push(`/dashboard/casos/${newCaseId}/analise`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <header className="flex items-center gap-3">
        <Link
          href="/dashboard/casos"
          aria-label="Voltar para Meus Casos"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Relatar Novo Caso
        </h1>
      </header>

      <section aria-labelledby="category-heading">
        <h2
          id="category-heading"
          className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3"
        >
          Selecione uma categoria
        </h2>

        <ul className="flex flex-col divide-y divide-[#1B2233] rounded-2xl border border-[#1B2233] overflow-hidden">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4]",
                    isSelected ? "bg-[#111c30]" : "bg-[#0d1526] hover:bg-[#111c30]",
                  )}
                >
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center w-10 h-10 rounded-xl",
                      cat.iconBg,
                      cat.iconColor,
                    )}
                    aria-hidden
                  >
                    <Icon fontSize="small" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{cat.label}</p>
                    <p className="text-xs text-white/45">{cat.description}</p>
                  </div>

                  <Checkbox
                    checked={isSelected}
                    onChange={() => setSelectedCategory(cat.id)}
                    aria-label={`Selecionar categoria ${cat.label}`}
                    className="shrink-0"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="story-heading">
        <header className="flex items-center justify-between mb-3">
          <h2
            id="story-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40"
          >
            Conte sua história
          </h2>
          {isRecording && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#2585F4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2585F4] animate-pulse" aria-hidden />
              Gravando...
            </span>
          )}
        </header>

        <div className="relative">
          {isRecording ? (
            <VoiceRecorder
              isRecording={isRecording}
              elapsedSeconds={elapsed}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
            />
          ) : (
            <div className="relative">
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Descreva o que aconteceu com suas próprias palavras..."
                rows={7}
                aria-labelledby="story-heading"
                aria-describedby="story-hint"
                className="w-full px-4 py-3 pr-16 bg-[#0d1526] border border-[#1B2233] rounded-xl text-sm text-white placeholder:text-white/25 resize-none focus:outline-none focus:ring-2 focus:ring-[#2585F4] focus:border-transparent transition-all duration-200"
              />
              <VoiceRecorder
                isRecording={false}
                elapsedSeconds={0}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
            </div>
          )}
        </div>

        <p id="story-hint" className="mt-2 text-center text-xs text-white/25">
          Sua descrição será processada com criptografia de ponta a ponta. 
          <span className="mx-1">•</span>
          Pressione <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">Ctrl+Enter</kbd> para enviar
        </p>
      </section>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={!canSubmit}
        onClick={handleSubmit}
        leftIcon={
          isRecording ? (
            <HourglassEmptyRounded fontSize="small" aria-hidden />
          ) : (
            <AutoAwesomeRounded fontSize="small" aria-hidden />
          )
        }
        className={isRecording ? "opacity-60 cursor-not-allowed" : ""}
      >
        {isRecording ? "Aguardando relato..." : "Iniciar Análise por IA"}
      </Button>
    </div>
  );
}
