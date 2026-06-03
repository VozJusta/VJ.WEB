import Image from "next/image";
import { Security, Bolt } from "@mui/icons-material";
import logo from "@/assets/logo/logo+name.svg";

const highlights = [
  {
    Icon: Security,
    title: "Seus dados protegidos",
    description:
      "Todas as informações são criptografadas e armazenadas com segurança em conformidade com a LGPD.",
  },
  {
    Icon: Bolt,
    title: "Acesso imediato",
    description:
      "Após concluir o cadastro, você terá acesso completo à plataforma e poderá buscar orientação jurídica.",
  },
];

export function CompleteRegisterCitizenHero() {
  return (
    <aside className="mx-auto flex w-full max-w-xl flex-col justify-center gap-10 lg:mx-0 lg:py-8">
      <figure className="w-fit self-center lg:self-start">
        <Image src={logo} alt="VozJusta" width={165} height={34} priority />
      </figure>

      <article className="space-y-5 hidden lg:block">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Finalize seu cadastro no{" "}
          <span className="text-primary">VozJusta</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-white/65">
          Estamos quase lá! Complete as últimas informações para ter acesso
          completo à plataforma e começar sua jornada jurídica.
        </p>
      </article>

      <ul
        className="space-y-5 hidden lg:block"
        aria-label="Próximos passos no VozJusta"
      >
        {highlights.map(({ Icon, title, description }) => (
          <li key={title}>
            <article className="flex items-start gap-4">
              <p className="mt-1 inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/15 bg-white/5 text-primary">
                <Icon fontSize="small" aria-hidden="true" />
              </p>
              <section>
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-1 max-w-sm text-base leading-relaxed text-white/55">
                  {description}
                </p>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
}
