import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0A0E14] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Termos de Uso</h1>
            <p className="text-sm text-white/40">Última atualização: maio de 2025</p>
          </header>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar a plataforma VozJusta, você concorda com estes Termos de Uso e com nossa
                Política de Privacidade. Se você não concordar com algum destes termos, por favor, não utilize
                nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Descrição do Serviço</h2>
              <p>
                A VozJusta é uma plataforma digital que conecta cidadãos a advogados parceiros e oferece
                ferramentas de análise jurídica baseadas em inteligência artificial. Os serviços incluem:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Análise automatizada de relatos jurídicos por IA</li>
                <li>Conexão com advogados especializados</li>
                <li>Simulador de audiências</li>
                <li>Gestão de documentos e casos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Cadastro e Conta</h2>
              <p>
                Para utilizar os serviços da VozJusta, você deve criar uma conta fornecendo informações
                verdadeiras, precisas e completas. Você é responsável por manter a confidencialidade de sua
                senha e por todas as atividades realizadas em sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Uso Aceitável</h2>
              <p>Você concorda em não utilizar a plataforma para:</p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/60">
                <li>Fornecer informações falsas ou enganosas</li>
                <li>Violar qualquer lei ou regulamento aplicável</li>
                <li>Assediar, ameaçar ou prejudicar outros usuários</li>
                <li>Tentar acessar sistemas ou dados não autorizados</li>
                <li>Reproduzir ou distribuir conteúdo sem autorização</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Limitação de Responsabilidade</h2>
              <p>
                A VozJusta é uma plataforma de intermediação e tecnologia. As análises realizadas pela
                inteligência artificial têm caráter informativo e <strong className="text-white">não
                substituem o acompanhamento jurídico de um advogado habilitado</strong>. A plataforma não se
                responsabiliza por decisões tomadas com base exclusivamente nas análises automatizadas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Privacidade dos Dados</h2>
              <p>
                O tratamento de seus dados pessoais é regido pela nossa Política de Privacidade, em
                conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Seus dados são
                utilizados exclusivamente para a prestação dos serviços contratados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo da plataforma VozJusta, incluindo textos, logotipos, interfaces e tecnologias,
                é protegido por direitos de propriedade intelectual. É proibida a reprodução sem autorização
                expressa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Cancelamento e Exclusão</h2>
              <p>
                Você pode cancelar sua conta a qualquer momento pelas configurações da plataforma. A VozJusta
                se reserva o direito de suspender ou encerrar contas que violem estes Termos de Uso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Alterações nos Termos</h2>
              <p>
                A VozJusta pode atualizar estes Termos de Uso periodicamente. Você será notificado sobre
                alterações significativas. O uso contínuo da plataforma após as alterações constitui aceitação
                dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Contato</h2>
              <p>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail{" "}
                <a href="mailto:contato@vozjusta.com.br" className="text-[#2585F4] hover:underline">
                  contato@vozjusta.com.br
                </a>{" "}
                ou acesse nossa página de{" "}
                <a href="/contato" className="text-[#2585F4] hover:underline">
                  suporte
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
