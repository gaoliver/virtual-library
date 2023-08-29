import booksReducer, {actions} from './slices';

describe('booksSlice', () => {
  const initialBook = {
    key: '1',
    cover: 'cover-url',
    title: 'Sample Book',
    author: 'Sample Author',
    publishYear: 2023,
    description: 'Sample description.',
  };

  const initialState = {
    favourites: [],
    readingList: [],
  };

  it('should add a book to favourites', () => {
    const state = booksReducer(
      initialState,
      actions.saveFavourite(initialBook),
    );

    expect(state.favourites).toHaveLength(1);
    expect(state.favourites[0]).toEqual(initialBook);
  });

  it('should remove a book from favourites if already added', () => {
    const stateWithBook = {
      ...initialState,
      favourites: [initialBook],
    };

    const state = booksReducer(
      stateWithBook,
      actions.saveFavourite(initialBook),
    );

    expect(state.favourites).toHaveLength(0);
  });

  it('should add a book to reading list', () => {
    const state = booksReducer(
      initialState,
      actions.saveToReadingList(initialBook),
    );

    expect(state.readingList).toHaveLength(1);
    expect(state.readingList[0]).toEqual(initialBook);
  });

  it('should remove a book from reading list if already added', () => {
    const stateWithBook = {
      ...initialState,
      readingList: [initialBook],
    };

    const state = booksReducer(
      stateWithBook,
      actions.saveToReadingList(initialBook),
    );

    expect(state.readingList).toHaveLength(0);
  });

  it('should not modify state for unknown action', () => {
    const state = booksReducer(initialState, {type: 'UNKNOWN_ACTION'});

    expect(state).toEqual(initialState);
  });
});
