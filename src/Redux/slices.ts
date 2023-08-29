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
      if (!state.favourites.find(book => book.key === action.payload.key)) {
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
      } else {
        const bookIndex = state.favourites.findIndex(
          book => book.key === action.payload.key,
        );

        state.favourites.splice(bookIndex, 1);

        return {
          ...state,
          favourites: [...state.favourites],
        };
      }
    },
    saveInReadingList: (state, action) => {
      if (!state.readingList.find(book => book.key === action.payload.key)) {
        return {
          ...state,
          readingList: [...state.readingList, action.payload],
        };
      } else {
        const bookIndex = state.readingList.findIndex(
          book => book.key === action.payload.key,
        );

        state.readingList.splice(bookIndex, 1);

        return {
          ...state,
          readingList: [...state.readingList],
        };
      }
    },
  },
});

export const actions = booksSlice.actions;

export default booksSlice.reducer;
