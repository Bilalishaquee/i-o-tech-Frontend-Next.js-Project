import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import searchReducer from './slices/searchSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    search: searchReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
