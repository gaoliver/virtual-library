import {BookProps} from '../@types/models';
import {ActionTypes, AppActions} from './actions';
interface InitialStateModel {
  isLoading: boolean;
  favourites: BookProps[];
  readingList: BookProps[];
  searchResults: BookProps[];
}

const initialState: InitialStateModel = {
  isLoading: false,
  favourites: [],
  readingList: [],
  searchResults: [],
};

export const appReducer = (
  state: InitialStateModel = initialState,
  action: AppActions,
) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_FAVOURITE:
      if (!state.favourites.find(book => book.id === action.payload.id)) {
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
      } else {
        const bookIndex = state.favourites.findIndex(
          book => book.id === action.payload.id,
        );

        state.favourites.splice(bookIndex, 1);

        return {
          ...state,
          favourites: [...state.favourites],
        };
      }

    case ActionTypes.TOGGLE_READING_LIST:
      if (!state.readingList.find(book => book.id === action.payload.id)) {
        return {
          ...state,
          readingList: [...state.readingList, action.payload],
        };
      } else {
        const bookIndex = state.readingList.findIndex(
          book => book.id === action.payload.id,
        );

        state.readingList.splice(bookIndex, 1);

        return {
          ...state,
          readingList: [...state.readingList],
        };
      }

    case ActionTypes.SAVE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};
