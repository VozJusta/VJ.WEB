'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { simulationService } from '@/services/simulation.service';
import { useState } from 'react';

const PERSONALITY_LABELS: Record<string, string> = {
  calm: 'Calmo',
  aggressive: 'Agressivo',
  impartial: 'Imparcial',
  empathetic: 'Empático',
  pragmatic: 'Pragmático',
  researcher: 'Pesquisador',
};

export function SimulatorFeedback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');
  const judgeName = searchParams.get('judgeName') || 'Juiz IA';
  const personality = searchParams.get('personality') || 'impartial';
  const sessionDate = searchParams.get('date') || new Date().toISOString().slice(0, 10);
  const [isDownloading, setIsDownloading] = useState(false);

  const formattedDate = (() => {
    try {
      return new Date(sessionDate + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return sessionDate;
    }
  })();

  const handleDownloadReport = async () => {
    if (!reportId) return;
    setIsDownloading(true);
    try {
      const blob = await simulationService.downloadPdf(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `simulacao_vozjusta_${reportId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // download failure — silently ignore
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide">
            <span className="text-primary">Processamento IA</span>
            <span className="text-primary">100% Concluído</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated"
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full bg-primary transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </header>

        <article className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
              <CheckCircleIcon className="text-white" sx={{ fontSize: 48 }} />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-foreground">Simulação finalizada</h1>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-text-secondary">
              Nossa IA processou a simulação com sucesso. Seu relatório está pronto para download.
            </p>

            <div className="mb-8 flex w-full max-w-lg flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-surface px-4 py-3">
                <TrendingUpIcon className="text-emerald-400" sx={{ fontSize: 20 }} />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-text-muted">Status</p>
                  <p className="text-sm font-semibold text-foreground">Concluída</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-surface px-4 py-3">
                <PersonIcon className="text-primary" sx={{ fontSize: 20 }} />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-text-muted">Juiz</p>
                  <p className="text-sm font-semibold text-foreground">{judgeName}</p>
                  <p className="text-xs text-text-muted">{PERSONALITY_LABELS[personality] ?? personality}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-surface px-4 py-3">
                <CalendarTodayIcon className="text-text-muted" sx={{ fontSize: 20 }} />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-text-muted">Data</p>
                  <p className="text-sm font-semibold text-foreground">{formattedDate}</p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              {reportId && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownloadReport}
                  leftIcon={<DownloadIcon />}
                  fullWidth
                  loading={isDownloading}
                >
                  Baixar Relatório PDF
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/dashboard')}
                leftIcon={<HomeIcon />}
                fullWidth
              >
                Ir para página inicial
              </Button>
            </div>
          </div>
        </article>

        {reportId && (
          <footer className="mt-6 text-center text-xs text-text-muted">
            Ref. ID: {reportId} • A análise automatizada não substitui o acompanhamento legal humano.
          </footer>
        )}
      </div>
    </main>
  );
}
