import type { Metadata } from 'next';
import { AuthFeature } from '@/app/features/auth';

export const metadata: Metadata = {
  title: 'Autenticação | VozJusta',
  description:
    'Escolha seu perfil e acesse sua conta na VozJusta para continuar sua jornada jurídica com clareza e tecnologia.',
};

export default function AuthPage() {
  return <AuthFeature />;
}
