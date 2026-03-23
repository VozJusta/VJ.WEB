"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '../../assets/logo/logo.svg';


export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onBoarding/perfil");
    }, 2200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      className="flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0F172A 0%, #020617 100%)" }}
    >
      <figure
        style={{
          animation: "logo-reveal 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both",
        }}
      >
        <Image
          src={logo}
          alt="VozJusta"
          width={280}
          height={204}
          priority
        />
      </figure>
    </main>
  );
}
