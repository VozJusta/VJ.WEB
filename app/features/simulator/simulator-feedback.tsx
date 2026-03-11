'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export function SimulatorFeedback() {
  const router = useRouter();

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 px-6 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide">
            <span className="text-blue-400">Processamento IA</span>
            <span className="text-blue-400">100% Concluído</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: '100%' }}
            ></div>
          </div>
        </header>

        <article className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600">
              <CheckCircleIcon className="text-white" sx={{ fontSize: 48 }} />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-white">
              Simulação finalizada
            </h1>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-400">
              Nossa IA processou seu relato e documentos com sucesso.
              Seu diagnóstico jurídico está pronto para visualização.
            </p>

            <div className="mb-8 flex w-full max-w-lg flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3">
                <GavelIcon className="text-blue-400" sx={{ fontSize: 20 }} />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Categoria
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Direito do Consumidor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3">
                <TrendingUpIcon className="text-green-400" sx={{ fontSize: 20 }} />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Viabilidade
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Alta Probabilidade
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleDownloadReport}
                leftIcon={<DownloadIcon />}
                fullWidth
              >
                Baixar Relatório Completo
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleGoHome}
                leftIcon={<HomeIcon />}
                fullWidth
              >
                Ir para página inicial
              </Button>
            </div>
          </div>
        </article>

        <footer className="mt-6 text-center text-xs text-gray-600">
          Ref. ID: A2-8234-2024 • A análise automatizada não substitui o
          acompanhamento legal humano.
        </footer>
      </div>
    </main>
  );
}
