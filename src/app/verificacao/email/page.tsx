"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerificationForm, type VerificationConfig } from "@/features/auth/verification";
<<<<<<< HEAD
import { useAuth } from "@/hooks/useAuth";
=======
>>>>>>> 371c675aa384a608654b5512d9c7fa1271534d79

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthenticated } = useAuth();
  
  const email = searchParams.get("email") || "seu@email.com";
  const type = searchParams.get("type") || "signup";

  const config: VerificationConfig = {
    type: "email",
    contact: email,
    flowType: type === "reset" ? "reset" : "signup",
    expirationTime: 300,
  };

  const handleVerified = () => {
    if (type === "reset") {
      router.push(`/redefinir-senha?email=${encodeURIComponent(email)}`);
      return;
    }

    if (type === "login") {
      setAuthenticated(true);
    }

    router.push("/dashboard");
  };

  const handleBack = () => {
    if (type === "reset") {
      router.push("/esqueci-minha-senha");
    } else {
      router.back();
    }
  };

  return (
    <VerificationForm 
      config={config} 
      onVerified={handleVerified}
      onBack={handleBack}
    />
  );
}

export default function EmailVerificationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)]">
      <Suspense fallback={null}>
        <EmailVerificationContent />
      </Suspense>
    </main>
  );
}
