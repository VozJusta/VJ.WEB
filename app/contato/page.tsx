"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/toast-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { contactSchema, type ContactFormData } from "./contact.schema";
import {
  WhatsApp,
  EmailOutlined,
  LocationOnOutlined,
  SendOutlined,
} from "@mui/icons-material";

export default function ContatoPage() {
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);

      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados.",
        variant: "error",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form data:", result.data);

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
        variant: "success",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar:", error);

      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato via WhatsApp.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20mais%20informações",
      "_blank",
    );
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0A0E14] pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contato - VozJusta
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Estamos aqui para ouvir você. Conecte-se com nossa equipe
            profissional para suporte jurídico e tecnológico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 lg:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="name"
                  name="name"
                  label="Nome Completo"
                  placeholder="Como devemos te chamar?"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={isSubmitting}
                  required
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="E-mail Corporativo"
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <Input
                id="subject"
                name="subject"
                label="Assunto"
                placeholder="Como podemos ajudar?"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={isSubmitting}
                required
              />

              <Textarea
                id="message"
                name="message"
                label="Mensagem"
                placeholder="Descreva sua solicitação em detalhes..."
                rows={6}
                maxLength={1000}
                showCharCount
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                disabled={isSubmitting}
                required
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>

          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-[#0C4A2C] border border-green-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <WhatsApp className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Fale conosco agora
                  </h3>
                  <p className="text-sm text-green-300">
                    Atendimento humanizado
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Prefere um contato mais dinâmico? Inicie uma conversa via
                WhatsApp e fale com nossos especialistas.
              </p>

              <Button
                onClick={handleWhatsAppClick}
                fullWidth
                variant="secondary"
                size="md"
                className="bg-green-500 hover:bg-green-600 text-white"
                rightIcon={<WhatsApp />}
              >
                WhatsApp Web
              </Button>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 space-y-6">
              <h3 className="text-white font-semibold text-lg">
                Informações Institucionais
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <EmailOutlined className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">E-mail</p>
                  <a
                    href="mailto:contato@vozjusta.com.br"
                    className="text-white hover:text-primary transition-colors"
                  >
                    contato@vozjusta.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <LocationOnOutlined className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Localização</p>
                  <p className="text-white font-medium">
                    Atendimento Digital em todo o Brasil
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">
                    Sede Administrativa: São Paulo, SP
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
