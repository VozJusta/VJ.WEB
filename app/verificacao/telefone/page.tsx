"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerificationForm, type VerificationConfig } from "@/app/features/auth/verification";

function PhoneVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const phone = searchParams.get("phone") || "(00) 00000-0000";

  const config: VerificationConfig = {
    type: "phone",
    contact: phone,
    expirationTime: 300,
  };

  const handleVerified = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <VerificationForm 
      config={config} 
      onVerified={handleVerified}
      onBack={handleBack}
    />
  );
}

export default function PhoneVerificationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)]">
      <Suspense fallback={null}>
        <PhoneVerificationContent />
      </Suspense>
    </main>
  );
}