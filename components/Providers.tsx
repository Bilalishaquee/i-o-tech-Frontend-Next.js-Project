'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setLanguage } from '@/store/slices/languageSlice';
import '@/lib/i18n/config';

function DirectionWrapper({ children }: { children: React.ReactNode }) {
  const direction = useAppSelector((state) => state.language.direction);
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [direction, currentLanguage]);

  return <>{children}</>;
}

function I18nSync({ children }: { children: React.ReactNode }) {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Initialize client-side i18n features
      import('@/lib/i18n/client').then((module) => {
        module.initClientI18n();
      });

      // Sync i18next with Redux language state
      import('@/lib/i18n/config').then((module) => {
        const i18n = module.default;
        if (i18n.language !== currentLanguage) {
          i18n.changeLanguage(currentLanguage);
        }
      });
    }
  }, [currentLanguage]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nSync>
        <DirectionWrapper>{children}</DirectionWrapper>
      </I18nSync>
    </Provider>
  );
}
