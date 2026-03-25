import { Suspense } from 'react';
import { SimulatorConfig } from '@/features/simulator';

export default function SimulatorPage() {
  return (
    <Suspense fallback={null}>
      <SimulatorConfig />
    </Suspense>
  );
}
