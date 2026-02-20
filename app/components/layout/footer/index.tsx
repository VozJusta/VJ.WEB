"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/toast-provider";
import { footerNavigation } from "./footer.navigation";
import type { FooterProps } from "./footer.types";
import logo from "@/public/logo/logo+name.svg";
import {
  ShareOutlined,
  MenuOutlined,
  LightModeOutlined,
  ArrowUpward,
} from "@mui/icons-material";

export default function Footer({ className = "" }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Newsletter subscription:", email);
    setEmail("");
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShareClick = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast({ title: "Link da página copiado", variant: "success" });
    } catch (error) {
      toast({ title: "Erro ao copiar link", variant: "error" });
    }
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <footer
      className={`
        relative
        w-full
        bg-[#0A0E14]
        border-t border-zinc-800/50
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image src={logo} alt="VozJusta Logo" width={120} height={40} />
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Elevando a tecnologia com propósito humano. Justiça, carreira e
              inovação digital para um futuro conectado.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleShareClick}
                className="
                  w-10 h-10
                  rounded-full
                  bg-zinc-900
                  border border-zinc-800
                  flex items-center justify-center
                  text-zinc-400
                  hover:text-white
                  hover:border-zinc-700
                  transition-all
                  duration-200
                "
                aria-label="Compartilhar"
              >
                <ShareOutlined fontSize="small" />
              </button>

              <button
                className="
                  w-10 h-10
                  rounded-full
                  bg-zinc-900
                  border border-zinc-800
                  flex items-center justify-center
                  text-zinc-400
                  hover:text-white
                  hover:border-zinc-700
                  transition-all
                  duration-200
                "
                aria-label="Menu"
              >
                <MenuOutlined fontSize="small" />
              </button>

              <button
                className="
                  w-10 h-10
                  rounded-full
                  bg-zinc-900
                  border border-zinc-800
                  flex items-center justify-center
                  text-zinc-400
                  hover:text-white
                  hover:border-zinc-700
                  transition-all
                  duration-200
                "
                aria-label="Alternar tema"
              >
                <LightModeOutlined fontSize="small" />
              </button>
            </div>
          </div>

          <nav className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerNavigation.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className="
                          text-sm
                          text-zinc-400
                          hover:text-white
                          transition-colors
                          duration-200
                        "
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-white">
                Fique por dentro das novidades
              </h3>
              <p className="text-sm text-zinc-400">
                Receba atualizações exclusivas diretamente no seu e-mail.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail.com"
                  required
                  className="
                    w-full
                    px-4 py-3
                    bg-zinc-900
                    border border-zinc-800
                    rounded-lg
                    text-sm text-white
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                    focus:border-transparent
                    transition-all
                  "
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  fullWidth
                  variant="primary"
                  size="md"
                >
                  Inscrever-se
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500 text-center md:text-left">
              © {new Date().getFullYear()} VozJusta. Todos os direitos
              reservados.
            </p>

            <button
              onClick={scrollToTop}
              className="
                flex items-center gap-2
                text-sm text-zinc-400
                hover:text-white
                transition-colors
                duration-200
                group
              "
            >
              <span className="font-medium">VOLTAR AO TOPO</span>
              <ArrowUpward
                fontSize="small"
                className="group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
