import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — VozJusta",
  description: "Saiba como a VozJusta coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0A0E14] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Política de Privacidade</h1>
            <p className="text-sm text-white/40">Última atualização: maio de 2025 · Versão 1.0</p>
          </header>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introdução</h2>
              <p>
                A VozJusta, inscrita no CNPJ sob o nº XX.XXX.XXX/0001-XX, está comprometida com a proteção
                de seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos,
                armazenamos e compartilhamos suas informações, em conformidade com a Lei Geral de Proteção
                de Dados Pessoais (LGPD — Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Dados Coletados</h2>
              <p>Coletamos os seguintes dados pessoais:</p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Dados de identificação: nome completo, CPF, e-mail e telefone</li>
                <li>Dados de acesso: endereço IP, informações do dispositivo e logs de navegação</li>
                <li>Dados de uso: interações com a plataforma e histórico de casos</li>
                <li>Dados fornecidos voluntariamente: relatos e mensagens enviados à plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Finalidade do Tratamento</h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Prestação dos serviços contratados e criação de conta</li>
                <li>Análise jurídica automatizada por inteligência artificial</li>
                <li>Conexão com advogados parceiros</li>
                <li>Envio de notificações sobre o andamento dos seus casos</li>
                <li>Cumprimento de obrigações legais e regulatórias</li>
                <li>Melhoria contínua da plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Base Legal</h2>
              <p>
                O tratamento de seus dados está fundamentado nas seguintes bases legais previstas na LGPD:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li><strong className="text-white">Consentimento</strong> (art. 7º, I): para envio de comunicações de marketing</li>
                <li><strong className="text-white">Execução de contrato</strong> (art. 7º, V): para prestação dos serviços</li>
                <li><strong className="text-white">Legítimo interesse</strong> (art. 7º, IX): para melhoria dos serviços e segurança</li>
                <li><strong className="text-white">Obrigação legal</strong> (art. 7º, II): para cumprimento de obrigações regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Compartilhamento de Dados</h2>
              <p>
                Seus dados podem ser compartilhados com:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Advogados parceiros da plataforma, mediante sua solicitação</li>
                <li>Provedores de infraestrutura e serviços tecnológicos</li>
                <li>Autoridades governamentais, quando exigido por lei</li>
              </ul>
              <p className="mt-3">
                Não vendemos nem cedemos seus dados pessoais a terceiros para fins comerciais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Seus Direitos (LGPD)</h2>
              <p>Você tem direito a:</p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Portabilidade dos dados a outro fornecedor</li>
                <li>Eliminação dos dados tratados com base no consentimento</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p className="mt-3">
                Para exercer seus direitos, entre em contato pelo e-mail{" "}
                <a href="mailto:privacidade@vozjusta.com.br" className="text-[#2585F4] hover:underline">
                  privacidade@vozjusta.com.br
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pelo tempo necessário para a prestação dos serviços ou enquanto sua
                conta estiver ativa. Após o encerramento da conta, os dados serão eliminados ou
                anonimizados no prazo de 90 dias, salvo obrigação legal de retenção.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra
                acesso não autorizado, perda, alteração ou divulgação, incluindo criptografia em trânsito
                e em repouso, controle de acesso e monitoramento contínuo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Encarregado de Dados (DPO)</h2>
              <p>
                Nosso Encarregado de Proteção de Dados pode ser contatado pelo e-mail{" "}
                <a href="mailto:dpo@vozjusta.com.br" className="text-[#2585F4] hover:underline">
                  dpo@vozjusta.com.br
                </a>
                . Você também pode registrar reclamações junto à Autoridade Nacional de Proteção de Dados
                (ANPD) em{" "}
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2585F4] hover:underline"
                >
                  www.gov.br/anpd
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas
                serão comunicadas por e-mail ou por notificação na plataforma. O uso contínuo após a
                comunicação constitui aceitação das alterações.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
