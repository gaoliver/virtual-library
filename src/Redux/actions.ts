import {Dispatch} from 'react';
import {BookProps} from '../@types/models';

export enum ActionTypes {
  TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE',
  TOGGLE_READING_LIST = 'TOGGLE_READING_LIST',
}

export interface ToggleFavourite {
  readonly type: ActionTypes.TOGGLE_FAVOURITE;
  payload: BookProps;
}

export interface ToggleReadingList {
  readonly type: ActionTypes.TOGGLE_READING_LIST;
  payload: BookProps;
}

export type AppActions = ToggleFavourite | ToggleReadingList;

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
