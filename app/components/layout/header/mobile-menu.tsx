"use client";

import { useEffect } from "react";
import { Button } from "../../ui/button";
import { headerNavigation } from "./header.navigation";
import { Close } from "@mui/icons-material";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    onClose();
  };

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-70 bg-[#0A0E14] z-50
          border-l border-zinc-800/50
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="
                w-10 h-10 
                rounded-full 
                bg-zinc-900 
                border border-zinc-800
                flex items-center justify-center
                text-zinc-400
                hover:text-white
                hover:border-zinc-700
                transition-all
                duration-200
              "
              aria-label="Fechar menu"
            >
              <Close fontSize="small" />
            </button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {headerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="
                      block px-4 py-3
                      text-base font-medium text-zinc-400
                      rounded-lg
                      transition-all duration-200
                      hover:text-white
                      hover:bg-zinc-900/50
                      hover:pl-6
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-zinc-800/50">
            <Button size="md" className="w-full" onClick={onClose}>
              Começar Agora
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
