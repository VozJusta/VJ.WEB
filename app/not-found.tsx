import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { GavelOutlined, HomeOutlined, SupportAgentOutlined } from '@mui/icons-material';

export const metadata: Metadata = {
  title: '404 - Página Não Encontrada | VozJusta',
  description: 'A página que você procura não foi encontrada. Volte para o início ou entre em contato com o suporte.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main
      className="
        min-h-screen
        flex flex-col
        items-center
        justify-center
        px-6
        py-12
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        relative
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">


        <h1
          className="
            text-8xl
            lg:text-9xl
            font-bold
            text-blue-500
            leading-none
            tracking-tight
            animate-pulse
          "
        >
          404
        </h1>

        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Página Não Encontrada
        </h2>

        <p className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-md mx-auto">
          Parece que este caminho não possui{' '}
          <Link
            href="/termos-legais"
            className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
          >
            amparo legal
          </Link>{' '}
          ou foi removido do nosso sistema. Não se preocupe, o veredito é que você pode voltar em segurança.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button
            href="/"
            variant="primary"
            size="lg"
            leftIcon={<HomeOutlined />}
            className="w-full sm:w-auto"
          >
            Voltar para o Início
          </Button>

          <Button
            href="/suporte"
            variant="secondary"
            size="lg"
            leftIcon={<SupportAgentOutlined />}
            className="w-full sm:w-auto"
          >
            Suporte Técnico
          </Button>
        </div>

        
        <span className="pt-8 text-slate-600 text-sm font-medium">
          VOZJUSTA SOLUTIONS © {new Date().getFullYear()}
        </span>
      </div>

    </main>
  );
}
