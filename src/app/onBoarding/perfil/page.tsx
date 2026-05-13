"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Person, AccountBalance, ArrowForward } from "@mui/icons-material";
import { RoleCard } from "@/components/ui/role-card";
import { Button } from "@/components/ui/button";
import logo from '@/assets/logo/logo+name.svg';

type UserRole = "individual" | "lawyer";

const ROLES: { id: UserRole; title: string; description: string; icon: React.ElementType }[] = [
  {
    id: "individual",
    title: "Sou Cidadão",
    description: "Busco orientação e empoderamento jurídico simples.",
    icon: Person,
  },
  {
    id: "lawyer",
    title: "Sou Advogado",
    description: "Quero gerenciar casos e me conectar com clientes.",
    icon: AccountBalance,
  },
];

export default function OnboardingPerfilPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();

  const handleStartClick = () => {
    if (!selectedRole) return;

    if (selectedRole === "individual") {
      router.push("/onBoarding/cidadao");
      return;
    }

    if (selectedRole === "lawyer") {
      router.push("/onBoarding/advogado");
      return;
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12"
      style={{ background: "linear-gradient(to bottom, #0F172A 0%, #020617 100%)" }}
    >
      <section
        aria-labelledby="onboarding-heading"
        className="flex w-full max-w-3xl flex-col items-center gap-8"
      >
          <figure>
            <Image
              src={logo}
              alt="VozJusta"
              width={300}
              height={200}
              priority
            />
          </figure>

          <div className="flex flex-col gap-2 text-center">
        
            <p className="text-3xl font-medium text-white/90">
              A justiça agora fala sua língua.
            </p>
            <p className="text-[18px] text-white/45">
              Para começar, quem você é?
            </p>
          </div>

          <ul role="list" className="flex flex-col md:flex-row gap-3">
            {ROLES.map((role) => (
              <li key={role.id}>
                <RoleCard
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  isSelected={selectedRole === role.id}
                  onSelect={() => setSelectedRole(role.id)}
                />
              </li>
            ))}
          </ul>

          <Button
            size="md"
            fullWidth
            variant="white"
            disabled={!selectedRole}
            rightIcon={<ArrowForward fontSize="small" />}
            className="rounded-full"
            onClick={handleStartClick}
          >
            Começar agora
          </Button>

          <p className="text-xs text-white/30 text-center">
            Ao continuar, você concorda com nossos{" "}
            <Link
              href="/termos"
              className="text-white/50 underline underline-offset-2 transition-colors hover:text-white/70"
            >
              Termos de Uso
            </Link>
          </p>
      </section>
    </main>
  );
}
