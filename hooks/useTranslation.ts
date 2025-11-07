/**
 * Custom hook that wraps react-i18next's useTranslation
 * and syncs with Redux language state
 */
import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import i18n from '@/lib/i18n/config';

export function useTranslation(namespace?: string) {
  const { t, i18n: i18nInstance } = useI18nTranslation(namespace);
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);

  // Sync i18next language with Redux language state
  useEffect(() => {
    if (i18nInstance.language !== currentLanguage) {
      i18nInstance.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18nInstance]);

  return { t, i18n: i18nInstance };
}

