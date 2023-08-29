import {BookProps} from '@/@types/models';
import {createSlice} from '@reduxjs/toolkit';

export interface AppState {
  favourites: BookProps[];
  readingList: BookProps[];
}

const initialState: AppState = {
  favourites: [],
  readingList: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    saveFavourite: (state, action) => {
      const existingIndex = state.favourites.findIndex(
        book => book.key === action.payload.key,
      );

      if (existingIndex !== -1) {
        state.favourites.splice(existingIndex, 1);
      } else {
        state.favourites.push(action.payload);
      }
    },
    saveToReadingList: (state, action) => {
      const existingIndex = state.readingList.findIndex(
        book => book.key === action.payload.key,
      );

      if (existingIndex !== -1) {
        state.readingList.splice(existingIndex, 1);
      } else {
        state.readingList.push(action.payload);
      }
    },
  },
});

export const actions = booksSlice.actions;

export default booksSlice.reducer;
