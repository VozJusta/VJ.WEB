'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalityOption } from '@/src/components/ui/personality-option';
import { Button } from '@/src/components/ui/button';
import type { PersonalityType } from '@/src/types/simulator.types';
import AnchorIcon from '@mui/icons-material/Anchor';
import BoltIcon from '@mui/icons-material/Bolt';
import BalanceIcon from '@mui/icons-material/Balance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DescriptionIcon from '@mui/icons-material/Description';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';

interface PersonalityConfig {
  id: PersonalityType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const personalities: PersonalityConfig[] = [
  {
    id: 'calm',
    label: 'Calmo',
    description:
      'Mantém um ritmo constante e encoraja diálogo paciente durante a audiência.',
    icon: <AnchorIcon className="h-5 w-5 text-blue-400" />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'aggressive',
    label: 'Agressivo',
    description:
      'Contesta argumentos rapidamente e exige precisão rápida nas respostas.',
    icon: <BoltIcon className="h-5 w-5 text-red-400" />,
    color: 'bg-red-500/20',
  },
  {
    id: 'impartial',
    label: 'Imparcial',
    description:
      'Segue estritamente as regras processuais sem demonstrar qualquer viés.',
    icon: <BalanceIcon className="h-5 w-5 text-blue-400" />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'empathetic',
    label: 'Empático',
    description:
      'Foca no elemento humano do caso e demonstra sensibilidade aos depoimentos.',
    icon: <FavoriteIcon className="h-5 w-5 text-green-400" />,
    color: 'bg-green-500/20',
  },
  {
    id: 'pragmatic',
    label: 'Pragmático',
    description:
      'Valoriza a eficiência, respostas diretas e evita delongas processuais.',
    icon: <GpsFixedIcon className="h-5 w-5 text-yellow-400" />,
    color: 'bg-yellow-500/20',
  },
  {
    id: 'researcher',
    label: 'Pesquisador',
    description:
      'Aprofunda-se em precedentes legais e detalhes técnicos complexos.',
    icon: <DescriptionIcon className="h-5 w-5 text-purple-400" />,
    color: 'bg-purple-500/20',
  },
];

export function SimulatorConfig() {
  const router = useRouter();
  const [judgeName, setJudgeName] = useState('');
  const [selectedPersonality, setSelectedPersonality] =
    useState<PersonalityType>('impartial');

  const handleResetToDefault = () => {
    setJudgeName('');
    setSelectedPersonality('impartial');
  };

  const handleStartSimulation = () => {
    router.push('/dashboard/simulador/sessao');
  };

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-white">
            Configuração da Audiência Simulada
          </h1>
          <p className="text-sm text-gray-400">
            Personalize o seu treinamento escolhendo o perfil do Juiz IA
          </p>
        </header>

        <section className="space-y-6">
          <div className="rounded-xl bg-gray-900 p-6">
            <div className="mb-6">
              <label htmlFor="judge-name" className="mb-2 block text-sm font-medium text-white">
                Nome do Juiz
              </label>
              <p className="mb-3 text-xs text-gray-400">
                Como você deseja chamar a autoridade na simulação?
              </p>
              <input
                id="judge-name"
                type="text"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                placeholder="Ex: Dr. Silva ou Juiz Instrutor"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <InfoIcon className="h-4 w-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">
                  Personalidade do Juiz
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {personalities.map((personality) => (
                  <PersonalityOption
                    key={personality.id}
                    id={personality.id}
                    label={personality.label}
                    description={personality.description}
                    icon={personality.icon}
                    color={personality.color}
                    selected={selectedPersonality === personality.id}
                    onSelect={setSelectedPersonality}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetToDefault}
                leftIcon={<RefreshIcon className="h-4 w-4" />}
                className="mt-4 text-gray-400 hover:text-white"
              >
                Restaurar Padrão
              </Button>
            </div>
          </div>

          <aside className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="flex gap-3">
              <InfoIcon className="h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-blue-300">
                  Dica de Treinamento
                </h3>
                <p className="text-xs leading-relaxed text-blue-200/80">
                  Recomendamos iniciar com o perfil Imparcial para dominar o
                  procedimento básico. Para desafios avançados de sustentação
                  oral, experimente o perfil Agressivo.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartSimulation}
              rightIcon={<PlayArrowIcon />}
            >
              Iniciar Simulação
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
