"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { headerNavigation } from "./header.navigation";
import { MobileMenu } from "./mobile-menu";
import Image from "next/image";
import logo from "@/assets/logo/logo+name.svg";
import { Menu } from "@mui/icons-material";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashId = href.startsWith("#")
      ? href
      : href.startsWith("/#")
        ? href.slice(1)
        : null;

    if (hashId) {
      if (pathname === "/" || href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(hashId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-[97%] px-4 md:px-6 flex items-center justify-between rounded-full border border-white/10 bg-white/5 bg-opacity-80 py-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 supports-backdrop-filter:bg-white/5 hover:shadow-lg hover:shadow-black/20 hover:border-[#2585F4]/20">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white transition-opacity hover:opacity-80"
        >
          <Image src={logo} alt="Logo" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-white/80">
            {headerNavigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="transition-colors hover:text-white hover:underline decoration-white decoration-1 underline-offset-2 cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" href="/onBoarding" className="hidden md:inline-flex">
            Começar Agora
          </Button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="
              md:hidden
              w-10 h-10
              rounded-full
              bg-white/10
              border border-white/20
              flex items-center justify-center
              text-white
              hover:bg-white/20
              hover:border-white/30
              transition-all
              duration-200
            "
            aria-label="Abrir menu"
          >
            <Menu fontSize="small" />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
