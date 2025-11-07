/**
 * Client-side i18n configuration
 * This file is only used on the client side
 */
import i18n from '@/lib/i18n/config';

// Setup language detection on client side
export function initClientI18n() {
  if (typeof window === 'undefined') {
    return; // Don't run on server
  }

  import('i18next-browser-languagedetector').then((LanguageDetectorModule) => {
    const LanguageDetector = LanguageDetectorModule.default;
    
    // Only add detector if not already added
    if (!i18n.options.detection) {
      i18n.use(LanguageDetector);
      i18n.init({
        ...i18n.options,
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
        },
        lng: undefined, // Let detector choose
      });
    }
  }).catch(() => {
    // Silently fail if LanguageDetector is not available
  });
}

