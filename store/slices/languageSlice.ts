import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'ar';

interface LanguageState {
  currentLanguage: Language;
  direction: 'ltr' | 'rtl';
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  direction: 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
    toggleLanguage: (state) => {
      state.currentLanguage = state.currentLanguage === 'en' ? 'ar' : 'en';
      state.direction = state.direction === 'ltr' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
