'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalityOption } from '@/components/ui/personality-option';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PersonalityType } from '@/types/simulator.types';
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
    description: 'Mantém um ritmo constante e encoraja diálogo paciente durante a audiência.',
    icon: <AnchorIcon className="h-5 w-5 text-blue-400" />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'aggressive',
    label: 'Agressivo',
    description: 'Contesta argumentos rapidamente e exige precisão rápida nas respostas.',
    icon: <BoltIcon className="h-5 w-5 text-red-400" />,
    color: 'bg-red-500/20',
  },
  {
    id: 'impartial',
    label: 'Imparcial',
    description: 'Segue estritamente as regras processuais sem demonstrar qualquer viés.',
    icon: <BalanceIcon className="h-5 w-5 text-blue-400" />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'empathetic',
    label: 'Empático',
    description: 'Foca no elemento humano do caso e demonstra sensibilidade aos depoimentos.',
    icon: <FavoriteIcon className="h-5 w-5 text-green-400" />,
    color: 'bg-green-500/20',
  },
  {
    id: 'pragmatic',
    label: 'Pragmático',
    description: 'Valoriza a eficiência, respostas diretas e evita delongas processuais.',
    icon: <GpsFixedIcon className="h-5 w-5 text-yellow-400" />,
    color: 'bg-yellow-500/20',
  },
  {
    id: 'researcher',
    label: 'Pesquisador',
    description: 'Aprofunda-se em precedentes legais e detalhes técnicos complexos.',
    icon: <DescriptionIcon className="h-5 w-5 text-purple-400" />,
    color: 'bg-purple-500/20',
  },
];

export function SimulatorConfig() {
  const router = useRouter();
  const [judgeName, setJudgeName] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType>('impartial');

  const handleResetToDefault = () => {
    setJudgeName('');
    setSelectedPersonality('impartial');
  };

  const handleStartSimulation = () => {
    const params = new URLSearchParams({ personality: selectedPersonality });
    if (judgeName.trim()) params.set('judgeName', judgeName.trim());
    router.push(`/dashboard/simulador/sessao?${params.toString()}`);
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Configuração da Audiência Simulada
          </h1>
          <p className="text-sm text-text-secondary">
            Personalize o seu treinamento escolhendo o perfil do Juiz IA
          </p>
        </header>

        <section className="space-y-6">
          <div className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
            <div className="mb-6">
              <Input
                id="judge-name"
                label="Nome do Juiz"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                placeholder="Ex: Dr. Silva ou Juiz Instrutor"
              />
              <p className="mt-2 text-xs text-text-muted">
                Como você deseja chamar a autoridade na simulação?
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <InfoIcon className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
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
                className="mt-4 text-text-secondary hover:text-foreground"
              >
                Restaurar Padrão
              </Button>
            </div>
          </div>

          <aside className="rounded-xl border border-primary/30 bg-primary/10 p-4">
            <div className="flex gap-3">
              <InfoIcon className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-primary">
                  Dica de Treinamento
                </h3>
                <p className="text-xs leading-relaxed text-foreground/70">
                  Recomendamos iniciar com o perfil Imparcial para dominar o procedimento básico.
                  Para desafios avançados de sustentação oral, experimente o perfil Agressivo.
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
