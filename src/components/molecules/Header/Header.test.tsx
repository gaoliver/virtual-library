import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './Header';
import {NativeBaseProvider} from 'native-base';

it('Header renders correctly', () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <Header title="Test Title" />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
