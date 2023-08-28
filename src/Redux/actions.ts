import {Dispatch} from 'react';
import {BookProps} from '../@types/models';

export enum ActionTypes {
  TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE',
  TOGGLE_READING_LIST = 'TOGGLE_READING_LIST',
  SAVE_SEARCH_RESULTS = 'MINIMIZE_WINDOWS',
}

export interface ToggleFavourite {
  readonly type: ActionTypes.TOGGLE_FAVOURITE;
  payload: BookProps;
}

export interface ToggleReadingList {
  readonly type: ActionTypes.TOGGLE_READING_LIST;
  payload: BookProps;
}

export interface SaveSearchResult {
  readonly type: ActionTypes.SAVE_SEARCH_RESULTS;
  payload: BookProps[];
}

export type AppActions = ToggleFavourite | ToggleReadingList | SaveSearchResult;

export const toggleFavourite = (book: BookProps) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.TOGGLE_FAVOURITE,
      payload: book,
    });
  };
};

export const toggleReadingList = (book: BookProps) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.TOGGLE_READING_LIST,
      payload: book,
    });
  };
};

export const saveSearchResults = (books: BookProps[]) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.SAVE_SEARCH_RESULTS,
      payload: books,
    });
  };
};
