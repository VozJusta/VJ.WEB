import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast/toast-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { I18nProvider } from "@/providers/i18n-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vozjusta.com.br";

export const viewport: Viewport = {
  themeColor: "#2585F4",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VozJusta — Acesso à Justiça com Tecnologia",
    template: "%s | VozJusta",
  },
  description:
    "A VozJusta conecta cidadãos a advogados parceiros e oferece análise jurídica por inteligência artificial. Acesse seus direitos de forma simples, rápida e segura.",
  keywords: [
    "assistência jurídica",
    "advogado online",
    "inteligência artificial jurídica",
    "acesso à justiça",
    "direitos do cidadão",
    "consultoria jurídica",
    "VozJusta",
    "LGPD",
    "direito digital",
  ],
  authors: [{ name: "VozJusta", url: BASE_URL }],
  creator: "VozJusta",
  publisher: "VozJusta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "VozJusta",
    title: "VozJusta — Acesso à Justiça com Tecnologia",
    description:
      "Conectamos cidadãos a advogados parceiros e oferecemos análise jurídica por IA. Seus direitos, de forma simples e acessível.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VozJusta — Plataforma de acesso à justiça",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VozJusta — Acesso à Justiça com Tecnologia",
    description:
      "Conectamos cidadãos a advogados parceiros e oferecemos análise jurídica por IA.",
    images: ["/og-image.png"],
    creator: "@vozjusta",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "VozJusta",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contato@vozjusta.com.br",
        contactType: "customer support",
        availableLanguage: "Portuguese",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "VozJusta",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/contato?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <I18nProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
