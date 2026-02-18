import Header from "@/components/layout/header";
import LandingPage from "./features/landing-page";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <LandingPage />
      </main>
    </>
  );
}
