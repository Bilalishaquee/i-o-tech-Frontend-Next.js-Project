import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  submittedEmails: string[];
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SubscriptionState = {
  submittedEmails: [],
  isSubmitting: false,
  error: null,
  success: false,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    startSubmission: (state) => {
      state.isSubmitting = true;
      state.error = null;
      state.success = false;
    },
    submitSuccess: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.success = true;
      state.submittedEmails.push(action.payload);
    },
    submitError: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    resetSubscription: (state) => {
      state.isSubmitting = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { startSubmission, submitSuccess, submitError, resetSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
