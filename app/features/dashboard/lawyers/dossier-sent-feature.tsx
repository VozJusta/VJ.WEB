"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  CheckRounded, 
  DescriptionRounded, 
  AttachFileRounded,
  InfoRounded 
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";

interface DossierSentFeatureProps {
  lawyerName: string;
  lawyerId: string;
}

export function DossierSentFeature({ lawyerName, lawyerId }: DossierSentFeatureProps) {
  const router = useRouter();

  const handleBackToCases = () => {
    router.push("/dashboard/casos");
  };

  const handleViewPDF = () => {
    console.log("View PDF dossier");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12">
      <article 
        className="w-full max-w-2xl"
        aria-labelledby="dossier-sent-title"
      >
        <header className="flex flex-col items-center text-center mb-8">
          <figure className="mb-8">
            <Image
              src="/illustrations/report-sent-illustration.png"
              alt="Dossiê enviado com sucesso"
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
              priority
            />
          </figure>

          <h1 
            id="dossier-sent-title"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Dossiê Técnico Enviado!
          </h1>

          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            O <strong className="font-semibold text-white">{lawyerName}</strong> recebeu sua análise.
            Assim que ele aceitar o caso, você receberá o contato direto via WhatsApp.
          </p>
        </header>

        <section 
          className="bg-[#0d1526] border border-[#1B2233] rounded-2xl p-6 mb-6"
          aria-labelledby="summary-heading"
        >
          <h2 id="summary-heading" className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
            Resumo do Envio
          </h2>

          <ul className="space-y-3" role="list">
            <li className="flex items-center justify-between py-3 border-b border-[#1B2233] last:border-0">
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/15"
                  aria-hidden="true"
                >
                  <DescriptionRounded fontSize="small" className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Relato Técnico
                  </h3>
                  <p className="text-xs text-white/50">
                    Consolidado e revisado
                  </p>
                </div>
              </div>
              <span 
                className="flex items-center justify-center w-6 h-6 bg-green-500/15 rounded-full"
                aria-label="Concluído"
              >
                <CheckRounded sx={{ fontSize: 16 }} className="text-green-400" />
              </span>
            </li>

            <li className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/15"
                  aria-hidden="true"
                >
                  <AttachFileRounded fontSize="small" className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Provas e Evidências
                  </h3>
                  <p className="text-xs text-white/50">
                    8 arquivos anexados
                  </p>
                </div>
              </div>
              <span 
                className="flex items-center justify-center w-6 h-6 bg-green-500/15 rounded-full"
                aria-label="Concluído"
              >
                <CheckRounded sx={{ fontSize: 16 }} className="text-green-400" />
              </span>
            </li>
          </ul>
        </section>

        <aside 
          className="flex items-start gap-3 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl mb-6"
          role="status"
          aria-live="polite"
        >
          <InfoRounded fontSize="small" className="text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-400 leading-relaxed">
            Fique atento às notificações. O advogado entrará em contato em breve.
          </p>
        </aside>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleBackToCases}
          >
            Voltar para Meus Casos
          </Button>

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={handleViewPDF}
            leftIcon={<DescriptionRounded fontSize="small" aria-hidden />}
            className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/05"
          >
            Visualizar PDF do Dossiê
          </Button>
        </div>
      </article>
    </div>
  );
}
