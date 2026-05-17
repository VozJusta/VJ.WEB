"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ComingSoonPage() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#070E1B] overflow-hidden px-4">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,133,244,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Illustration */}
      <div
        className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#2585F4]/10 ring-1 ring-[#2585F4]/20"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="h-16 w-16"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="28" fill="#2585F4" opacity="0.12" />
          <path
            d="M20 32h24M32 20v24"
            stroke="#2585F4"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="32" cy="32" r="6" fill="#2585F4" opacity="0.8" />
          <circle cx="32" cy="32" r="2.5" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-lg text-center">
        <span className="mb-4 inline-block rounded-full border border-[#2585F4]/30 bg-[#2585F4]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2585F4]">
          {t("comingSoon.badge")}
        </span>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t("comingSoon.title")}
        </h1>

        <p className="mb-10 text-base leading-relaxed text-white/55">
          {t("comingSoon.subtitle")}
        </p>

        {/* Feature highlights */}
        <div className="mb-10 grid grid-cols-3 gap-3">
          {[
            t("comingSoon.feature1"),
            t("comingSoon.feature2"),
            t("comingSoon.feature3"),
          ].map((label) => (
            <div
              key={label}
              className="rounded-xl border border-white/8 bg-white/4 px-3 py-4"
            >
              <p className="text-xs font-medium text-white/55">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2585F4] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1978E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E1B]"
          >
            {t("comingSoon.backHome")}
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            {t("comingSoon.login")}
          </Link>
        </div>
      </div>

      {/* Bottom decoration */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-96 -translate-x-1/2 bg-linear-to-r from-transparent via-[#2585F4]/30 to-transparent"
        aria-hidden="true"
      />
    </main>
  );
}
