import Image from "next/image";

export default function OnboardingFeature() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0F172A 0%, #020617 100%)" }}
    >

      <figure
        className="relative z-10"
        style={{
          animation: "logo-reveal 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both",
        }}
      >
        <Image
          src="/logo/logo.svg"
          alt="VozJusta"
          width={280}
          height={204}
          priority
        />
      </figure>
    </main>
  );
}
