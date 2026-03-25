<<<<<<< HEAD
import { Suspense } from 'react';
import { SimulatorConfig } from '@/features/simulator';

export default function SimulatorPage() {
  return (
    <Suspense fallback={null}>
      <SimulatorConfig />
    </Suspense>
  );
=======
import { SimulatorConfig } from '@/features/simulator';

export default function SimulatorPage() {
  return <SimulatorConfig />;
>>>>>>> 371c675aa384a608654b5512d9c7fa1271534d79
}
