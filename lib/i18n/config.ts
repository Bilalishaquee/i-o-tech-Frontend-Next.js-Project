import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Initialize i18next with basic configuration (SSR-safe)
// Language detection will be handled separately on the client side
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        ar: {
          translation: arTranslations,
        },
      },
      fallbackLng: 'en',
      lng: 'en', // Default language for SSR
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
