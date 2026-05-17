'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from '../../public/locales/pt-BR/common.json';
import en from '../../public/locales/en/common.json';
import es from '../../public/locales/es/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        'pt-BR': { common: ptBR },
        en: { common: en },
        es: { common: es },
      },
      defaultNS: 'common',
      fallbackLng: 'pt-BR',
      supportedLngs: ['pt-BR', 'en', 'es'],
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'vj_language',
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
