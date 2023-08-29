import React from 'react';
import renderer from 'react-test-renderer';
import {SearchBar} from './SearchBar';
import {NativeBaseProvider} from 'native-base';

it('SearchBar renders correctly', () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <SearchBar />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
