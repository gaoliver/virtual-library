import React from 'react';
import renderer from 'react-test-renderer';
import {it, expect, jest} from '@jest/globals';
import {Spinner} from './Spinner';
import {NativeBaseProvider} from 'native-base';

it('Spinner renders correctly', () => {
  jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

  const tree = renderer
    .create(
      <NativeBaseProvider>
        <Spinner />
      </NativeBaseProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
