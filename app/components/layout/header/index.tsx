import Link from "next/link";
import { Button } from "../../ui/button";
import { headerNavigation } from "./header.navigation";
import Image from "next/image";
import logo from "@/../public/logo+name.svg";

export default function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-5xl px-4 md:px-6">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 bg-opacity-80 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 supports-backdrop-filter:bg-white/5 hover:shadow-lg hover:shadow-black/20 hover:border-[#2585F4]/20">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-white transition-opacity hover:opacity-80"
          >
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-white/80">
            {headerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white hover:underline decoration-white decoration-1 underline-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button size="sm" className="hidden md:inline-flex">
          Começar Agora
        </Button>

      </div>
    </header>
  );
}
