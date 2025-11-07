import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isSearchOpen: boolean;
  recentSearches: string[];
}

const initialState: SearchState = {
  query: '',
  isSearchOpen: false,
  recentSearches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    addToRecentSearches: (state, action: PayloadAction<string>) => {
      if (action.payload && !state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches].slice(0, 5);
      }
    },
  },
});

export const { setSearchQuery, toggleSearch, closeSearch, addToRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;
