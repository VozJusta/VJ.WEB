import {
  AssignmentLateRounded,
  RecordVoiceOverRounded,
  GavelRounded,
  TrackChangesRounded,
} from "@mui/icons-material";
import { ActionCard } from "@/src/components/ui/action-card";

export function QuickActionsSection() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="sr-only">
        Ações Rápidas
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ActionCard
          icon={<AssignmentLateRounded fontSize="small" />}
          decorativeIcon={<GavelRounded sx={{ fontSize: 16 }} />}
          title="Novo Problema Jurídico?"
          description="Nossos especialistas estão prontos para analisar seu caso agora mesmo com auxílio de inteligência jurídica."
          action={{
            label: "Relatar Novo Caso",
            href: "/dashboard/casos/novo",
            variant: "primary",
          }}
        />

        <ActionCard
          icon={<RecordVoiceOverRounded fontSize="small" />}
          decorativeIcon={<TrackChangesRounded sx={{ fontSize: 16 }} />}
          title="Simulador de Audiência"
          description="Prepare-se emocionalmente e tecnicamente treinando seu depoimento com nossa IA personalizada."
          action={{
            label: "Começar treinamento",
            href: "/dashboard/simulador",
            variant: "primary",
          }}
        />
      </div>
    </section>
  );
}
