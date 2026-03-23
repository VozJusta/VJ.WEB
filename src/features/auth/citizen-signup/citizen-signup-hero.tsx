import Image from "next/image";
import { Gavel, Security, Bolt } from "@mui/icons-material";
import { heroHighlights } from "./constants";
import logo from "@/assets/logo/logo+name.svg";

const highlightIcons = [Security, Bolt] as const;

export function CitizenSignupHero() {
  return (
    <aside className="mx-auto flex w-full max-w-xl flex-col justify-center gap-10 lg:mx-0 lg:py-8">
      <figure className="w-fit self-center lg:self-start">
        <Image
          src={logo}
          alt="VozJusta"
          width={165}
          height={34}
          priority
        />
      </figure>

      <article className="space-y-5 hidden lg:block">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Cadastre-se no <span className="text-primary">VozJusta</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-white/65">
          A clareza que o direito exige, a voz que você precisa. Conectamos
          cidadãos à justiça de forma transparente e tecnológica.
        </p>
      </article>

      <ul className="space-y-5 hidden lg:block" aria-label="Diferenciais da plataforma VozJusta">
        {heroHighlights.map((highlight, index) => {
          const Icon = highlightIcons[index] ?? Gavel;

          return (
            <li key={highlight.title}>
              <article className="flex items-start gap-4">
                <p className="mt-1 inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/15 bg-white/5 text-primary">
                  <Icon fontSize="small" aria-hidden="true" />
                </p>
                <section>
                  <h2 className="text-xl font-semibold text-white">
                    {highlight.title}
                  </h2>
                  <p className="mt-1 max-w-sm text-base leading-relaxed text-white/55">
                    {highlight.description}
                  </p>
                </section>
              </article>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
