"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerificationForm, type VerificationConfig } from "@/app/features/auth/verification";

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const email = searchParams.get("email") || "seu@email.com";
  const type = searchParams.get("type") || "signup";

  const config: VerificationConfig = {
    type: "email",
    contact: email,
    expirationTime: 300,
  };

  const handleVerified = () => {
    setTimeout(() => {
      if (type === "reset") {
        router.push(`/redefinir-senha?email=${encodeURIComponent(email)}`);
      } else {
        router.push("/dashboard");
      }
    }, 2000);
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