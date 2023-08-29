import React from 'react';
import renderer from 'react-test-renderer';
import {BookCard} from './BookCard';
import {BookProps} from '@/@types/models';
import {NativeBaseProvider} from 'native-base';

it('BookCard renders correctly', () => {
  const mockBook: BookProps = {
    author: 'Author Name',
    cover: 'cover.jpg',
    publishYear: '2023',
    title: 'Book Title',
    key: '123',
  };

  const tree = renderer
    .create(
      <NativeBaseProvider>
        <BookCard book={mockBook} />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
